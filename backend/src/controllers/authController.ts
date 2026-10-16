import * as authService from "../services/authService.js";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password required", 400);
    }

    const result = await authService.loginUser(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ user: result.user });
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = res.locals.userId;

    const user = await authService.getCurrentUser(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({ user });
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


export const logOutUser = asyncHandler(
  async (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  }
);
