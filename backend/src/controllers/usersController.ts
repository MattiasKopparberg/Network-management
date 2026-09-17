import * as usersService from "../services/usersService";
import { Request, Response, NextFunction } from "express"

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

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    const user = await usersService.getUserByEmail(email);

    res.status(200).json(user);

  } catch(err) {
    next(err);
  }
}
