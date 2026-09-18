import * as vlanRepo from "../repositories/vlanRepository.js";
import type { Vlan, CreateVlanInput } from "../models/vlan.js";

export const getAllVlan = async (): Promise<Vlan[]> => {
  return await vlanRepo.getAllVlan();
};