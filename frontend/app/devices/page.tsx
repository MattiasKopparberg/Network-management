"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { deviceConfig } from "../config/deviceConfig";

export default function UsersPage() {
  return <CrudManager config={deviceConfig} />;
}