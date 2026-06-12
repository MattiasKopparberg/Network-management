import express from "express";
import { getAllUsers, getUserByEmail } from "../controllers/usersController.js";
const router = express.Router();
router.get("/users", getAllUsers);
router.get("/users/email", getUserByEmail);
export default router;
