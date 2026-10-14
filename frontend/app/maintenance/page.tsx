// import CrudManager from "@/app/components/crud/CrudManager";
// import { maintenanceConfig } from "@/app/components/crud/configs/maintenaceConfig";

// export default function MaintenancePage() {
//   return <CrudManager config={maintenanceConfig} />;
// }
"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { maintenanceConfig } from "@/app/config/maintenanceConfig";

export default function UsersPage() {
  return <CrudManager config={maintenanceConfig} />;
}
