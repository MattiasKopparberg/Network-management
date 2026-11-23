import type { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "./asyncHandler.js";

export const requireAccountAccess = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;
    const rawAccountId =
      req.params.accountId ?? req.headers["x-account-id"];

    const accountId =
      typeof rawAccountId === "string" ? Number(rawAccountId) : NaN;

    if (!Number.isSafeInteger(accountId) || accountId <= 0) {
      throw new AppError("A valid account ID is required", 400);
    }

    const [rows] = await db.query(
      `SELECT 1
       FROM account_users
       WHERE user_id = ? AND account_id = ?
       LIMIT 1`,
      [userId, accountId],
    );

    if ((rows as unknown[]).length === 0) {
      throw new AppError("Account not found or access denied", 403);
    }

    res.locals.accountId = accountId;
    next();
  },
);