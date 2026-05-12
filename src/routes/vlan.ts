import { Express } from "express";
import getAllVlan from "../controllers/vlanController.js"

const router = express.Router();

router.get("/", getAllVlan)

export default router