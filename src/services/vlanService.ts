import * as vlanRepo from "../repositories/vlanRepository.js";
import type { Vlan, CreateVlanInput } from "../models/vlan.js";

export const getAllVlan = async () => {
    return await vlanRepo.getAllVlan()
}