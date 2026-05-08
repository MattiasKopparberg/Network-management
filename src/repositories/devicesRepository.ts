import { db } from "../config/db.js";
import { Device, CreateDeviceInput } from "../models/devices.js";
import { ResultSetHeader } from "mysql2";

export const getAllDevices = async (): Promise<Device[]> => {
  const [rows] = await db.query("SELECT * FROM devices");
  return rows as Device[];
};

export const getDeviceById = async (id: number): Promise<Device | null> => {
  const [rows] = await db.query("SELECT * FROM devices WHERE id = ?", [id]);

  return (rows as Device[])[0] || null;
};

export const createDevice = async (
  device: CreateDeviceInput,
): Promise<Device> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO devices 
    (IPv4_address, IPv6_address, MAC_address, subnet_mask, OS, OS_version, installation_date, manufacturer, location_id, floor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      device.IPv4_address,
      device.IPv6_address,
      device.MAC_address,
      device.subnet_mask,
      device.OS,
      device.OS_version,
      device.installation_date,
      device.manufacturer,
      device.location_id,
      device.floor,
    ],
  );

  return {
    id: result.insertId,
    ...device,
  };
};

export const getDevicesByLocation = async (
  locationId: number,
): Promise<Device[]> => {
  const [rows] = await db.query("SELECT * FROM devices WHERE location_id = ?", [
    locationId,
  ]);

  return rows as Device[];
};

export const getDeviceLocation = async (id: number) => {
  const [rows] = await db.query(
    `SELECT l.*, l.name as location_name
    FROM devices d
    JOIN locations l ON d.location_id = l.location_id
    WHERE d.id = ?`,
    [id],
  );
  return (rows as any[])[0] || null;
};

export const updateDevice = async (
  id: number,
  updates: Partial<CreateDeviceInput>,
): Promise<Device | null> => {
  const fields = Object.keys(updates);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(updates);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  await db.query(`UPDATE devices SET ${setClause} WHERE id = ?`, [
    ...values,
    id,
  ]);

  return await getDeviceById(id);
};

export const deleteDevice = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM devices WHERE id = ?",
    [id],
  );

  return result.affectedRows > 0;
};
