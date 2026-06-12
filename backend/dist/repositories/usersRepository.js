import { db } from "../config/db.js";
export const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
};
export const createUser = async (email, passwordHash) => {
    const [result] = await db.query(`
      INSERT INTO users
      (email, password_hash)
      VALUES (?, ?)
    `, [email]);
    return result.insertId;
};
export const getUserByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const users = rows;
    return users[0] ?? null;
};
