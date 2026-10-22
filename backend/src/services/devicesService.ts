import * as deviceRepo from "../repositories/devicesRepository.js";
import type {
  Devices,
  CreateDeviceInput,
} from "../models/devices.js";

export const getDevices = async (
  accountId: number,
  locationId?: number,
): Promise<Devices[]> => {
  if (locationId !== undefined) {
    return deviceRepo.getDevicesByLocation(locationId, accountId);
  }

  return deviceRepo.getAllDevices(accountId);
};

export const getDeviceById = async (
  id: number,
  accountId: number,
): Promise<Devices | null> => {
  return deviceRepo.getDeviceById(id, accountId);
};

export const getDeviceCount = async (
  accountId: number,
): Promise<number> => {
  const devices = await deviceRepo.getAllDevices(accountId);
  return devices.length;
};

export const createDevice = async (
  deviceData: CreateDeviceInput,
  accountId: number,
): Promise<Devices> => {
  return deviceRepo.createDevice(deviceData, accountId);
};

export const getDeviceLocation = async (
  id: number,
  accountId: number,
) => {
  return deviceRepo.getDeviceLocation(id, accountId);
};

export const updateDevice = async (
  id: number,
  accountId: number,
  updates: Partial<CreateDeviceInput>,
): Promise<Devices | null> => {
  return deviceRepo.updateDevice(id, accountId, updates);
};

export const deleteDevice = async (
  id: number,
  accountId: number,
): Promise<boolean> => {
  return deviceRepo.deleteDevice(id, accountId);
};