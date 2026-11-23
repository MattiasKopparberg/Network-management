import * as usersService from "../services/usersService.js";
import { Request, Response, NextFunction } from "express"
import { asyncHandler } from "../middleware/asyncHandler.js";
import { parseId } from "../utils/parseId.js";
import { AppError } from "../utils/AppError.js";
import * as authService from "../services/authService.js"

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await usersService.getAllUsers();
        res.status(200).json(user)
    } catch(err) {
        next(err);
    }
}
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseId(req.params.id);

  const user = await usersService.getUserById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json(user);
});


export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = res.locals.userId as number;

    const user = await authService.getCurrentUser(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({ user });
  }
);



export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;

    if (typeof email !== "string" || !email) {
      return res.status(400).json({
        error: "A valid email parameter is required",
      });
    }

    const user = await usersService.getUserByEmail(email);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

