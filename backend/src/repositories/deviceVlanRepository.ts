
import { db } from "../config/db.js";
import type {
  DeviceVlan,
  CreateDeviceVlanInput,
  DeviceVlanDetails,
} from "../models/deviceVlan.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getDeviceVlanById = async (
  deviceId: number,
  vlanId: number,
  accountId: number,
): Promise<DeviceVlan | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT *
     FROM deviceVlan
     WHERE device_id = ?
       AND vlan_id = ?
       AND account_id = ?`,
    [deviceId, vlanId, accountId],
  );

  return (rows[0] as DeviceVlan | undefined) ?? null;
};

export const createDeviceVlan = async (
  deviceVlan: CreateDeviceVlanInput,
  accountId: number,
): Promise<DeviceVlan> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO deviceVlan
      (account_id, device_id, vlan_id, assignment_date)
     SELECT ?, d.device_id, v.vlan_id, ?
     FROM devices d
     JOIN vlan v
       ON v.account_id = d.account_id
     WHERE d.device_id = ?
       AND v.vlan_id = ?
       AND d.account_id = ?`,
    [
      accountId,
      deviceVlan.assignment_date,
      deviceVlan.device_id,
      deviceVlan.vlan_id,
      accountId,
    ],
  );

  if (result.affectedRows === 0) {
    throw new Error("Device or VLAN not found in this account");
  }

  return {
    account_id: accountId,
    ...deviceVlan,
  };
};

export const deleteDeviceVlan = async (
  deviceId: number,
  vlanId: number,
  accountId: number,
): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    `DELETE FROM deviceVlan
     WHERE device_id = ?
       AND vlan_id = ?
       AND account_id = ?`,
    [deviceId, vlanId, accountId],
  );

  return result.affectedRows > 0;
};

export const getDeviceVlanDetails = async (
  accountId: number,
): Promise<DeviceVlanDetails[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT
       d.device_id,
       d.IPv4_address,
       d.IPv6_address,
       d.MAC_address,
       v.vlan_id,
       v.name AS vlan_name,
       dv.assignment_date
     FROM deviceVlan dv
     JOIN devices d
       ON dv.account_id = d.account_id
      AND dv.device_id = d.device_id
     JOIN vlan v
       ON dv.account_id = v.account_id
      AND dv.vlan_id = v.vlan_id
     WHERE dv.account_id = ?`,
    [accountId],
  );

  return rows as DeviceVlanDetails[];
};
