import { db } from "../config/db.js";
import { Location, CreateLocationInput } from "../models/location.js";
import { ResultSetHeader } from "mysql2";

export const getAllLocations = async () => {
    const [ rows ] = await db.query("select * from locations")
    return rows as Location[];
}

export const getLocationById = async (id: number): Promise<Location | null> => {
  const [rows] = await db.query("SELECT * FROM locations WHERE location_id = ?", [id]);

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

export const getLocationByLocation = async (
  locationId: number,
): Promise<Location[]> => {
  const [rows] = await db.query("SELECT * FROM Locations WHERE location_id = ?", [
    locationId,
  ]);

  return rows as Location[];
};

export const getLocationDevices = async (id: number) => {
  const [rows] = await db.query(
    `SELECT l.*, l.name as location_name
    FROM devices d
    JOIN locations l ON d.location_id = l.location_id
    WHERE d.id = ?`,
    [id],
  );
  return (rows as any[])[0] || null;
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

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  await db.query(`UPDATE locations SET ${setClause} WHERE location_id = ?`, [
    ...values,
    id,
  ]);

  return await getLocationById(id);
};

export const deleteLocation = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM locations WHERE location_id = ?",
    [id],
  );

  return result.affectedRows > 0;
};