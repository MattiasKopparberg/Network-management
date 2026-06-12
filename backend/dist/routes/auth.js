import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
const router = express.Router();
router.get("/login", loginUser);
router.post("/register", registerUser);
export default router;
