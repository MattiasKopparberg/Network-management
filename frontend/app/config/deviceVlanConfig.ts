"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import type { DeviceVlan } from "@/app/types/deviceVlan";

export const deviceVlanConfig: CrudConfig<DeviceVlan> = {
  title: "Device VLANs",
  entityName: "Device VLAN",
  endpoint: "http://localhost:5000/deviceVlan",

  columns: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "device_id",
      label: "Device ID",
    },
    {
      key: "vlan_id",
      label: "VLAN ID",
    },
    {
      key: "assignment_date",
      label: "Assignment Date",
    },
  ],

  fields: [
    {
      name: "device_id",
      label: "Device",
      type: "select",
      required: true,
    },
    {
      name: "vlan_id",
      label: "VLAN",
      type: "select",
      required: true,
    },
    {
      name: "assignment_date",
      label: "Assignment Date",
      type: "date",
      required: true,
    },
  ],

  getId: (deviceVlan) => deviceVlan.id,
};