import { db } from "../config/db.js";
import type { Users } from "../models/users.js";
import * as userRepository from "../repositories/usersRepository.js";


export const getAllUsers = async (): Promise<Users[]> => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};

export const getCurrentUser = async (userId: number) => {
  return userRepository.getUserById(userId);
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