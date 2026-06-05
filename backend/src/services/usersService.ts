import type { Users } from "../models/users.js";
import * as userRepo from "../repositories/usersRepository.js";


export const getAllUsers = async (): Promise<Users[]> => {
  return await userRepo.getAllUsers();
};

export const getUserByEmail = async (email: string): Promise<Users[]> => {
  return await userRepo.getUserByEmail(email)
}