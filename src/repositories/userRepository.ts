import { Users } from "../models/users.js"
import { db } from "../config/db.js";
import { ResultSetHeader } from "mysql2";


export const getAllUsers = async (): Promise<Users[]> => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows as Users[];
};