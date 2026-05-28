import * as deviceRepo from "../repositories/devicesRepository.js";
import type { Devices, CreateDeviceInput } from "../models/devices.js";

export const getDevices = async (locationId?: number): Promise<Devices[]> => {
  if (locationId) {
    return await deviceRepo.getDevicesByLocation(locationId);
  }
  return await deviceRepo.getAllDevices();
};

export const getDeviceById = async (id: number) => {
  return await deviceRepo.getDeviceById(id);
};

export const getDeviceCount = async () => {
  const devices = await deviceRepo.getAllDevices();
  return devices.length;
};

export const createDevice = async (deviceData: Devices) => {
  return await deviceRepo.createDevice(deviceData);
};

export const getDeviceLocation = async (id: number) => {
  return await deviceRepo.getDevicesByLocation(id);
};

export const updateDevice = async (
  id: number,
  updates: Partial<CreateDeviceInput>
) => {
  return await deviceRepo.updateDevice(id, updates);
};

export const deleteDevice = async (id: number): Promise<boolean> => {
  return await deviceRepo.deleteDevice(id);
};
