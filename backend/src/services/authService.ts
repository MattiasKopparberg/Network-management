import * as authRepository from "../repositories/authRepository.js"
import * as userRepository from "../repositories/usersRepository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError.js"

export const registerUser = async (
    email: string,
    password: string
) => {
    const existingUser =
    await authRepository.getUserByEmail(email)

    if(existingUser) {
        throw new AppError("User already exists", 400)
    }

    const hashedPassword = await bcrypt.hash(
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
    await authRepository.getUserByEmail(email);

    if (!user) {
        throw new AppError("Could not find user", 404)
    }

    const valid = await bcrypt.compare(
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