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

  console.log("=== DB Verification Report ===\n");

  // Check practice_questions table
  try {
    const [pqRows] = await connection.query(
      `SELECT COUNT(*) as count FROM practice_questions`
    );
    console.log("✅ practice_questions table EXISTS");
    console.log("   Rows:", pqRows[0].count);
  } catch (e) {
    console.log("❌ practice_questions table MISSING");
  }

  // Check practice_question_options table
  try {
    const [pqoRows] = await connection.query(
      `SELECT COUNT(*) as count FROM practice_question_options`
    );
    console.log("✅ practice_question_options table EXISTS");
    console.log("   Rows:", pqoRows[0].count);
  } catch (e) {
    console.log("❌ practice_question_options table MISSING");
  }

  // Check mock_tests columns
  const [mockCols] = await connection.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'mock_tests'`,
    [MYSQL_DATABASE]
  );
  const mockColNames = new Set(mockCols.map((c) => c.COLUMN_NAME));
  console.log("\n📋 mock_tests columns:");
  ["id", "title", "description", "time_limit", "total_marks", "pass_marks", "total_questions", "question_selection_mode", "status"].forEach((col) => {
    console.log(`   ${mockColNames.has(col) ? "✅" : "❌"} ${col}`);
  });

  // Check mock_test_questions table
  try {
    const [mtqRows] = await connection.query(
      `SELECT COUNT(*) as count FROM mock_test_questions`
    );
    console.log("\n✅ mock_test_questions table EXISTS");
    console.log("   Rows:", mtqRows[0].count);
  } catch (e) {
    console.log("\n❌ mock_test_questions table MISSING");
  }

  // Check questions table (main)
  try {
    const [qRows] = await connection.query(
      `SELECT COUNT(*) as count FROM questions WHERE status = 'active'`
    );
    console.log("\n📋 Main questions table (active):", qRows[0].count, "rows");
  } catch (e) {
    console.log("\n❌ questions table MISSING");
  }

  await connection.end();
  console.log("\n=== Done ===");
}

main().catch((err) => {
  console.error("Connection failed:", err.message);
  process.exit(1);
});
