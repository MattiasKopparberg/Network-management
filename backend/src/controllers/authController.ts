import * as authService from "../services/authService.js"
import * as usersService from "../services/usersService.js"
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";§  
import { AppError } from "../utils/AppError.js";

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

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const { email } = req.params;

    const user =
      await usersService.getUserByEmail(email);

    res.status(200).json(user);

  } catch(err) {
    next(err);
  }
}