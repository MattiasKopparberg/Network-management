import * as deviceVlanRepo from "../repositories/deviceVlanRepository.js";

import type {
  DeviceVlan,
  CreateDeviceVlanInput,
  DeviceVlanDetails
} from "../models/deviceVlan.js";

export const createDeviceVlan = async (
  deviceVlanData: CreateDeviceVlanInput,
): Promise<DeviceVlan> => {
  return await deviceVlanRepo.createDeviceVlan(deviceVlanData);
};

export const deleteDeviceVlan = async (
  id: number,
): Promise<boolean> => {
  return await deviceVlanRepo.deleteDeviceVlan(id);
};

export const getDeviceVlanDetails = async (): Promise<DeviceVlanDetails[]> => {
  return await deviceVlanRepo.getDeviceVlanDetails();
};