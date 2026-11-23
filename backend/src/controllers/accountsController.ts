import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as accountsRepository from "../repositories/accountsRepository.js";

export const getMyAccounts = asyncHandler(
  async (_req: Request, res: Response) => {
    const userId = res.locals.userId as number;

    const accounts = await accountsRepository.getAccountsForUser(userId);

    res.status(200).json({ accounts });
  },
);