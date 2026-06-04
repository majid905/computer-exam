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

  // Check if columns already exist (works on all MySQL/MariaDB versions)
  const [columns] = await connection.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'mock_tests' AND COLUMN_NAME IN ('total_questions', 'question_selection_mode')`,
    [MYSQL_DATABASE]
  );
  const existingCols = new Set(columns.map((c) => c.COLUMN_NAME));

  if (!existingCols.has("total_questions")) {
    console.log("Adding total_questions column...");
    await connection.query(
      `ALTER TABLE mock_tests ADD COLUMN total_questions INT NOT NULL DEFAULT 20`
    );
    console.log("total_questions added.");
  } else {
    console.log("total_questions already exists.");
  }

  if (!existingCols.has("question_selection_mode")) {
    console.log("Adding question_selection_mode column...");
    await connection.query(
      `ALTER TABLE mock_tests ADD COLUMN question_selection_mode ENUM('random','manual') NOT NULL DEFAULT 'manual'`
    );
    console.log("question_selection_mode added.");
  } else {
    console.log("question_selection_mode already exists.");
  }

  console.log("Creating mock_test_questions table...");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS mock_test_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mock_test_id INT NOT NULL,
      question_id INT NOT NULL,
      mark INT NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
      UNIQUE KEY unique_mock_question (mock_test_id, question_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log("mock_test_questions table created (or already exists).");
  await connection.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
