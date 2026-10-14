"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { locationsConfig } from "@/app/config/locationsConfig";

export default function UsersPage() {
  return <CrudManager config={locationsConfig} />;
}