import * as deviceVlanRepo from "../repositories/deviceVlanRepository.js";
export const createDeviceVlan = async (deviceVlanData) => {
    return await deviceVlanRepo.createDeviceVlan(deviceVlanData);
};
export const deleteDeviceVlan = async (id) => {
    return await deviceVlanRepo.deleteDeviceVlan(id);
};
export const getDeviceVlanDetails = async () => {
    return await deviceVlanRepo.getDeviceVlanDetails();
};
