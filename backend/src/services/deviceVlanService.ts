import * as deviceVlanRepo from "../repositories/deviceVlanRepository.js";
import type {
  DeviceVlan,
  CreateDeviceVlanInput,
  DeviceVlanDetails,
} from "../models/deviceVlan.js";

export const createDeviceVlan = async (
  deviceVlanData: CreateDeviceVlanInput,
  accountId: number,
): Promise<DeviceVlan> => {
  return deviceVlanRepo.createDeviceVlan(deviceVlanData, accountId);
};

export const deleteDeviceVlan = async (
  deviceId: number,
  vlanId: number,
  accountId: number,
): Promise<boolean> => {
  return deviceVlanRepo.deleteDeviceVlan(deviceId, vlanId, accountId);
};

export const getDeviceVlanDetails = async (
  accountId: number,
): Promise<DeviceVlanDetails[]> => {
  return deviceVlanRepo.getDeviceVlanDetails(accountId);
};