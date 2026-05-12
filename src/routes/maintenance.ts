import { Express } from "express";
import getAllMaintenance from "../controllers/maintenanceController.js"

const router = express.Router();

router.get("/maintenance", getAllMaintenance)

export default router