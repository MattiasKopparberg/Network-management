
export interface DeviceVlan {
  account_id: number;
  device_id: number;
  vlan_id: number;
  assignment_date: Date;
}

export type CreateDeviceVlanInput = Omit<
  DeviceVlan,
  "account_id"
>;

export interface DeviceVlanDetails {
  device_id: number;
  IPv4_address: string;
  IPv6_address: string;
  MAC_address: string;
  vlan_id: number;
  vlan_name: string;
  assignment_date: Date;
}
