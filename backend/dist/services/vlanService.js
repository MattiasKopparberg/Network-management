import * as vlanRepo from "../repositories/vlanRepository.js";
export const getAllVlan = async () => {
    return await vlanRepo.getAllVlan();
};
