import { db } from "../config/db.js";

import {
  DeviceVlan,
  CreateDeviceVlanInput,
  DeviceVlanDetails
} from "../models/deviceVlan.js";

import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

export const createDeviceVlan = async (
  deviceVlan: CreateDeviceVlanInput,
): Promise<DeviceVlan> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO devicevlan
    (device_id, vlan_id, assignment_date)
    VALUES (?, ?, ?)`,
    [
      deviceVlan.device_id,
      deviceVlan.vlan_id,
      deviceVlan.assignment_date,
    ],
  );

  return {
    id: result.insertId,
    ...deviceVlan,
  };
};

export const getDeviceVlanById = async (
  id: number,
): Promise<DeviceVlan | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM devicevlan WHERE id = ?`,
    [id],
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as DeviceVlan;
};

export const updateDeviceVlan = async (
  id: number,
  updates: Partial<CreateDeviceVlanInput>,
): Promise<DeviceVlan | null> => {
  const fields = Object.keys(updates);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(updates);

  const setClause = fields
    .map((field) => `${field} = ?`)
    .join(", ");

  await db.query(
    `UPDATE devicevlan
     SET ${setClause}
     WHERE id = ?`,
    [...values, id],
  );

  return await getDeviceVlanById(id);
};

export const deleteDeviceVlan = async (
  id: number,
): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    `DELETE FROM devicevlan WHERE id = ?`,
    [id],
  );

  return result.affectedRows > 0;
};

export const getDeviceVlanDetails = async (): Promise<DeviceVlanDetails[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
      d.id AS device_id,
      d.hostname,
      d.ip_address,

      v.id AS vlan_id,
      v.vlan_name,
      v.vlan_number,

      dv.assignment_date

    FROM devicevlan dv
    JOIN devices d ON dv.device_id = d.id
    JOIN vlan v ON dv.vlan_id = v.id
    `
  );

  return rows as DeviceVlanDetails[];
};