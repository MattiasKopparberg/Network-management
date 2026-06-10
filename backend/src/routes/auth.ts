import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js"

const router = express.Router();

router.get("/me", loginUser)
router.post("/logiout", registerUser)


export default router
