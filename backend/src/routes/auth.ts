
import express from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logOutUser,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", requireAuth, getCurrentUser);
router.post("/logout", logOutUser);
router.post("/register", registerUser);

export default router;
