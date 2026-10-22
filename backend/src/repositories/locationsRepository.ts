
import { db } from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type {
  Location,
  CreateLocationInput,
} from "../models/location.js";

type LocationRow = RowDataPacket & {
  location_id: number;
  coordinates: string;
  address: string;
  floor: number;
};

const mapLocation = (row: LocationRow): Location => ({
  id: row.location_id,
  coordinates: row.coordinates,
  address: row.address,
  floor: row.floor,
});

export const getAllLocations = async (
  accountId: number,
): Promise<Location[]> => {
  const [rows] = await db.query<LocationRow[]>(
    `SELECT location_id, coordinates, address, floor
     FROM locations
     WHERE account_id = ?
     ORDER BY location_id`,
    [accountId],
  );

  return rows.map(mapLocation);
};

export const getLocationById = async (
  id: number,
  accountId: number,
): Promise<Location | null> => {
  const [rows] = await db.query<LocationRow[]>(
    `SELECT location_id, coordinates, address, floor
     FROM locations
     WHERE location_id = ? AND account_id = ?
     LIMIT 1`,
    [id, accountId],
  );

  return rows[0] ? mapLocation(rows[0]) : null;
};

export const createLocation = async (
  location: CreateLocationInput,
  accountId: number,
): Promise<Location> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO locations
      (account_id, coordinates, address, floor)
     VALUES (?, ?, ?, ?)`,
    [accountId, location.coordinates, location.address, location.floor],
  );

  return {
    id: result.insertId,
    ...location,
  };
};

export const updateLocation = async (
  id: number,
  updates: Partial<CreateLocationInput>,
  accountId: number,
): Promise<Location | null> => {
  const allowedFields = ["coordinates", "address", "floor"] as const;
  const fields = allowedFields.filter(
    (field) => updates[field] !== undefined,
  );

  if (fields.length === 0) {
    return getLocationById(id, accountId);
  }

  const values = fields.map((field) => updates[field]);

  const setClause = fields
    .map((field) => `${field} = ?`)
    .join(", ");

  const [result] = await db.query<ResultSetHeader>(
    `UPDATE locations
     SET ${setClause}
     WHERE location_id = ? AND account_id = ?`,
    [...values, id, accountId],
  );

  if (result.affectedRows === 0) {
    return getLocationById(id, accountId);
  }

  return getLocationById(id, accountId);
};

export const deleteLocation = async (
  id: number,
  accountId: number,
): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    `DELETE FROM locations
     WHERE location_id = ? AND account_id = ?`,
    [id, accountId],
  );

  return result.affectedRows > 0;
};

export const getLocationCount = async (
  accountId: number,
): Promise<number> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS count
     FROM locations
     WHERE account_id = ?`,
    [accountId],
  );

  return Number(rows[0].count);
};
