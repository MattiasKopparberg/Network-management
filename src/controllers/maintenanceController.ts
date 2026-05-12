import * as maintenance from "../services/maintenanceService.js"
import { request, response, NextFunction } from "express"

export const getAllMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const maintenance = await maintenanceService.getvlan(maintenanceId);
        res.status(200).json(maintenance)
    }
}