import { db } from "../config/db.js";
import { Users } from "../models/users.js";

import db from "../config/db";

export const getUserByEmail = async (
  email: string
) => {
  const [rows]: any = await db.query(
    `
      SELECT *
      FROM users
      WHERE email = ?
    `,
    [email]
  );

  return rows[0];
};

