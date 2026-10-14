import { db } from "../config/db.js";
import type {
  Location,
  CreateLocationInput
} from "../models/location.js";

import { ResultSetHeader } from "mysql2";

export const getLocations = async (): Promise<Location[]> => {

  const [rows] = await db.query(
    "SELECT * FROM locations"
  );

  return rows as Location[];
};

export const getLocationById = async (
  id: number
): Promise<Location | null> => {

  const [rows] = await db.query(
    "SELECT * FROM locations WHERE location_id = ?",
    [id]
  );

  return (rows as Location[])[0] || null;
};

export const createLocation = async (
  location: CreateLocationInput,
): Promise<Location> => {

  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO locations
    (coordinates, address, floor)
    VALUES (?, ?, ?)`,
    [
      location.coordinates,
      location.address,
      location.floor
    ]
  );

  return {
    id: result.insertId,
    ...location,
  };
};

export const updateLocation = async (
  id: number,
  updates: Partial<CreateLocationInput>,
): Promise<Location | null> => {

  const fields = Object.keys(updates);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(updates);

  const setClause =
    fields.map((field) => `${field} = ?`).join(", ");

  await db.query(
    `UPDATE locations
     SET ${setClause}
     WHERE location_id = ?`,
    [...values, id]
  );

  return await getLocationById(id);
};

export const deleteLocation = async (
  id: number
): Promise<boolean> => {

  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM locations WHERE location_id = ?",
    [id]
  );

  return result.affectedRows > 0;
};

export const getLocationCount = async (): Promise<number> => {

  const [rows] = await db.query(
    "SELECT COUNT(*) as count FROM locations"
  );

  return (rows as any[])[0].count;
};