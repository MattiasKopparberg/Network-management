import * as maintenanceRepo from "../repositories/maintenanceRepository.js";
import { Maintenance } from "../models/maintenance.js";

export const getAllMaintenances = async (): Promise<Maintenance[]> => {
  return await maintenanceRepo.getAllMaintenances();
};