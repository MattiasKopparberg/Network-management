import express from "express";
import  { 
    createDeviceVlan,
    deleteDeviceVlan,
    // updateDeviceVlan,
    getDeviceVlanDetails
} from "../controllers/deviceVlanController.js";

const router = express.Router();


router.post("/", createDeviceVlan);
router.get("/details", getDeviceVlanDetails)
// router.patch("/:id", updateDeviceVlan);
router.delete("/:id", deleteDeviceVlan);

export default router