import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import "dotenv/config";

async function seed() {
  const adminDb = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  });

  let connection: mysql.PoolConnection | undefined;

  try {
    connection = await adminDb.getConnection();

    console.log("Resetting network database...");

    await connection.query("DROP DATABASE IF EXISTS network");
    await connection.query(
      "CREATE DATABASE network",
    );
    await connection.query("USE network");

    await connection.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        fname VARCHAR(25),
        lname VARCHAR(25),
        username VARCHAR(25),
        user_group VARCHAR(15),
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        platform_role ENUM('superadmin', 'user')
          NOT NULL DEFAULT 'user'
      )
    `);

    await connection.query(`
      CREATE TABLE accounts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE account_users (
        account_id INT NOT NULL,
        user_id INT NOT NULL,
        role ENUM('owner', 'admin', 'viewer')
          NOT NULL DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (account_id, user_id),

        FOREIGN KEY (account_id)
          REFERENCES accounts(id) ON DELETE CASCADE,

        FOREIGN KEY (user_id)
          REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    const passwordHash = await bcrypt.hash(
      "DevPassword123!",
      10,
    );

    await connection.query(
      `INSERT INTO users
        (fname, lname, username, user_group, email,
         password_hash, platform_role)
       VALUES
        (?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?)`,
      [
        "Alice", "Andersson", "alice", "IT",
        "alice@example.test", passwordHash, "user",

        "Bob", "Berg", "bob", "Admin",
        "bob@example.test", passwordHash, "superadmin",

        "Clara", "Carlsson", "clara", "Network",
        "clara@example.test", passwordHash, "user",

        "David", "Dahl", "david", "IT",
        "david@example.test", passwordHash, "user",

        "Eva", "Eriksson", "eva", "Network",
        "eva@example.test", passwordHash, "user",
      ],
    );

    await connection.query(`
      INSERT INTO accounts (name)
      VALUES
        ('Example Customer A'),
        ('Example Customer B')
    `);

    await connection.query(`
      INSERT INTO account_users (account_id, user_id, role)
      VALUES
        (1, 1, 'owner'),
        (1, 2, 'admin'),
        (1, 3, 'admin'),
        (2, 2, 'admin'),
        (2, 4, 'viewer'),
        (2, 5, 'owner')
    `);

    await connection.query(`
      CREATE TABLE locations (
        location_id INT PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        coordinates VARCHAR(50),
        address VARCHAR(100),
        floor VARCHAR(20),

        UNIQUE (account_id, location_id),

        FOREIGN KEY (account_id)
          REFERENCES accounts(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      INSERT INTO locations
        (account_id, coordinates, address, floor)
      VALUES
        (1, '59.3293N,18.0686E', 'Serverrum A', '5'),
        (1, '59.3320N,18.0649E', 'Kontor 101', '1'),
        (1, '59.3330N,18.0700E', 'Kontor 202', '2'),
        (2, '59.3400N,18.0800E', 'Customer B Server Room', '1')
    `);
    await connection.query(`
      CREATE TABLE vlan (
        vlan_id INT PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        creation_date DATE NOT NULL,
        name VARCHAR(25),

        UNIQUE (account_id, vlan_id),

        FOREIGN KEY (account_id)
          REFERENCES accounts(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      INSERT INTO vlan (account_id, creation_date, name)
      VALUES
        (1, '2020-01-01', 'VLAN10'),
        (1, '2021-05-10', 'VLAN20'),
        (1, '2022-03-15', 'VLAN30'),
        (2, '2024-01-01', 'VLAN10')
    `);

    await connection.query(`
      CREATE TABLE devices (
        device_id INT PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        IPv4_address VARCHAR(24) NOT NULL,
        IPv6_address VARCHAR(126) NOT NULL,
        MAC_address VARCHAR(64) NOT NULL,
        subnet_mask VARCHAR(24) NOT NULL,
        OS VARCHAR(30) NOT NULL,
        OS_version VARCHAR(30) NOT NULL,
        installation_date DATE NOT NULL,
        manufacturer VARCHAR(30) NOT NULL,
        location_id INT,

        UNIQUE (account_id, device_id),

        FOREIGN KEY (account_id)
          REFERENCES accounts(id) ON DELETE CASCADE,

        FOREIGN KEY (account_id, location_id)
          REFERENCES locations(account_id, location_id)
      )
    `);

    await connection.query(`
      INSERT INTO devices (
        account_id, IPv4_address, IPv6_address,
        MAC_address, subnet_mask, OS, OS_version,
        installation_date, manufacturer, location_id
      )
      VALUES
        (1, '192.168.1.10', 'fe80::1',
         'AA:BB:CC:DD:EE:01', '255.255.255.0',
         'Windows', '11', '2023-01-01', 'Dell', 1),

        (1, '192.168.1.11', 'fe80::2',
         'AA:BB:CC:DD:EE:02', '255.255.255.0',
         'Linux', 'Ubuntu 22', '2023-02-01', 'HP', 2),

        (1, '192.168.1.12', 'fe80::3',
         'AA:BB:CC:DD:EE:03', '255.255.255.0',
         'Cisco IOS', '15.0', '2023-03-01', 'Cisco', 3),

        (2, '10.0.0.10', 'fe80::10',
         'AA:BB:CC:DD:EE:10', '255.255.255.0',
         'Linux', 'Ubuntu 24', '2024-01-01', 'Dell', 4)
    `);

    await connection.query(`
      CREATE TABLE deviceVlan (
        account_id INT NOT NULL,
        device_id INT NOT NULL,
        vlan_id INT NOT NULL,
        assignment_date DATE,

        PRIMARY KEY (device_id, vlan_id),

        FOREIGN KEY (account_id, device_id)
          REFERENCES devices(account_id, device_id)
          ON DELETE CASCADE,

        FOREIGN KEY (account_id, vlan_id)
          REFERENCES vlan(account_id, vlan_id)
          ON DELETE CASCADE
      )
    `);

    await connection.query(`
      INSERT INTO deviceVlan
        (account_id, device_id, vlan_id, assignment_date)
      VALUES
        (1, 1, 1, '2024-01-10'),
        (1, 1, 2, '2024-01-10'),
        (1, 2, 2, '2024-02-15'),
        (1, 3, 3, '2024-03-01'),
        (2, 4, 4, '2024-01-10')
    `);

    await connection.query(`
      CREATE TABLE maintenance (
        event_id INT PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        device_id INT NOT NULL,
        event_date DATE,
        description VARCHAR(255),
        performed_by INT NOT NULL,
        scheduled TINYINT(1) NOT NULL DEFAULT 0,

        FOREIGN KEY (account_id, device_id)
          REFERENCES devices(account_id, device_id)
          ON DELETE CASCADE,

        FOREIGN KEY (account_id, performed_by)
          REFERENCES account_users(account_id, user_id)
      )
    `);

    await connection.query(`
      INSERT INTO maintenance
        (account_id, device_id, event_date, description,
         performed_by, scheduled)
      VALUES
        (1, 1, '2023-01-10', 'OS update', 3, 0),
        (1, 3, '2023-02-20', 'Firmware upgrade', 2, 0),
        (1, 2, '2023-05-01', 'Security patch', 3, 1),
        (2, 4, '2024-02-01', 'Initial configuration', 5, 0)
    `);

    await connection.query(`
      CREATE TABLE domains (
        domain_id INT PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        domain_name VARCHAR(253) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        UNIQUE (account_id, domain_name),

        FOREIGN KEY (account_id)
          REFERENCES accounts(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      INSERT INTO domains (account_id, domain_name)
      VALUES
        (1, 'customer-a.example.test'),
        (2, 'customer-b.example.test')
    `);

    console.log("Database seeded successfully.");
    console.log("Development login password: DevPassword123!");
  } catch (error) {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  } finally {
    connection?.release();
    await adminDb.end();
  }
}

await seed();