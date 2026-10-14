"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import type { Device } from "@/app/types/device";

export const deviceConfig: CrudConfig<Device> = {
  title: "Devices",
  entityName: "Device",
  endpoint: "http://localhost:5000/devices",

  columns: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "IPv4_address",
      label: "IPv4 Address",
    },
    {
      key: "IPv6_address",
      label: "IPv6 Address",
    },
    {
      key: "MAC_address",
      label: "MAC Address",
    },
    {
      key: "subnet_mask",
      label: "Subnet Mask",
    },
    {
      key: "OS",
      label: "OS",
    },
    {
      key: "OS_version",
      label: "OS Version",
    },
    {
      key: "installation_date",
      label: "Installation Date",
    },
    {
      key: "manufacturer",
      label: "Manufacturer",
    },
    {
      key: "location_id",
      label: "Location",
    },
  ],

  fields: [
    {
      name: "IPv4_address",
      label: "IPv4 Address",
      type: "text",
      required: true,
    },
    {
      name: "IPv6_address",
      label: "IPv6 Address",
      type: "text",
      required: true,
    },
    {
      name: "MAC_address",
      label: "MAC Address",
      type: "text",
      required: true,
    },
    {
      name: "subnet_mask",
      label: "Subnet Mask",
      type: "text",
      required: true,
    },
    {
      name: "OS",
      label: "OS",
      type: "text",
      required: true,
    },
    {
      name: "OS_version",
      label: "OS Version",
      type: "text",
      required: true,
    },
    {
      name: "installation_date",
      label: "Installation Date",
      type: "date",
      required: true,
    },
    {
      name: "manufacturer",
      label: "Manufacturer",
      type: "text",
      required: true,
    },
    {
      name: "location_id",
      label: "Location",
      type: "select",
      required: false,
    },
  ],

  getId: (device) => device.id,
};