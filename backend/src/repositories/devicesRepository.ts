import { db } from "../config/db.js";
import { Devices, CreateDeviceInput } from "../models/devices.js";
import { ResultSetHeader } from "mysql2";

export const getAllDevices = async (): Promise<Devices[]> => {
  const [rows] = await db.query("SELECT * FROM devices");
  return rows as Devices[];
};

export const getDeviceById = async (id: number): Promise<Devices | null> => {
  const [rows] = await db.query("SELECT * FROM devices WHERE device_id = ?", [id]);

  return (rows as Devices[])[0] || null;
};

export const createDevice = async (
  device: CreateDeviceInput,
): Promise<Devices> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO devices 
    (IPv4_address, IPv6_address, MAC_address, subnet_mask, OS, OS_version, installation_date, manufacturer, location_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
    ],
  );

  return {
    id: result.insertId,
    ...device,
  };
};

export const getDevicesByLocation = async (
  locationId: number,
): Promise<Devices[]> => {
  const [rows] = await db.query("SELECT * FROM devices WHERE location_id = ?", [
    locationId,
  ]);

  return rows as Devices[];
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
): Promise<Devices | null> => {
  const fields = Object.keys(updates);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(updates);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  await db.query(`UPDATE devices SET ${setClause} WHERE device_id = ?`, [
    ...values,
    id,
  ]);

  return await getDeviceById(id);
};

export const deleteDevice = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM devices WHERE device_id = ?",
    [id],
  );

  return result.affectedRows > 0;
};
