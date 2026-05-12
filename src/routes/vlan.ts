import express from "express";
import {
  getAllVlan,
//   getVlanById,
//   getVlanCount,
//   createVlan,
//   updateVlan,
//   deleteVlan,
} from "../controllers/vlanController.js";

const router = express.Router();

router.get("/", getAllVlan);
// router.get("/count", getVlan);
// router.get("/:id", getVlanById);
// router.post("/", createVlan);
// router.patch("/:id", updateVlan);
// router.delete("/:id", deleteVlan);

export default router