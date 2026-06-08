-- Password reset tokens (hashed; single active token per email at a time).
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `email` TEXT NOT NULL,
  `token_hash` TEXT NOT NULL,
  `expires_at` TEXT NOT NULL,
  `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS `idx_password_resets_email` ON `password_resets` (`email`);
CREATE INDEX IF NOT EXISTS `idx_password_resets_token` ON `password_resets` (`token_hash`);
