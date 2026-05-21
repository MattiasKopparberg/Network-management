import * as deviceVlanService from "../services/deviceVlanService.js";
import { Request, Response, NextFunction } from "express";

export const createDeviceVlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deviceVlanData = req.body;

    const requiredFields = [
      "device_id",
      "vlan_id",
      "assignment_date",
    ];

    for (const field of requiredFields) {
      if (!deviceVlanData[field]) {
        return res.status(400).json({
          error: `${field} is required`,
        });
      }
    }

    const newDeviceVlan =
      await deviceVlanService.createDeviceVlan(deviceVlanData);

    return res.status(201).json(newDeviceVlan);
  } catch (err) {
    next(err);
  }
};

export const deleteDeviceVlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid deviceVlan id",
      });
    }

    const deleted =
      await deviceVlanService.deleteDeviceVlan(id);

    if (!deleted) {
      return res.status(404).json({
        error: "DeviceVlan not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getDeviceVlanDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await deviceVlanService.getDeviceVlanDetails();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};