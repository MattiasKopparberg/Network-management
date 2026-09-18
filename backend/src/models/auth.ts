import { Users } from "./users.js";

export type PublicUser = Omit<Users, "password_hash">;

export type CreateUserInput = Omit<Users, "id">;