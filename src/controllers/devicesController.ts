import * as deviceService from "../services/devicesService.js";
import { Request, Response, NextFunction } from "express";

export const getDevices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const locationId = req.query.locationId
      ? Number(req.query.locationId)
      : undefined;
    const devices = await deviceService.getDevices(locationId);
    res.json(devices);
    res.status(200).json(devices);
  } catch (err) {
    next(err);
  }
};

export const getDeviceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid device ID" });
    }
    const device = await deviceService.getDeviceById(id);
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json(device);
  } catch (err) {
    next(err);
  }
};

export const getDeviceCount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const count: number = await deviceService.getDeviceCount();

    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

export const createDevice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deviceData = req.body;

    const requiredFields = [
      "IPv4_address",
      "IPv7_address",
      "MAC_address",
      "subnet_mask",
      "OS",
      "OS_version",
      "installation_date",
      "manufacturer",
      "location_id",
      "floor",
    ];

    for (const field of requiredFields) {
      if (!deviceData[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    const newDevice = await deviceService.createDevice(deviceData);
    res
      .status(201)
      .json(newDevice)
      .location(`/devices/${newDevice.id}`)
      .json(newDevice);
  } catch (err) {
    next(err);
  }
};

export const getDeviceLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid device ID" });
    }

    const location = await deviceService.getDeviceLocation(id);

    if (!location) {
      return res.status(404).json({ error: "Device or location not found" });
    }
    res.json(location);
    res.status(200).json(location);
  } catch (err) {
    next(err);
  }
};

export const updateDevice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "invalid device ID" });
    }

    const updatedDevice = await deviceService.updateDevice(id, req.body);

    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.status(200).json(id);
  } catch (err) {
    next(err);
  }
};

export const deleteDevice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid device id" });
    }

    const deleted = await deviceService.deleteDevice(id);

    if (!deleted) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
