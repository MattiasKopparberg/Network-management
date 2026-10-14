"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { vlanConfig } from "@/app/config/vlanConfig";

export default function UsersPage() {
  return <CrudManager config={vlanConfig} />;
}