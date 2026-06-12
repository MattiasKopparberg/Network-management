import { AppError } from "./AppError.js";

export const parseId = (idParam: unknown): number => {
  if (typeof idParam !== "string") {
    throw new AppError("Invalid ID parameter", 400);
  }

  const id = Number(idParam);

  if (Number.isNaN(id) || id <= 0) {
    throw new AppError("Invalid ID", 400);
  }

  return id;
};