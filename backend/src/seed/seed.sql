DROP DATABASE IF EXISTS network;
CREATE DATABASE network;
USE network;
-- Login identities
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    platform_role ENUM('superadmin', 'user') NOT NULL DEFAULT 'user'
);
-- Customer organizations
CREATE TABLE accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Users can belong to multiple customer accounts
CREATE TABLE account_users (
    account_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('owner', 'admin', 'viewer') NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (account_id, user_id),
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Sample users; replace placeholder hashes with valid bcrypt hashes
INSERT INTO users (email, password_hash, platform_role)
VALUES (
        'platform-admin@example.test',
        'REPLACE_WITH_BCRYPT_HASH',
        'superadmin'
    ),
    (
        'alice@example.test',
        'REPLACE_WITH_BCRYPT_HASH',
        'user'
    ),
    (
        'bob@example.test',
        'REPLACE_WITH_BCRYPT_HASH',
        'user'
    );
INSERT INTO accounts (name)
VALUES ('Example Customer A'),
    ('Example Customer B');
INSERT INTO account_users (account_id, user_id, role)
VALUES (1, 1, 'admin'),
    (1, 2, 'owner'),
    (1, 3, 'viewer'),
    (2, 1, 'admin');
-- Physical locations belong to a customer account
CREATE TABLE locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT NOT NULL,
    coordinates VARCHAR(50),
    address VARCHAR(100),
    floor VARCHAR(20),
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    UNIQUE (account_id, location_id)
);
INSERT INTO locations (account_id, coordinates, address, floor)
VALUES (1, '59.3293N,18.0686E', 'Serverrum A', '5'),
    (1, '59.3320N,18.0649E', 'Kontor 101', '1'),
    (1, '59.3330N,18.0700E', 'Kontor 202', '2');
-- VLANs belong to a customer account
CREATE TABLE vlan (
    vlan_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT NOT NULL,
    creation_date DATE NOT NULL,
    name VARCHAR(25),
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    UNIQUE (account_id, vlan_id)
);
INSERT INTO vlan (account_id, creation_date, name)
VALUES (1, '2020-01-01', 'VLAN10'),
    (1, '2021-05-10', 'VLAN20'),
    (1, '2022-03-15', 'VLAN30');
-- Devices belong to an account, and can be placed at one of its locations
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
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id, location_id) REFERENCES locations(account_id, location_id),
    UNIQUE (account_id, device_id)
);
INSERT INTO devices (
        account_id,
        IPv4_address,
        IPv6_address,
        MAC_address,
        subnet_mask,
        OS,
        OS_version,
        installation_date,
        manufacturer,
        location_id
    )
VALUES (
        1,
        '192.168.1.10',
        'fe80::1',
        'AA:BB:CC:DD:EE:01',
        '255.255.255.0',
        'Windows',
        '11',
        '2023-01-01',
        'Dell',
        1
    ),
    (
        1,
        '192.168.1.11',
        'fe80::2',
        'AA:BB:CC:DD:EE:02',
        '255.255.255.0',
        'Linux',
        'Ubuntu 22',
        '2023-02-01',
        'HP',
        2
    ),
    (
        1,
        '192.168.1.12',
        'fe80::3',
        'AA:BB:CC:DD:EE:03',
        '255.255.255.0',
        'Cisco IOS',
        '15.0',
        '2023-03-01',
        'Cisco',
        3
    );
-- Devices can be associated with multiple VLANs
CREATE TABLE deviceVlan (
    device_id INT NOT NULL,
    vlan_id INT NOT NULL,
    assignment_date DATE,
    PRIMARY KEY (device_id, vlan_id),
    FOREIGN KEY (device_id) REFERENCES devices(device_id) ON DELETE CASCADE,
    FOREIGN KEY (vlan_id) REFERENCES vlan(vlan_id) ON DELETE CASCADE
);
INSERT INTO deviceVlan (device_id, vlan_id, assignment_date)
VALUES (1, 1, '2024-01-10'),
    (1, 2, '2024-01-10'),
    (2, 2, '2024-02-15'),
    (3, 3, '2024-03-01');
-- Maintenance is performed by a user and belongs to a device
CREATE TABLE maintenance (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,
    event_date DATE,
    description VARCHAR(100),
    performed_by INT NOT NULL,
    scheduled TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (device_id) REFERENCES devices(device_id) ON DELETE CASCADE,
    FOREIGN KEY (performed_by) REFERENCES users(id)
);
INSERT INTO maintenance (
        device_id,
        event_date,
        description,
        performed_by,
        scheduled
    )
VALUES (1, '2023-01-10', 'OS update', 2, 0),
    (3, '2023-02-20', 'Firmware upgrade', 3, 0),
    (2, '2023-05-01', 'Security patch', 2, 1);
-- Domains belong to customer accounts
CREATE TABLE domains (
    domain_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT NOT NULL,
    domain_name VARCHAR(253) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    UNIQUE (account_id, domain_name)
);