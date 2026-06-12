import * as deviceVlanService from "../services/deviceVlanService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { parseId } from "../utils/parseId.js";
import { requireFields } from "../utils/requierdFields.js";
export const createDeviceVlan = asyncHandler(async (req, res) => {
    requireFields(req.body, [
        "device_id",
        "vlan_id",
        "assignment_date",
    ]);
    const newDeviceVlan = await deviceVlanService.createDeviceVlan(req.body);
    res.status(201).json(newDeviceVlan);
});
export const deleteDeviceVlan = asyncHandler(async (req, res) => {
    const id = parseId(req.params.id);
    const deleted = await deviceVlanService.deleteDeviceVlan(id);
    if (!deleted) {
        throw new AppError("DeviceVlan not found", 404);
    }
    res.status(204).send();
});
export const getDeviceVlanDetails = asyncHandler(async (req, res) => {
    const data = await deviceVlanService.getDeviceVlanDetails();
    res.status(200).json(data);
});
