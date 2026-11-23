"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { deviceConfig } from "@/app/config/deviceConfig";

export default function UsersPage() {
  return <CrudManager config={deviceConfig} />;
}
