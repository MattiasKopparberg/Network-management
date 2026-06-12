import { db } from "../config/db.js";
export const getLocations = async () => {
    const [rows] = await db.query("SELECT * FROM locations");
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
export const updateLocation = async (id, updates) => {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
        return null;
    }
    const values = Object.values(updates);
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    await db.query(`UPDATE locations
     SET ${setClause}
     WHERE location_id = ?`, [...values, id]);
    return await getLocationById(id);
};
export const deleteLocation = async (id) => {
    const [result] = await db.query("DELETE FROM locations WHERE location_id = ?", [id]);
    return result.affectedRows > 0;
};
export const getLocationCount = async () => {
    const [rows] = await db.query("SELECT COUNT(*) as count FROM locations");
    return rows[0].count;
};
