import { RowDataPacket } from "mysql2";
import { db } from "../config/db.js";

export type AccountMembership = {
  id: number;
  name: string;
  role: "owner" | "admin" | "viewer";
};

type AccountRow = RowDataPacket & AccountMembership;

export const getAccountsForUser = async (
  userId: number,
): Promise<AccountMembership[]> => {
  const [rows] = await db.query<AccountRow[]>(
    `
      SELECT
        a.id,
        a.name,
        au.role
      FROM accounts AS a
      INNER JOIN account_users AS au
        ON au.account_id = a.id
      WHERE au.user_id = ?
      ORDER BY a.name ASC
    `,
    [userId],
  );

  return rows;
};