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

  console.log("Creating practice_questions table...");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS practice_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      source_question_id INT DEFAULT NULL,
      chapter_id INT NOT NULL,
      question TEXT NOT NULL,
      question_image VARCHAR(500) DEFAULT NULL,
      question_type ENUM('mcq','true_false') NOT NULL DEFAULT 'mcq',
      correct_answer VARCHAR(255) DEFAULT NULL,
      explanation TEXT DEFAULT NULL,
      difficulty ENUM('easy','medium','hard') NOT NULL DEFAULT 'easy',
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
      FOREIGN KEY (source_question_id) REFERENCES questions(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log("Creating practice_question_options table...");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS practice_question_options (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_id INT NOT NULL,
      option_text TEXT NOT NULL,
      is_correct TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES practice_questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log("Practice tables created.");

  // Migrate existing active questions into practice_questions
  console.log("Migrating existing questions to practice tables...");

  const [questions] = await connection.query(
    `SELECT * FROM questions WHERE status = 'active' ORDER BY id`
  );

  let migratedQuestions = 0;
  let migratedOptions = 0;
  let skipped = 0;

  for (const q of questions) {
    // Skip if already migrated (by source_question_id)
    const [existing] = await connection.query(
      `SELECT id FROM practice_questions WHERE source_question_id = ? LIMIT 1`,
      [q.id]
    );
    if (existing.length > 0) {
      skipped++;
      continue;
    }

    const [result] = await connection.query(
      `INSERT INTO practice_questions
       (source_question_id, chapter_id, question, question_image, question_type, correct_answer, explanation, difficulty, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        q.id,
        q.chapter_id,
        q.question,
        q.question_image ?? null,
        q.question_type ?? "mcq",
        q.correct_answer ?? null,
        q.explanation ?? null,
        q.difficulty ?? "easy",
        q.status ?? "active",
      ]
    );

    const practiceQuestionId = result.insertId;
    migratedQuestions++;

    // Migrate options for this question
    const [options] = await connection.query(
      `SELECT * FROM question_options WHERE question_id = ? ORDER BY id`,
      [q.id]
    );

    for (const opt of options) {
      await connection.query(
        `INSERT INTO practice_question_options
         (question_id, option_text, is_correct)
         VALUES (?, ?, ?)`,
        [practiceQuestionId, opt.option_text, opt.is_correct]
      );
      migratedOptions++;
    }
  }

  console.log(`Migration complete:`);
  console.log(`  - Questions migrated: ${migratedQuestions}`);
  console.log(`  - Options migrated: ${migratedOptions}`);
  console.log(`  - Already existed (skipped): ${skipped}`);

  await connection.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
