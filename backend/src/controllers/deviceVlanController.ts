import type { Request, Response } from "express";
import * as deviceVlanService from "../services/deviceVlanService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { parseId } from "../utils/parseId.js";
import { requireFields } from "../utils/requiredFields.js";

export const createDeviceVlan = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;

    requireFields(req.body, [
      "device_id",
      "vlan_id",
      "assignment_date",
    ]);

    const deviceId = parseId(String(req.body.device_id));
    const vlanId = parseId(String(req.body.vlan_id));

    const newDeviceVlan = await deviceVlanService.createDeviceVlan(
      {
        device_id: deviceId,
        vlan_id: vlanId,
        assignment_date: req.body.assignment_date,
      },
      accountId,
    );

    res.status(201).json(newDeviceVlan);
  },
);

export const deleteDeviceVlan = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;
    const deviceId = parseId(req.params.deviceId);
    const vlanId = parseId(req.params.vlanId);

    const deleted = await deviceVlanService.deleteDeviceVlan(
      deviceId,
      vlanId,
      accountId,
    );

    if (!deleted) {
      throw new AppError("Device VLAN assignment not found", 404);
    }

    res.status(204).send();
  },
);

export const getDeviceVlanDetails = asyncHandler(
  async (_req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;
    const data = await deviceVlanService.getDeviceVlanDetails(accountId);

    res.status(200).json(data);
  },
);