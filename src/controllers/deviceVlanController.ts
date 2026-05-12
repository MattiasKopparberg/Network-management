import * as deviceVlan from "../services/deviceVlanService.js"
import { request, response, NextFunction } from "express"

export const getAllVlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const vlan = await vlanService.getvlan(vlanId);
        res.status(200).json(vlan)
    }
}