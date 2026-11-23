import type { Request, Response } from "express";
import * as deviceService from "../services/devicesService.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { parseId } from "../utils/parseId.js";
import { parseOptionalPositiveNumber } from "../utils/parseOptionalPositiveNumber.js";

export const getDevices = asyncHandler(async (req: Request, res: Response) => {
  const accountId = res.locals.accountId as number;
  const locationId = parseOptionalPositiveNumber(req.query.locationId);

  const devices = await deviceService.getDevices(accountId, locationId);

  res.status(200).json(devices);
});

export const getDeviceById = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;
    const id = parseId(req.params.id);

    const device = await deviceService.getDeviceById(id, accountId);

    if (!device) {
      throw new AppError("Device not found", 404);
    }

    res.status(200).json(device);
  },
);

export const getDeviceCount = asyncHandler(
  async (_req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;
    const count = await deviceService.getDeviceCount(accountId);

    res.status(200).json({ count });
  },
);

export const createDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;

    const requiredFields = [
      "IPv4_address",
      "IPv6_address",
      "MAC_address",
      "subnet_mask",
      "OS",
      "OS_version",
      "installation_date",
      "manufacturer",
      "location_id",
    ];

    for (const field of requiredFields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
      ) {
        throw new AppError(`${field} is required`, 400);
      }
    }

    const newDevice = await deviceService.createDevice(
      req.body,
      accountId,
    );

    res.status(201).json(newDevice);
  },
);

export const getDeviceLocation = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;
    const id = parseId(req.params.id);

    const location = await deviceService.getDeviceLocation(id, accountId);

    if (!location) {
      throw new AppError("Device or location not found", 404);
    }

    res.status(200).json(location);
  },
);

export const updateDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;
    const id = parseId(req.params.id);

    const updatedDevice = await deviceService.updateDevice(
      id,
      accountId,
      req.body,
    );

    if (!updatedDevice) {
      throw new AppError("Device not found", 404);
    }

    res.status(200).json(updatedDevice);
  },
);

export const deleteDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = res.locals.accountId as number;
    const id = parseId(req.params.id);

    const deleted = await deviceService.deleteDevice(id, accountId);

    if (!deleted) {
      throw new AppError("Device not found", 404);
    }

    res.status(204).send();
  },
);
