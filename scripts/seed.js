const mysql = require("mysql2/promise");
const fs = require("fs");
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

const dataDir = path.resolve(__dirname, "../src/data");

async function loadJson(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

async function main() {
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
  );
  await connection.changeUser({ database: MYSQL_DATABASE });

  console.log("Dropping old tables...");
  await connection.query(`
    SET FOREIGN_KEY_CHECKS = 0;
    DROP TABLE IF EXISTS attempts;
    DROP TABLE IF EXISTS payments;
    DROP TABLE IF EXISTS summaries;
    DROP TABLE IF EXISTS questions;
    DROP TABLE IF EXISTS chapters;
    DROP TABLE IF EXISTS topics;
    DROP TABLE IF EXISTS plans;
    DROP TABLE IF EXISTS faqs;
    DROP TABLE IF EXISTS languages;
    DROP TABLE IF EXISTS provinces;
    DROP TABLE IF EXISTS users;
    SET FOREIGN_KEY_CHECKS = 1;
  `);

  console.log("Creating new tables (28 total)...");
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) DEFAULT NULL,
      user_name VARCHAR(255) UNIQUE DEFAULT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(50) DEFAULT NULL,
      profile_pic VARCHAR(500) DEFAULT NULL,
      password VARCHAR(255) DEFAULT NULL,
      role ENUM('admin','user','customer') NOT NULL DEFAULT 'user',
      email_verified_at DATETIME DEFAULT NULL,
      phone_verified_at DATETIME DEFAULT NULL,
      status ENUM('active','inactive','banned') NOT NULL DEFAULT 'active',
      last_login_at DATETIME DEFAULT NULL,
      remember_token VARCHAR(255) DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS languages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(16) NOT NULL UNIQUE,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS provinces (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(16) NOT NULL UNIQUE,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT DEFAULT NULL,
      icon VARCHAR(255) DEFAULT NULL,
      image VARCHAR(500) DEFAULT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS chapters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      short_description TEXT DEFAULT NULL,
      pdf_link VARCHAR(500) DEFAULT NULL,
      body LONGTEXT DEFAULT NULL,
      image VARCHAR(500) DEFAULT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
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
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS question_options (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_id INT NOT NULL,
      option_text TEXT NOT NULL,
      is_correct TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

    CREATE TABLE IF NOT EXISTS practice_question_options (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_id INT NOT NULL,
      option_text TEXT NOT NULL,
      is_correct TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES practice_questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      theme_style ENUM('light','dark','system') NOT NULL DEFAULT 'system',
      language_id INT DEFAULT NULL,
      province_id INT DEFAULT NULL,
      test_date DATE DEFAULT NULL,
      result VARCHAR(255) DEFAULT NULL,
      reset_status TINYINT(1) NOT NULL DEFAULT 0,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE SET NULL,
      FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS practice_sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      chapter_id INT DEFAULT NULL,
      total_questions INT NOT NULL DEFAULT 0,
      correct_answers INT NOT NULL DEFAULT 0,
      wrong_answers INT NOT NULL DEFAULT 0,
      score DECIMAL(5,2) NOT NULL DEFAULT 0.00,
      completed_at DATETIME DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS mock_tests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT NULL,
      time_limit INT NOT NULL DEFAULT 45,
      total_marks INT NOT NULL DEFAULT 20,
      pass_marks INT NOT NULL DEFAULT 15,
      total_questions INT NOT NULL DEFAULT 20,
      question_selection_mode ENUM('random','manual') NOT NULL DEFAULT 'manual',
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS mock_test_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mock_test_id INT NOT NULL,
      question_id INT NOT NULL,
      mark INT NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS test_attempts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      mock_test_id INT NOT NULL,
      score INT NOT NULL DEFAULT 0,
      total_marks INT NOT NULL DEFAULT 0,
      correct_answers INT NOT NULL DEFAULT 0,
      wrong_answers INT NOT NULL DEFAULT 0,
      time_taken INT NOT NULL DEFAULT 0,
      result ENUM('pass','fail') DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS test_attempt_answers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      attempt_id INT NOT NULL,
      question_id INT NOT NULL,
      selected_option INT DEFAULT NULL,
      is_correct TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (attempt_id) REFERENCES test_attempts(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS user_progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      chapter_id INT NOT NULL,
      completed_questions INT NOT NULL DEFAULT 0,
      total_questions INT NOT NULL DEFAULT 0,
      percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_chapter (user_id, chapter_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS pricing_plans (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT NULL,
      regular_price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      discount_price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      regular_price_yearly DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      discount_price_yearly DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS pricing_features (
      id INT AUTO_INCREMENT PRIMARY KEY,
      pricing_plan_id INT NOT NULL,
      feature TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (pricing_plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS subscriptions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      pricing_plan_id INT NOT NULL,
      start_date DATE DEFAULT NULL,
      end_date DATE DEFAULT NULL,
      payment_status ENUM('pending','paid','failed','cancelled') NOT NULL DEFAULT 'pending',
      status ENUM('active','inactive','expired','cancelled') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (pricing_plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      subscription_id INT DEFAULT NULL,
      amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      currency VARCHAR(10) NOT NULL DEFAULT 'CAD',
      payment_method VARCHAR(255) DEFAULT NULL,
      transaction_id VARCHAR(255) DEFAULT NULL,
      gateway_response TEXT DEFAULT NULL,
      status ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS faqs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS app_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      site_name VARCHAR(255) NOT NULL DEFAULT 'Passpilot',
      site_tagline VARCHAR(255) DEFAULT 'AI-powered exam coach',
      logo VARCHAR(500) DEFAULT NULL,
      favicon VARCHAR(500) DEFAULT NULL,
      support_email VARCHAR(255) DEFAULT NULL,
      support_phone VARCHAR(50) DEFAULT NULL,
      facebook VARCHAR(500) DEFAULT NULL,
      instagram VARCHAR(500) DEFAULT NULL,
      youtube VARCHAR(500) DEFAULT NULL,
      twitter VARCHAR(500) DEFAULT NULL,
      terms_conditions TEXT DEFAULT NULL,
      privacy_policy TEXT DEFAULT NULL,
      about_us TEXT DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS banners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(255) DEFAULT NULL,
      image VARCHAR(500) DEFAULT NULL,
      button_text VARCHAR(255) DEFAULT NULL,
      button_link VARCHAR(500) DEFAULT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      designation VARCHAR(255) DEFAULT NULL,
      photo VARCHAR(500) DEFAULT NULL,
      review TEXT NOT NULL,
      rating DECIMAL(2,1) NOT NULL DEFAULT 5.0,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) DEFAULT NULL,
      subject VARCHAR(255) DEFAULT NULL,
      message TEXT NOT NULL,
      status ENUM('new','read','replied') NOT NULL DEFAULT 'new',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS blog_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      image VARCHAR(500) DEFAULT NULL,
      short_description TEXT DEFAULT NULL,
      content LONGTEXT DEFAULT NULL,
      author_id INT DEFAULT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS blog_category_relations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      blog_id INT NOT NULL,
      blog_category_id INT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
      FOREIGN KEY (blog_category_id) REFERENCES blog_categories(id) ON DELETE CASCADE,
      UNIQUE KEY unique_blog_category (blog_id, blog_category_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS activity_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT DEFAULT NULL,
      action VARCHAR(255) NOT NULL,
      module VARCHAR(255) NOT NULL,
      description TEXT DEFAULT NULL,
      ip_address VARCHAR(100) DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log("Seeding static data...");

  // Languages
  await connection.query(`
    INSERT INTO languages (name, code, status) VALUES
      ('English', 'en', 'active'),
      ('French', 'fr', 'active'),
      ('Punjabi', 'pa', 'active'),
      ('Tagalog', 'tl', 'active'),
      ('Chinese', 'zh', 'active'),
      ('Hindi', 'hi', 'active'),
      ('Arabic', 'ar', 'active'),
      ('Spanish', 'es', 'active')
    ON DUPLICATE KEY UPDATE name = VALUES(name), status = VALUES(status);
  `);

  // Provinces
  await connection.query(`
    INSERT INTO provinces (name, code, status) VALUES
      ('Alberta', 'AB', 'active'),
      ('British Columbia', 'BC', 'active'),
      ('Manitoba', 'MB', 'active'),
      ('New Brunswick', 'NB', 'active'),
      ('Newfoundland and Labrador', 'NL', 'active'),
      ('Nova Scotia', 'NS', 'active'),
      ('Northwest Territories', 'NT', 'active'),
      ('Nunavut', 'NU', 'active'),
      ('Ontario', 'ON', 'active'),
      ('Prince Edward Island', 'PE', 'active'),
      ('Quebec', 'QC', 'active'),
      ('Saskatchewan', 'SK', 'active'),
      ('Yukon', 'YT', 'active')
    ON DUPLICATE KEY UPDATE name = VALUES(name), status = VALUES(status);
  `);

  // Users
  await connection.query(`
    INSERT INTO users (full_name, user_name, email, role, status, password)
    VALUES
      ('Passpilot Admin', 'admin', 'admin@passpilot.ca', 'admin', 'active', 'password'),
      ('Primary User', 'user', 'user@passpilot.ca', 'user', 'active', 'password'),
      ('Client Example', 'client', 'client@passpilot.ca', 'customer', 'active', 'password')
    ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), role = VALUES(role), status = VALUES(status);
  `);

  // Categories
  const [catResult] = await connection.query(`
    INSERT INTO categories (name, slug, description, status)
    VALUES ('Discover Canada', 'discover-canada', 'Official study guide for the Canadian citizenship test', 'active')
    ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description), status = VALUES(status);
  `);
  const [categoryRows] = await connection.query(`SELECT id FROM categories WHERE slug = 'discover-canada' LIMIT 1`);
  const categoryId = categoryRows[0].id;

  // Load JSON data
  const chapters = await loadJson("chapters.json");
  const questions = await loadJson("questions.json");
  const summaries = await loadJson("summaries.json");

  console.log("Migrating chapters...");
  const chapterSlugToId = {};
  for (const chapter of chapters) {
    const body = summaries[chapter.slug]
      ? JSON.stringify(summaries[chapter.slug])
      : null;

    const [result] = await connection.query(
      `INSERT INTO chapters (category_id, title, slug, short_description, pdf_link, body, image, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         category_id = VALUES(category_id),
         title = VALUES(title),
         short_description = VALUES(short_description),
         pdf_link = VALUES(pdf_link),
         body = VALUES(body),
         image = VALUES(image),
         status = VALUES(status)`,
      [
        categoryId,
        chapter.title,
        chapter.slug,
        `Pages ${chapter.pageStart}-${chapter.pageEnd}`,
        null,
        body,
        null,
        "active",
      ],
    );
    const [[row]] = await connection.query(`SELECT id FROM chapters WHERE slug = ?`, [chapter.slug]);
    chapterSlugToId[chapter.slug] = row.id;
  }

  console.log("Migrating questions and options...");
  for (const q of questions) {
    const chapterId = chapterSlugToId[q.chapter];
    if (!chapterId) {
      console.warn(`Skipping question ${q.id} - chapter ${q.chapter} not found`);
      continue;
    }

    const difficultyMap = { 1: "easy", 2: "medium", 3: "hard" };
    const difficulty = difficultyMap[q.difficulty] || "easy";

    // Insert question
    const [qResult] = await connection.query(
      `INSERT INTO questions (chapter_id, question, question_image, question_type, correct_answer, explanation, difficulty, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        chapterId,
        q.question,
        null,
        "mcq",
        q.answer.toString(),
        q.explanation,
        difficulty,
        "active",
      ],
    );
    const questionId = qResult.insertId;

    // Insert options
    for (let i = 0; i < q.options.length; i++) {
      await connection.query(
        `INSERT INTO question_options (question_id, option_text, is_correct)
         VALUES (?, ?, ?)`,
        [questionId, q.options[i], i === q.answer ? 1 : 0],
      );
    }
  }

  console.log("Migrating pricing plans...");
  await connection.query(`
    INSERT INTO pricing_plans (title, description, regular_price_monthly, discount_price_monthly, regular_price_yearly, discount_price_yearly, status)
    VALUES
      ('Starter', 'Free plan to begin your Passpilot study journey with chapters, practice, and mock exams.', 0.00, 0.00, 0.00, 0.00, 'active'),
      ('Pro', 'Unlimited practice, mock exams, and priority support for serious Canadian citizenship preparation.', 14.99, 14.99, 149.99, 149.99, 'active')
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      description = VALUES(description),
      regular_price_monthly = VALUES(regular_price_monthly),
      discount_price_monthly = VALUES(discount_price_monthly),
      regular_price_yearly = VALUES(regular_price_yearly),
      discount_price_yearly = VALUES(discount_price_yearly),
      status = VALUES(status);
  `);

  const [starterPlan] = await connection.query(`SELECT id FROM pricing_plans WHERE title = 'Starter' LIMIT 1`);
  const [proPlan] = await connection.query(`SELECT id FROM pricing_plans WHERE title = 'Pro' LIMIT 1`);

  await connection.query(`
    INSERT INTO pricing_features (pricing_plan_id, feature) VALUES
      (?, '20 study chapters access'),
      (?, '5 practice sessions each day'),
      (?, 'Progress tracking'),
      (?, 'Unlimited mock exams'),
      (?, 'Detailed chapter analytics'),
      (?, 'Priority email support')
    ON DUPLICATE KEY UPDATE feature = VALUES(feature);
  `, [starterPlan[0].id, starterPlan[0].id, starterPlan[0].id, proPlan[0].id, proPlan[0].id, proPlan[0].id]);

  console.log("Migrating FAQs...");
  await connection.query(`
    INSERT INTO faqs (question, answer, status) VALUES
      ('How do I use Passpilot?', 'Start with onboarding, choose your province and language, then study chapters, practice questions, and take the mock exam.', 'active'),
      ('Can I change my theme?', 'Yes. Open Settings and switch between light, dark, or system theme mode.', 'active'),
      ('Is my progress stored?', 'Your progress is saved to the MySQL database when you connect through the backend API.', 'active')
    ON DUPLICATE KEY UPDATE question = VALUES(question), answer = VALUES(answer), status = VALUES(status);
  `);

  console.log("Seeding app settings...");
  await connection.query(`
    INSERT INTO app_settings (site_name, site_tagline, support_email, support_phone, facebook, instagram, youtube, twitter)
    VALUES ('Passpilot', 'AI-powered exam coach', 'support@passpilot.ca', '+1-800-123-4567', 'https://facebook.com/passpilot', 'https://instagram.com/passpilot', 'https://youtube.com/passpilot', 'https://twitter.com/passpilot')
    ON DUPLICATE KEY UPDATE
      site_name = VALUES(site_name),
      site_tagline = VALUES(site_tagline),
      support_email = VALUES(support_email),
      support_phone = VALUES(support_phone);
  `);

  console.log("Seeding banners...");
  await connection.query(`
    INSERT INTO banners (title, subtitle, image, button_text, button_link, status) VALUES
      ('Pass Your Canadian Citizenship Test', 'Study smarter with AI-powered practice questions and mock exams.', NULL, 'Get Started', '/onboarding', 'active'),
      ('Discover Canada Guide', 'All chapters, questions, and progress tracking in one place.', NULL, 'Explore Chapters', '/chapters', 'active')
    ON DUPLICATE KEY UPDATE title = VALUES(title), subtitle = VALUES(subtitle), status = VALUES(status);
  `);

  console.log("Seeding testimonials...");
  await connection.query(`
    INSERT INTO testimonials (name, designation, photo, review, rating, status) VALUES
      ('Sarah M.', 'New Canadian Citizen', NULL, 'Passpilot helped me pass my citizenship test on the first try. The practice questions are exactly like the real exam!', 5.0, 'active'),
      ('Ahmed K.', 'Permanent Resident', NULL, 'Great app! I loved the progress tracking and mock exams. Highly recommended for anyone preparing for the test.', 5.0, 'active'),
      ('Maria G.', 'Immigrant from Philippines', NULL, 'The chapter summaries and practice questions made studying so much easier. Thank you Passpilot!', 4.5, 'active')
    ON DUPLICATE KEY UPDATE name = VALUES(name), review = VALUES(review), rating = VALUES(rating);
  `);

  console.log("Seeding blog categories...");
  await connection.query(`
    INSERT INTO blog_categories (name, slug, status) VALUES
      ('Citizenship Tips', 'citizenship-tips', 'active'),
      ('Study Guides', 'study-guides', 'active'),
      ('Success Stories', 'success-stories', 'active')
    ON DUPLICATE KEY UPDATE name = VALUES(name), status = VALUES(status);
  `);

  console.log("Seeding blogs...");
  await connection.query(`
    INSERT INTO blogs (title, slug, short_description, content, author_id, status) VALUES
      ('Top 10 Tips to Pass Your Citizenship Test', 'top-10-tips', 'Essential strategies for acing the Canadian citizenship exam.', 'Detailed content about tips...', 1, 'active'),
      ('How to Study Discover Canada Effectively', 'study-discover-canada', 'A comprehensive guide to studying the official guide.', 'Detailed content about studying...', 1, 'active'),
      ('Success Story: From PR to Citizen in 3 Years', 'success-story-pr-to-citizen', 'Real story of a successful citizenship journey.', 'Detailed content about the journey...', 1, 'active')
    ON DUPLICATE KEY UPDATE title = VALUES(title), short_description = VALUES(short_description), status = VALUES(status);
  `);

  // Link blogs to categories
  const [blogRows] = await connection.query(`SELECT id, slug FROM blogs`);
  const [catRows] = await connection.query(`SELECT id, slug FROM blog_categories`);
  const blogMap = Object.fromEntries(blogRows.map(b => [b.slug, b.id]));
  const catMap = Object.fromEntries(catRows.map(c => [c.slug, c.id]));

  await connection.query(`
    INSERT INTO blog_category_relations (blog_id, blog_category_id) VALUES
      (?, ?),
      (?, ?),
      (?, ?)
    ON DUPLICATE KEY UPDATE blog_id = VALUES(blog_id), blog_category_id = VALUES(blog_category_id);
  `, [
    blogMap['top-10-tips'], catMap['citizenship-tips'],
    blogMap['study-discover-canada'], catMap['study-guides'],
    blogMap['success-story-pr-to-citizen'], catMap['success-stories'],
  ]);

  console.log("Creating mock tests...");
  const [mockTestResult] = await connection.query(`
    INSERT INTO mock_tests (title, description, time_limit, total_marks, pass_marks, status)
    VALUES ('Canadian Citizenship Mock Exam', 'A full simulation of the official IRCC online citizenship test with 20 balanced questions.', 45, 20, 15, 'active')
    ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), status = VALUES(status);
  `);

  const [mockTestRows] = await connection.query(`SELECT id FROM mock_tests WHERE title = 'Canadian Citizenship Mock Exam' LIMIT 1`);
  const mockTestId = mockTestRows[0].id;

  // Add 20 random questions to mock test
  const [allQuestions] = await connection.query(`SELECT id FROM questions ORDER BY RAND() LIMIT 20`);
  for (const q of allQuestions) {
    await connection.query(
      `INSERT IGNORE INTO mock_test_questions (mock_test_id, question_id, mark) VALUES (?, ?, ?)`,
      [mockTestId, q.id, 1]
    );
  }

  console.log("Seeding activity log...");
  await connection.query(`
    INSERT INTO activity_logs (user_id, action, module, description, ip_address)
    VALUES (1, 'database_seed', 'system', 'Initial database seed completed with all 28 tables', '127.0.0.1');
  `);

  console.log(`Database seed complete! All 28 tables created in ${MYSQL_DATABASE}.`);
  console.log(`Tables: users, settings, languages, provinces, categories, chapters, questions, question_options, practice_sessions, mock_tests, mock_test_questions, test_attempts, test_attempt_answers, user_progress, pricing_plans, pricing_features, subscriptions, payments, faqs, notifications, app_settings, banners, testimonials, contact_messages, blogs, blog_categories, blog_category_relations, activity_logs`);

  await connection.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
