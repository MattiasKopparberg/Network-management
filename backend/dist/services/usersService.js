import { db } from "../config/db.js";
import * as userRepository from "../repositories/usersRepository.js";
export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};
export const getUserByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const users = rows;
    return users[0] ?? null;
};
