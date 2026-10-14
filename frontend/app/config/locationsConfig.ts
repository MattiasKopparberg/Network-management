"use client";

import type { CrudConfig } from "@/app/types/CRUD";
import type { Location } from "@/app/types/location";

export const locationsConfig: CrudConfig<Location> = {
  title: "Locations",
  entityName: "Location",
  endpoint: "http://localhost:5000/locations",

  columns: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "coordinates",
      label: "Coordinates",
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "floor",
      label: "Floor",
    },
  ],

  fields: [
    {
      name: "coordinates",
      label: "Coordinates",
      type: "text",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      required: true,
    },
    {
      name: "floor",
      label: "Floor",
      type: "text",
      required: true,
    },
  ],

  getId: (location) => location.id,
};