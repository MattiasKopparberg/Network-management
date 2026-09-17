import mysql from "mysql2/promise"
import "dotenv/config"

const dbInitStatements = [
"DROP DATABASE IF EXISTS network;",
"CREATE DATABASE network;",
"USE network;",

"CREATE TABLE locations ( id INT PRIMARY KEY AUTO_INCREMENT, coordinates VARCHAR(50), address VARCHAR(50), floor VARCHAR(20));",

"INSERT INTO locations (coordinates, address, floor) VALUES ('59.3293N,18.0686E', 'Serverrum A', '5'), ('59.3320N,18.0649E', 'Kontor 101', '1'), ('59.3330N,18.0700E', 'Kontor 202', '2');",

"CREATE TABLE users ( id INT PRIMARY KEY AUTO_INCREMENT, fname VARCHAR(25), lname VARCHAR(25), username VARCHAR(25), user_group VARCHAR(15), email VARCHAR(100) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL);",

"INSERT INTO users(fname, lname, username, user_group, email, password_hash) VALUES ('Alice', 'Andersson', 'alice', 'IT', 'alice@example.com', '$2b$10$hash1'), ('Bob', 'Berg', 'bob', 'Admin', 'bob@example.com', '$2b$10$hash2'), ('Clara', 'Carlsson', 'clara', 'Network', 'clara@example.com', '$2b$10$hash3'), ('David', 'Dahl', 'david', 'IT', 'david@example.com', '$2b$10$hash4'), ('Eva', 'Eriksson', 'eva', 'Network', 'eva@example.com', '$2b$10$hash5');",

"CREATE TABLE vlan (id INT PRIMARY KEY AUTO_INCREMENT, creation_date DATE NOT NULL, name VARCHAR(25));",

"INSERT INTO vlan (creation_date, name) VALUES ('2020-01-01', 'VLAN10'), ('2021-05-10', 'VLAN20'), ('2022-03-15', 'VLAN30');",

"CREATE TABLE devices (id INT PRIMARY KEY AUTO_INCREMENT, IPv4_address VARCHAR(24) NOT NULL, IPv6_address VARCHAR(126) NOT NULL, MAC_address VARCHAR(64) NOT NULL, subnet_mask VARCHAR(24) NOT NULL, OS VARCHAR(30) NOT NULL, OS_version VARCHAR(30) NOT NULL, installation_date DATE NOT NULL, manufacturer VARCHAR(30) NOT NULL, location_id INT, FOREIGN KEY (location_id) REFERENCES locations(id));",

"INSERT INTO devices (IPv4_address, IPv6_address, MAC_address, subnet_mask, OS, OS_version, installation_date, manufacturer, location_id) VALUES ('192.168.1.10', 'fe80::1', 'AA:BB:CC:DD:EE:01', '255.255.255.0', 'Windows', '11', '2023-01-01', 'Dell', 1), ('192.168.1.11', 'fe80::2', 'AA:BB:CC:DD:EE:02', '255.255.255.0', 'Linux', 'Ubuntu 22', '2023-02-01', 'HP', 2), ('192.168.1.12', 'fe80::3', 'AA:BB:CC:DD:EE:03', '255.255.255.0', 'Cisco IOS', '15.0', '2023-03-01', 'Cisco', 3);",

"CREATE TABLE deviceVlan (device_id INT, vlan_id INT, assignment_date DATE, PRIMARY KEY (device_id, vlan_id), FOREIGN KEY (device_id) REFERENCES devices(id), FOREIGN KEY (vlan_id) REFERENCES vlan(id));",

"INSERT INTO deviceVlan (device_id, vlan_id, assignment_date) VALUES(1, 1, '2024-01-10'), (1, 2, '2024-01-10'), (2, 2, '2024-02-15'), (3, 3, '2024-03-01');",

"CREATE TABLE maintenance (id INT PRIMARY KEY AUTO_INCREMENT, device_id INT NOT NULL, event_date DATE, description VARCHAR(255), performed_by INT NOT NULL, scheduled TINYINT(1), FOREIGN KEY (device_id) REFERENCES devices(id), FOREIGN KEY (performed_by) REFERENCES users(id));",

"INSERT INTO maintenance (device_id, event_date, description, performed_by, scheduled) VALUES (1, '2023-01-10', 'OS update', 2, 0), (3, '2023-02-20', 'Firmware upgrade', 3, 0), (2, '2023-05-01', 'Security patch', 2, 1);",
]

console.log("Seed running")

const adminDb = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connection = await adminDb.getConnection();

try {
  console.log("Resetting database...");

  await connection.query("DROP DATABASE IF EXISTS network");
  await connection.query("CREATE DATABASE network");
  await connection.query("USE network");

  console.log("Database created");

  for (const statement of dbInitStatements) {
    await connection.query(statement);
    console.log(
      `Executed: ${statement.slice(0, 75)} ${statement.length > 75 && "..."}`,
    );
  }

  console.log("Database seeded!");
} catch (err) {
  console.error("Seed failed:", err);
} finally {
  if (connection) connection.release();
  process.exit(0);
}
