export interface DeviceVlan {
  id: number
  device_id: number;
  vlan_id: number;
  assignment_date: Date;
}

export interface DeviceVlanDetails {
  device_id: number;
  hostname: string;
  ip_address: string;

  vlan_id: number;
  vlan_name: string;
  vlan_number: number;

  assignment_date: Date;
};

export type CreateDeviceVlanInput = Omit<DeviceVlan, "id">;
