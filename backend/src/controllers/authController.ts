import * as authService from "../services/authService";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { AppError } from "../utils/AppError";

export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(
        "Email and password required",
        400
      );
    }

    const result = await authService.loginUser(
      email,
      password
    );

    res.status(200).json(result);
  }
);

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(
        "Email and password required",
        400
      );
    }

    const user = await authService.registerUser(
      email,
      password
    );

    res.status(201).json(user);
  }
);