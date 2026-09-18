import { db } from "../config/db.js";
import { Maintenance } from "../models/maintenance.js";
import { RowDataPacket } from "mysql2";

export const getAllMaintenances = async (): Promise<Maintenance[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM maintenance"
  );

  return rows as Maintenance[];
};