import * as maintenanceRepo from "../repositories/maintenanceRepository.js";
export const getAllMaintenances = async () => {
    return await maintenanceRepo.getAllMaintenances();
};
