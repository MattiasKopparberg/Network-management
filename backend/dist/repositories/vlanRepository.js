import { db } from "../config/db.js";
export const getAllVlan = async () => {
    const [rows] = await db.query("SELECT * FROM vlan");
    return rows;
};
