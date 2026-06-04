PRAGMA foreign_keys=OFF;

DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE `activity_logs` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER,
  `action` TEXT NOT NULL,
  `module` TEXT NOT NULL,
  `description` TEXT,
  `ip_address` TEXT,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `app_settings`;
CREATE TABLE `app_settings` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `site_name` TEXT NOT NULL DEFAULT 'Passpilot',
  `site_tagline` TEXT DEFAULT 'AI-powered exam coach',
  `logo` TEXT,
  `favicon` TEXT,
  `support_email` TEXT,
  `support_phone` TEXT,
  `facebook` TEXT,
  `instagram` TEXT,
  `youtube` TEXT,
  `twitter` TEXT,
  `terms_conditions` TEXT,
  `privacy_policy` TEXT,
  `about_us` TEXT,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL,
  `subtitle` TEXT,
  `image` TEXT,
  `button_text` TEXT,
  `button_link` TEXT,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `blog_categories`;
CREATE TABLE `blog_categories` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `slug` TEXT NOT NULL UNIQUE,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `blog_category_relations`;
CREATE TABLE `blog_category_relations` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `blog_id` INTEGER NOT NULL,
  `blog_category_id` INTEGER NOT NULL,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL,
  `slug` TEXT NOT NULL UNIQUE,
  `image` TEXT,
  `short_description` TEXT,
  `content` TEXT,
  `author_id` INTEGER,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `slug` TEXT NOT NULL UNIQUE,
  `description` TEXT,
  `icon` TEXT,
  `image` TEXT,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `chapters`;
CREATE TABLE `chapters` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `category_id` INTEGER NOT NULL,
  `title` TEXT NOT NULL,
  `slug` TEXT NOT NULL UNIQUE,
  `short_description` TEXT,
  `pdf_link` TEXT,
  `body` TEXT,
  `image` TEXT,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `phone` TEXT,
  `subject` TEXT,
  `message` TEXT NOT NULL,
  `status` TEXT NOT NULL DEFAULT 'new',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `faqs`;
CREATE TABLE `faqs` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `question` TEXT NOT NULL,
  `answer` TEXT NOT NULL,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `languages`;
CREATE TABLE `languages` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `code` TEXT NOT NULL UNIQUE,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `mock_test_questions`;
CREATE TABLE `mock_test_questions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `mock_test_id` INTEGER NOT NULL,
  `question_id` INTEGER NOT NULL,
  `mark` INTEGER NOT NULL DEFAULT 1,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `mock_tests`;
CREATE TABLE `mock_tests` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL,
  `description` TEXT,
  `time_limit` INTEGER NOT NULL DEFAULT 45,
  `total_marks` INTEGER NOT NULL DEFAULT 20,
  `pass_marks` INTEGER NOT NULL DEFAULT 15,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_questions` INTEGER NOT NULL DEFAULT 20,
  `question_selection_mode` TEXT NOT NULL DEFAULT 'manual'
);

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `title` TEXT NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` INTEGER NOT NULL DEFAULT 0,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `subscription_id` INTEGER,
  `amount` REAL NOT NULL DEFAULT 0.00,
  `currency` TEXT NOT NULL DEFAULT 'CAD',
  `payment_method` TEXT,
  `transaction_id` TEXT,
  `gateway_response` TEXT,
  `status` TEXT NOT NULL DEFAULT 'pending',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `practice_question_options`;
CREATE TABLE `practice_question_options` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `question_id` INTEGER NOT NULL,
  `option_text` TEXT NOT NULL,
  `is_correct` INTEGER NOT NULL DEFAULT 0,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `practice_questions`;
CREATE TABLE `practice_questions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `source_question_id` INTEGER,
  `chapter_id` INTEGER NOT NULL,
  `question` TEXT NOT NULL,
  `question_image` TEXT,
  `question_type` TEXT NOT NULL DEFAULT 'mcq',
  `correct_answer` TEXT,
  `explanation` TEXT,
  `difficulty` TEXT NOT NULL DEFAULT 'easy',
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `practice_sessions`;
CREATE TABLE `practice_sessions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `chapter_id` INTEGER,
  `total_questions` INTEGER NOT NULL DEFAULT 0,
  `correct_answers` INTEGER NOT NULL DEFAULT 0,
  `wrong_answers` INTEGER NOT NULL DEFAULT 0,
  `score` REAL NOT NULL DEFAULT 0.00,
  `completed_at` TEXT,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `pricing_features`;
CREATE TABLE `pricing_features` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `pricing_plan_id` INTEGER NOT NULL,
  `feature` TEXT NOT NULL,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `pricing_plans`;
CREATE TABLE `pricing_plans` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL,
  `description` TEXT,
  `regular_price_monthly` REAL NOT NULL DEFAULT 0.00,
  `discount_price_monthly` REAL NOT NULL DEFAULT 0.00,
  `regular_price_yearly` REAL NOT NULL DEFAULT 0.00,
  `discount_price_yearly` REAL NOT NULL DEFAULT 0.00,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `provinces`;
CREATE TABLE `provinces` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `code` TEXT NOT NULL UNIQUE,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `question_options`;
CREATE TABLE `question_options` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `question_id` INTEGER NOT NULL,
  `option_text` TEXT NOT NULL,
  `is_correct` INTEGER NOT NULL DEFAULT 0,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `chapter_id` INTEGER NOT NULL,
  `question` TEXT NOT NULL,
  `question_image` TEXT,
  `question_type` TEXT NOT NULL DEFAULT 'mcq',
  `correct_answer` TEXT,
  `explanation` TEXT,
  `difficulty` TEXT NOT NULL DEFAULT 'easy',
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `theme_style` TEXT NOT NULL DEFAULT 'system',
  `language_id` INTEGER,
  `province_id` INTEGER,
  `test_date` TEXT,
  `result` TEXT,
  `reset_status` INTEGER NOT NULL DEFAULT 0,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `site_contacts`;
CREATE TABLE `site_contacts` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `email` TEXT,
  `phone` TEXT,
  `address` TEXT,
  `facebook` TEXT,
  `twitter` TEXT,
  `instagram` TEXT,
  `linkedin` TEXT,
  `youtube` TEXT,
  `whatsapp` TEXT,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE `subscriptions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `pricing_plan_id` INTEGER NOT NULL,
  `start_date` TEXT,
  `end_date` TEXT,
  `payment_status` TEXT NOT NULL DEFAULT 'pending',
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `test_attempt_answers`;
CREATE TABLE `test_attempt_answers` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `attempt_id` INTEGER NOT NULL,
  `question_id` INTEGER NOT NULL,
  `selected_option` INTEGER,
  `is_correct` INTEGER NOT NULL DEFAULT 0,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `test_attempts`;
CREATE TABLE `test_attempts` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `mock_test_id` INTEGER NOT NULL,
  `score` INTEGER NOT NULL DEFAULT 0,
  `total_marks` INTEGER NOT NULL DEFAULT 0,
  `correct_answers` INTEGER NOT NULL DEFAULT 0,
  `wrong_answers` INTEGER NOT NULL DEFAULT 0,
  `time_taken` INTEGER NOT NULL DEFAULT 0,
  `result` TEXT,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `designation` TEXT,
  `photo` TEXT,
  `review` TEXT NOT NULL,
  `rating` REAL NOT NULL DEFAULT 5.0,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `user_progress`;
CREATE TABLE `user_progress` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `chapter_id` INTEGER NOT NULL,
  `completed_questions` INTEGER NOT NULL DEFAULT 0,
  `total_questions` INTEGER NOT NULL DEFAULT 0,
  `percentage` REAL NOT NULL DEFAULT 0.00,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `full_name` TEXT,
  `user_name` TEXT UNIQUE,
  `email` TEXT NOT NULL UNIQUE,
  `phone` TEXT,
  `profile_pic` TEXT,
  `password` TEXT,
  `role` TEXT NOT NULL DEFAULT 'user',
  `email_verified_at` TEXT,
  `phone_verified_at` TEXT,
  `status` TEXT NOT NULL DEFAULT 'active',
  `last_login_at` TEXT,
  `remember_token` TEXT,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

