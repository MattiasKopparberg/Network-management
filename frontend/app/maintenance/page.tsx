"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { maintenanceConfig } from "@/app/config/maintenanceConfig";

export default function UsersPage() {
  return <CrudManager config={maintenanceConfig} />;
}