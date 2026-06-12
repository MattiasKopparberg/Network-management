import { AppError } from "./AppError.js";
export const parseId = (idParam) => {
    const id = Number(idParam);
    if (isNaN(id) || id <= 0) {
        throw new AppError("Invalid ID", 400);
    }
    return id;
};
