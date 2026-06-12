import { db } from "../config/db.js";
export const getAllDevices = async () => {
    const [rows] = await db.query("SELECT * FROM devices");
    return rows;
};
export const getDeviceById = async (id) => {
    const [rows] = await db.query("SELECT * FROM devices WHERE device_id = ?", [id]);
    return rows[0] || null;
};
export const createDevice = async (device) => {
    const [result] = await db.query(`INSERT INTO devices 
    (IPv4_address, IPv6_address, MAC_address, subnet_mask, OS, OS_version, installation_date, manufacturer, location_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        device.IPv4_address,
        device.IPv6_address,
        device.MAC_address,
        device.subnet_mask,
        device.OS,
        device.OS_version,
        device.installation_date,
        device.manufacturer,
        device.location_id,
    ]);
    return {
        id: result.insertId,
        ...device,
    };
};
export const getDevicesByLocation = async (locationId) => {
    const [rows] = await db.query("SELECT * FROM devices WHERE location_id = ?", [
        locationId,
    ]);
    return rows;
};
export const getDeviceLocation = async (id) => {
    const [rows] = await db.query(`SELECT l.*, l.name as location_name
    FROM devices d
    JOIN locations l ON d.location_id = l.location_id
    WHERE d.id = ?`, [id]);
    return rows[0] || null;
};
export const updateDevice = async (id, updates) => {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
        return null;
    }
    const values = Object.values(updates);
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    await db.query(`UPDATE devices SET ${setClause} WHERE device_id = ?`, [
        ...values,
        id,
    ]);
    return await getDeviceById(id);
};
export const deleteDevice = async (id) => {
    const [result] = await db.query("DELETE FROM devices WHERE device_id = ?", [id]);
    return result.affectedRows > 0;
};
