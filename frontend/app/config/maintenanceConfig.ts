"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import type { Maintenance } from "@/app/types/maintenance";

export const maintenanceConfig: CrudConfig<Maintenance> = {
  title: "Maintenance",
  entityName: "Maintenance Event",
  endpoint: "http://localhost:5000/maintenance",

  columns: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "device_id",
      label: "Device",
    },
    {
      key: "event_date",
      label: "Date",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "performed_by",
      label: "Performed By",
    },
    {
      key: "scheduled",
      label: "Scheduled",
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
      name: "event_date",
      label: "Event Date",
      type: "date",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
    },
    {
      name: "performed_by",
      label: "Performed By",
      type: "select",
      required: true,
    },
    {
      name: "scheduled",
      label: "Scheduled",
      type: "checkbox",
    },
  ],

  getId: (maintenance) => maintenance.id,
};