import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js"

const router = express.Router();

router.get("/login", loginUser)
router.post("/logout", registerUser)


export default router
