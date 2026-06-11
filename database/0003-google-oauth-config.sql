CREATE TABLE IF NOT EXISTS `google_oauth_configs` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `client_id` TEXT,
  `client_secret` TEXT,
  `status` TEXT NOT NULL DEFAULT 'active',
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
