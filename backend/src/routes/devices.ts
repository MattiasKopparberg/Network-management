import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAccountAccess } from "../middleware/requireAccountAccess.js";
import {
  getDevices,
  getDeviceById,
  getDeviceCount,
  createDevice,
  getDeviceLocation,
  updateDevice,
  deleteDevice,
} from "../controllers/devicesController.js";

const router = express.Router();

router.use(requireAuth);
router.use(requireAccountAccess);

router.get("/", getDevices);
router.get("/count", getDeviceCount);
router.get("/:id/location", getDeviceLocation);
router.get("/:id", getDeviceById);
router.post("/", createDevice);
router.patch("/:id", updateDevice);
router.delete("/:id", deleteDevice);

export default router;