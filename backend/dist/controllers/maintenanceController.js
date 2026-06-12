import * as maintenanceService from "../services/maintenanceService.js";
export const getAllMaintenance = async (req, res, next) => {
    try {
        const maintenance = await maintenanceService.getAllMaintenances();
        res.status(200).json(maintenance);
    }
    catch (err) {
        next(err);
    }
};
