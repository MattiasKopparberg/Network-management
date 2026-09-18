import type { Users } from "../models/users.js";
import * as userRepository from "../repositories/usersRepository.js";


export const getAllUsers = async (): Promise<Users[]> => {
  return await userRepository.getAllUsers();
};

export const getUserByEmail = async (email: string): Promise<Users[]> => {
  return await userRepository.getUserByEmail(email)
}