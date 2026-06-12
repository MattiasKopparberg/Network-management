import * as usersService from "../services/usersService.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const user = await usersService.getAllUsers();
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};
export const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await usersService.getUserByEmail(email);
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};
