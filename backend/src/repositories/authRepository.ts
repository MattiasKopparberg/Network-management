import { Users, CreateUserInput } from "../models/users.js";
import { db } from "../config/db.js";
import { ResultSetHeader } from "mysql2";

export const getAllUsers = async (): Promise<Users[]> => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows as Users[];
};

export const createUser = async (
  email: string,
  passwordHash: string
) => {
  const [result]: any = await db.query(
    `
      INSERT INTO users
      (email, password_hash)
      VALUES (?, ?)
    `,
    [email]
  );

  return result.insertId;
};

export const getUserByEmail = async (email: string): Promise<Users[]> => {
  const [rows] = await db.query("SELECT * FROM users where email = ?");
  return rows as Users[];
}