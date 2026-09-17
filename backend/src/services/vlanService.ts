import * as vlanRepo from "../repositories/vlanRepository";
import type { Vlan, CreateVlanInput } from "../models/vlan";

export const getAllVlan = async (): Promise<Vlan[]> => {
  return await vlanRepo.getAllVlan();
};