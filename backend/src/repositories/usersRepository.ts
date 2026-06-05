import { Users, CreateUserInput } from "../models/users.js";
import { db } from "../config/db.js";
import { ResultSetHeader } from "mysql2";

export const getAllUsers = async (): Promise<Users[]> => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows as Users[];
};
 
export const getUserByEmail = async (email: string): Promise<Users[]> => {
  const [rows] = await db.query("SELECT * FROM users where email =?")
  return rows as Users[];
}

export const createUser = async (
  users: CreateUserInput
): Promise<Users> => {
  const [result] = await db.query<ResultSetHeader>(`
    INSERT INTO users
    (email, password)
    VALUES (?, ?)`,
  [
    users.email,
    users.password
  ]
  )

  return {
    id: result.insertId,
    ...users
  }
}