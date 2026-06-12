import { Users } from "../models/users.js";
import { db } from "../config/db.js";
import { ResultSetHeader } from "mysql2";
import { RowDataPacket } from "mysql2";

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

export const getUserByEmail = async (
  email: string
): Promise<Users | null> => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  const users = rows as Users[];

  return users[0] ?? null;
};