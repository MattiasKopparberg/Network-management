"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { deviceVlanConfig } from "@/app/config/deviceVlanConfig";

export default function UsersPage() {
  return <CrudManager config={deviceVlanConfig} />;
}