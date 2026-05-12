import { Express } from "express";
import getAllDeviceVlan from "../controllers/deviceVlanController.js"

const router = express.Router();

router.get("/", getAllDeviceVlan)

export default router