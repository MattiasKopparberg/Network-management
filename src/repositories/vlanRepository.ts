import { db } from "../config/db.js";
import { Vlan, CreateVlanInput } from "../models/vlan.js";
import { ResultSetHeader } from "mysql2";

export const getAllVlan = async (): Promise<Vlan[]> => {
  const [rows] = await db.query("SELECT * FROM vlan");
  return rows as Vlan[];
};
