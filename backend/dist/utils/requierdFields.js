import { AppError } from "./AppError.js";
export const requireFields = (body, fields) => {
    for (const field of fields) {
        if (!body[field]) {
            throw new AppError(`${field} is required`, 400);
        }
    }
};
