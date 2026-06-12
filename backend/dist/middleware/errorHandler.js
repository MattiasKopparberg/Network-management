import { AppError } from "../utils/AppError.js";
export const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }
    res.status(500).json({
        error: "Internal server error"
    });
};
