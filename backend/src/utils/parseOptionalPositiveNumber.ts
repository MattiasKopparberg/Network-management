import { ParsedQs } from "qs";
import { AppError } from "./AppError.js";

export const parseOptionalPositiveNumber = (
  value:
    | string
    | ParsedQs
    | (string | ParsedQs)[]
    | undefined,
): number | undefined => {
  if (!value) return undefined;

  const v = Array.isArray(value) ? value[0] : value;

  if (typeof v !== "string") {
    throw new AppError("Invalid query parameter", 400);
  }

  const num = Number(v);

  if (Number.isNaN(num) || num <= 0) {
    throw new AppError("Invalid number parameter", 400);
  }

  return num;
};