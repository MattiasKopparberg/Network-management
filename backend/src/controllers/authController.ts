import * as authService from "../services/authService.js"
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";§  
import { AppError } from "../utils/AppError.js";

export const login = asyncHandler(async (req: Request, res: Response) => {
    const {email password } = await authService.register(email, password)
    console.log(email, password)

    if (!email || !password) {
            throw new AppError("Email and password must be valid", 400)
    }

    res.status(200).json({email, password})
});

export const register = asyncHandler(async (req: Request, res: Response) => {
        const {email, password } = await authService.register(email, password)

        if (!email || !password) {
            throw new AppError("Email and password must be valid", 400)
        }
        res.status(201).json(email, password)
})