import * as vlan from "../services/vlanService.js"
import { request, response, NextFunction } from "express"

export const getAllvlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        vlan = await vlanService.getvlan(vlanId);
        res.status(200).json(vlan)
    }
}