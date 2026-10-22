
import { db } from "../config/db.js";
import type { Devices, CreateDeviceInput } from "../models/devices.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getAllDevices = async (
  accountId: number,
): Promise<Devices[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM devices WHERE account_id = ?",
    [accountId],
  );

  return rows as Devices[];
};

export const getDeviceById = async (
  id: number,
  accountId: number,
): Promise<Devices | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM devices WHERE device_id = ? AND account_id = ?",
    [id, accountId],
  );

  return (rows as Devices[])[0] ?? null;
};

export const createDevice = async (
  device: CreateDeviceInput,
  accountId: number,
): Promise<Devices> => {
  const [locationRows] = await db.query<RowDataPacket[]>(
    `SELECT location_id
     FROM locations
     WHERE location_id = ? AND account_id = ?`,
    [device.location_id, accountId],
  );

  if (locationRows.length === 0) {
    throw new Error("Location not found in this account");
  }

  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO devices
      (account_id, IPv4_address, IPv6_address, MAC_address,
       subnet_mask, OS, OS_version, installation_date,
       manufacturer, location_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      accountId,
      device.IPv4_address,
      device.IPv6_address,
      device.MAC_address,
      device.subnet_mask,
      device.OS,
      device.OS_version,
      device.installation_date,
      device.manufacturer,
      device.location_id,
    ],
  );

  return {
    device_id: result.insertId,
    account_id: accountId,
    ...device,
  };
};

export const getDevicesByLocation = async (
  locationId: number,
  accountId: number,
): Promise<Devices[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM devices
     WHERE location_id = ? AND account_id = ?`,
    [locationId, accountId],
  );

  return rows as Devices[];
};

export const getDeviceLocation = async (
  id: number,
  accountId: number,
) => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT l.*
     FROM devices d
     JOIN locations l
       ON d.account_id = l.account_id
      AND d.location_id = l.location_id
     WHERE d.device_id = ? AND d.account_id = ?`,
    [id, accountId],
  );

  return rows[0] ?? null;
};

export const updateDevice = async (
  id: number,
  accountId: number,
  updates: Partial<CreateDeviceInput>,
): Promise<Devices | null> => {
  const allowedFields = [
    "IPv4_address",
    "IPv6_address",
    "MAC_address",
    "subnet_mask",
    "OS",
    "OS_version",
    "installation_date",
    "manufacturer",
    "location_id",
  ] as const;

  const fields = allowedFields.filter(
    (field) => updates[field] !== undefined,
  );

  if (fields.length === 0) {
    return getDeviceById(id, accountId);
  }

  if (updates.location_id !== undefined) {
    const [locationRows] = await db.query<RowDataPacket[]>(
      `SELECT location_id
       FROM locations
       WHERE location_id = ? AND account_id = ?`,
      [updates.location_id, accountId],
    );

    if (locationRows.length === 0) {
      throw new Error("Location not found in this account");
    }
  }

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => updates[field]);

  const [result] = await db.query<ResultSetHeader>(
    `UPDATE devices
     SET ${setClause}
     WHERE device_id = ? AND account_id = ?`,
    [...values, id, accountId],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getDeviceById(id, accountId);
};

export const deleteDevice = async (
  id: number,
  accountId: number,
): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM devices WHERE device_id = ? AND account_id = ?",
    [id, accountId],
  );

  return result.affectedRows > 0;
};
