import * as deviceVlanService from "../services/deviceVlanService";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { AppError } from "../utils/AppError";
import { parseId } from "../utils/parseId";
import { requireFields } from "../utils/requiredFields";

export const createDeviceVlan = asyncHandler(async (req, res) => {
  requireFields(req.body, [
    "device_id",
    "vlan_id",
    "assignment_date",
  ]);

  const newDeviceVlan =
    await deviceVlanService.createDeviceVlan(req.body);

  res.status(201).json(newDeviceVlan);
});

export const deleteDeviceVlan = asyncHandler(async (req: Request, res: Response) => {
  const id = parseId(req.params.id);

  const deleted =
    await deviceVlanService.deleteDeviceVlan(id);

  if (!deleted) {
    throw new AppError("DeviceVlan not found", 404);
  }

  res.status(204).send();
});

export const getDeviceVlanDetails = asyncHandler(async (req: Request, res: Response) => {
  const data = await deviceVlanService.getDeviceVlanDetails();
  res.status(200).json(data);
});