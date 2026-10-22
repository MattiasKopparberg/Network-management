import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getMyAccounts } from "../controllers/accountsController.js";

const router = express.Router();

router.get("/", requireAuth, getMyAccounts);

export default router;