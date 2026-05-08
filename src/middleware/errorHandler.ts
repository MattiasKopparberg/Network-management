import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        })
    }

    res.status(500).json({
        error: "Internal server error"
    })
}