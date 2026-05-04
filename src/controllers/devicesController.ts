import * as deviceService from "../services/devicesService.js";

export const getDevices = async (req, res, next) => {
  try {
    const devices = await deviceService.getDevices();
    res.json(devices);
  } catch (err) {
    next(err);
  }
};

export const getDeviceById = async (req, res, next) => {
  console.log("Controller hit");

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid device ID" });
    }

    const device = await deviceService.getDeviceById(id);

    if(!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json(device);
  } catch (err) {
    next(err);
  }
};