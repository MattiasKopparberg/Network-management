import * as deviceRepo from "../repositories/devicesRepository.js";

export const getDevices = async () => {
  return await deviceRepo.getAllDevices();
};

export const getDeviceById = async (id: number) => {
  return await deviceRepo.getDeviceById(id);
};