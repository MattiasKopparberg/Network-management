import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAccountAccess } from "../middleware/requireAccountAccess.js";
import {
  createDeviceVlan,
  deleteDeviceVlan,
  getDeviceVlanDetails,
} from "../controllers/deviceVlanController.js";

const router = express.Router();

router.use(requireAuth);
router.use(requireAccountAccess);

router.get("/details", getDeviceVlanDetails);
router.post("/", createDeviceVlan);
router.delete("/:deviceId/:vlanId", deleteDeviceVlan);

export default router;