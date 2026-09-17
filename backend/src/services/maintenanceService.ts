import * as maintenanceRepo from "../repositories/maintenanceRepository";
import { Maintenance } from "../models/maintenance";

export const getAllMaintenances = async (): Promise<Maintenance[]> => {
  return await maintenanceRepo.getAllMaintenances();
};