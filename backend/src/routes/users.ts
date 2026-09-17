import express from "express";
import { getAllUsers, getUserByEmail } from "../controllers/usersController";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/email/:email", getUserByEmail)

export default router