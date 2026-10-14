"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import type { Vlan } from "@/app/types/vlan";

export const vlanConfig: CrudConfig<Vlan> = {
  title: "VLANs",
  entityName: "VLAN",
  endpoint: "http://localhost:5000/vlan",

  columns: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "creation_date",
      label: "Creation Date",
    },
    {
      key: "name",
      label: "Name",
    },
  ],

  fields: [
    {
      name: "creation_date",
      label: "Creation Date",
      type: "date",
      required: true,
    },
    {
      name: "name",
      label: "VLAN Name",
      type: "text",
      required: true,
    },
  ],

  getId: (vlan) => vlan.id,
};