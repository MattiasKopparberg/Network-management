import * as users from "../services/usersService.js"
import { request, response, NextFunction } from "express"

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await usersService.getvlan(userId);
        res.status(200).json(user)
    }
}