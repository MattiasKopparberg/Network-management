// import CrudManager from "@/app/components/crud/CrudManager";
// import { vlanConfig } from "@/app/components/crud/configs/vlanConfig";

// export default function VlanPage() {
//   return <CrudManager config={VlanConfig} />;
// }
"use client"

import CrudManager from "@/app/components/ui/crudManager";
import { vlanConfig } from "@/app/config/vlanConfig";

export default function UsersPage() {
  return <CrudManager config={vlanConfig} />;
}
