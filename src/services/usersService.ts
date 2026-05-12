import { User } from "../models/users.js";
import * as userRepo from "../repositories/usersRepository.js";

export const getAllUsers = async (): Promise<User[]> => {
  return await userRepo.getAllUsers();
};