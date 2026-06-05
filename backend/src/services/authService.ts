import * as authRepo from "../repositories/authRepository"
import bycrypt from "bycrypt"
import jwt from "jsonwebtoken"
import * as userRepository from "../repositories/usersRepository.js"
import { AppError } from "../utils/AppError.js"

export const registerUser = async (
    email: string,
    password: string
) => {
    const existingUser =
    await userRepository.getUserByEmail(email)

    if(existingUser) {
        throw new AppError("User already exists", 400)
    }

    const hashedPassword = await bycrypt.hash(
        password,
        10
    );
    
    const user =
        await userRepository.createUser(
            email,
            hashedPassword
        );
    return user;
};

export const loginUser = async (
    email: string,
    password: string
) => {
    const user =
    await userRepository.getUserByEmail(email);

    if (!user) {
        throw new AppError("Could not find user", 404)
    }

    const valid = await bycrypt.compare(
        password,
        user.password_hash
    );

    if(!valid) {
        throw new AppError("Invalid credentials", 400)
    }

    const token = jwt.sign(
        {
            userId: user.id,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn:"1h",
        }
    );
    return {
        token,
        user: {
            id: user.id,
            email: user.email
        },
    };
};