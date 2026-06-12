import * as deviceRepo from "../repositories/devicesRepository.js";
export const getDevices = async (locationId) => {
    if (locationId) {
        return await deviceRepo.getDevicesByLocation(locationId);
    }
    return await deviceRepo.getAllDevices();
};
export const getDeviceById = async (id) => {
    return await deviceRepo.getDeviceById(id);
};
export const getDeviceCount = async () => {
    const devices = await deviceRepo.getAllDevices();
    return devices.length;
};
export const createDevice = async (deviceData) => {
    return await deviceRepo.createDevice(deviceData);
};
export const getDeviceLocation = async (id) => {
    return await deviceRepo.getDevicesByLocation(id);
};
export const updateDevice = async (id, updates) => {
    return await deviceRepo.updateDevice(id, updates);
};
export const deleteDevice = async (id) => {
    return await deviceRepo.deleteDevice(id);
};
