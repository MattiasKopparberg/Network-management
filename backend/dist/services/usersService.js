import * as userRepository from "../repositories/usersRepository.js";
export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};
export const getUserByEmail = async (email) => {
    return await userRepository.getUserByEmail(email);
};
