import { db } from "../config/db.js";
export const getAllLocations = async () => {
    const [rows] = await db.query("select * from locations");
    return rows;
};
export const getLocationById = async (id) => {
    const [rows] = await db.query("SELECT * FROM locations WHERE location_id = ?", [id]);
    return rows[0] || null;
};
export const createLocation = async (location) => {
    const [result] = await db.query(`INSERT INTO locations
    (coordinates, address, floor)
    VALUES (?, ?, ?)`, [
        location.coordinates,
        location.address,
        location.floor
    ]);
    return {
        id: result.insertId,
        ...location,
    };
};
export const getLocationByLocation = async (locationId) => {
    const [rows] = await db.query("SELECT * FROM Locations WHERE location_id = ?", [
        locationId,
    ]);
    return rows;
};
export const getLocationDevices = async (id) => {
    const [rows] = await db.query(`SELECT l.*, l.name as location_name
    FROM devices d
    JOIN locations l ON d.location_id = l.location_id
    WHERE d.id = ?`, [id]);
    return rows[0] || null;
};
export const updateLocation = async (id, updates) => {
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
export const deleteLocation = async (id) => {
    const [result] = await db.query("DELETE FROM locations WHERE location_id = ?", [id]);
    return result.affectedRows > 0;
};
