export interface DeviceVlan {
    device_id:number,
    vlan_id: number,
    assignment_date:Date
}

export type CreateDeviceVlanInput = Omit<DeviceVlan, "id">;