import * as maintenanceService from "../services/maintenanceService.js"
import { Request, Response, NextFunction } from "express"

export const getAllMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const maintenance = await maintenanceService.getAllMaintenances();
        res.status(200).json(maintenance)
    } catch (err){
        next(err)
    }
}