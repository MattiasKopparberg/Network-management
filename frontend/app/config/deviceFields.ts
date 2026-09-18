
const deviceFields: CrudField[] = [
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
    name: "installation_date",
    label: "Installation Date",
    type: "date",
    required: true,
  },
  {
    name: "location_id",
    label: "Location",
    type: "select",
    required: false,
  },
];