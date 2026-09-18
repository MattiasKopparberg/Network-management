import * as vlanService from "../services/vlanService.js";
import { Request, Response, NextFunction } from "express";

export const getAllVlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const vlan = await vlanService.getAllVlan();
        res.status(200).json(vlan);
    } catch (err) {
        next(err);
    }
};

// export const getVlanByID = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     try {
//         const id = Number(req.params.id);

//         if (isNaN(id) || id <= 0) {
//             return res.status(400).json({ error: "Invalid VLAN ID" });
//         }

//         const vlan = await vlanService.getVlanById(id);

//         if (!vlan) {
//             return res.status(404).json({ error: "VLAN not found" });
//         }

//         res.status(200).json(vlan);
//     } catch (err) {
//         next(err);
//     }
// };