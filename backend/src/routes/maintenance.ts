import express from "express";
import { getAllMaintenance } from "../controllers/maintenanceController";

const router = express.Router();

router.get("/maintenance", getAllMaintenance)

export default router