const mysql = require("mysql2/promise");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const {
  MYSQL_HOST = "localhost",
  MYSQL_PORT = "3306",
  MYSQL_USER = "root",
  MYSQL_PASSWORD = "",
  MYSQL_DATABASE = "passpilot",
} = process.env;

async function main() {
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });

  console.log("Creating site_contacts table...");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS site_contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) DEFAULT NULL,
      phone VARCHAR(100) DEFAULT NULL,
      address TEXT DEFAULT NULL,
      facebook VARCHAR(500) DEFAULT NULL,
      twitter VARCHAR(500) DEFAULT NULL,
      instagram VARCHAR(500) DEFAULT NULL,
      linkedin VARCHAR(500) DEFAULT NULL,
      youtube VARCHAR(500) DEFAULT NULL,
      whatsapp VARCHAR(100) DEFAULT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Insert default contact row if none exists
  const [existing] = await connection.query(`SELECT id FROM site_contacts WHERE status = 'active' LIMIT 1`);
  if (existing.length === 0) {
    await connection.query(
      `INSERT INTO site_contacts (email, phone, address, status) VALUES (?, ?, ?, ?)`,
      ["support@passpilot.ca", "+1 (800) 123-4567", "Toronto, Ontario, Canada", "active"]
    );
    console.log("Default contact row inserted.");
  }

  console.log("site_contacts table ready.");
  await connection.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
