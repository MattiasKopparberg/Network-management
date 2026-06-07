import express from "express";
import { login, register } from "../controllers/authController.js"
import { getUserByEmail } from "../controllers/authController.js";

const router = express.Router();

router.get("/me", login)
router.get("/users/email", getUserByEmail)
router.post("/logiout", register)


export default router
