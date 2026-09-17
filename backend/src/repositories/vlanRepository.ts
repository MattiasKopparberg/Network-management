import { db } from "../config/db";
import { Vlan, CreateVlanInput } from "../models/vlan";
import { ResultSetHeader } from "mysql2";

export const getAllVlan = async (): Promise<Vlan[]> => {
  const [rows] = await db.query("SELECT * FROM vlan");
  return rows as Vlan[];
};
