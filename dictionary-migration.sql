-- Run this on your MySQL database to create the dictionary_terms table
CREATE TABLE IF NOT EXISTS dictionary_terms (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  title            VARCHAR(255)                        NOT NULL,
  slug             VARCHAR(255)                        NOT NULL UNIQUE,
  short_definition TEXT                                NOT NULL,
  full_description TEXT,
  ai_explanation   TEXT,
  related_terms    TEXT  COMMENT 'JSON array of {title,slug}',
  quiz_question    TEXT,
  quiz_options     TEXT  COMMENT 'JSON array of 4 strings',
  quiz_answer      TINYINT DEFAULT 0,
  seo_title        VARCHAR(255),
  seo_description  VARCHAR(320),
  access_level     ENUM('free','login','pro') DEFAULT 'pro',
  status           ENUM('active','inactive')  DEFAULT 'active',
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
