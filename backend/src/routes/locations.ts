
import express from "express";
import {
  getLocations,
  getLocationById,
  getLocationCount,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationsController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAccountAccess } from "../middleware/requireAccountAccess.js";

const router = express.Router();

router.use(requireAuth);
router.use(requireAccountAccess);

router.get("/", getLocations);
router.get("/count", getLocationCount);
router.get("/:id", getLocationById);
router.post("/", createLocation);
router.patch("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;
