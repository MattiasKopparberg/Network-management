import { Express } from "express";
import  { 
    getAllDeviceVlan, 
    // getDeviceVlanCount, 
    // getDeviceVlanLocation, 
    // getDeviceVlanById, 
    // createDeviceVlan, 
    // updateDeviceVlan, 
    // deleteDeviceVlan 
} from "../controllers/deviceVlanController.js";

const router = express.Router();

router.get("/", getAllDeviceVlan)
// router.get("/count", getDeviceVlanCount);
// router.get("/:id/location", getDeviceVlanLocation);
// router.get("/:id", getDeviceVlanById);
// router.post("/", createDeviceVlan);
// router.patch("/:id", updateDeviceVlan);
// router.delete("/:id", deleteDeviceVlan);

export default router