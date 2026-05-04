import { db } from "../config/db.js";
import { Device } from "../models/devices.js";

export const getAllDevices = async (): Promise<Device[]> => {
  const [rows] = await db.query("SELECT * FROM devices");
  return rows as Device[];
};

export const getDeviceById = async (id: number): Promise<Device | null> => {
  const [rows] = await db.query("SELECT * FROM devices WHERE id = ?", [id]);
  return (rows as Device[])[0] || null;
};