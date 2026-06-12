import { db } from "../config/db.js";
export const getAllMaintenances = async () => {
    const [rows] = await db.query("SELECT * FROM maintenance");
    return rows;
};
