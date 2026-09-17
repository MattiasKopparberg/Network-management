import { Users, CreateUserInput } from "../models/users";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getAllUsers = async (): Promise<Users[]> => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows as Users[];
};

export const createUser = async (
  email: string,
  passwordHash: string
): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    `
      INSERT INTO users
      (email, password_hash)
      VALUES (?, ?)
    `,
    [email, passwordHash]
  );

  return result.insertId;
};

export const getUserByEmail = async (
  email: string
): Promise<Users | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as Users;
};