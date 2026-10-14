"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { userConfig } from "@/app/config/usersConfig";

export default function UsersPage() {
  return <CrudManager config={userConfig} />;
}