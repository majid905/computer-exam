import { query, execute } from "./db";

// ===================== TYPES =====================

export type User = {
  id: number;
  full_name: string | null;
  user_name: string | null;
  email: string;
  phone: string | null;
  profile_pic: string | null;
  password: string | null;
  role: string;
  status: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Setting = {
  id: number;
  user_id: number;
  theme_style: string;
  language_id: number | null;
  province_id: number | null;
  test_date: string | null;
  result: string | null;
  reset_status: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Language = {
  id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Province = {
  id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Chapter = {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  short_description: string | null;
  pdf_link: string | null;
  body: string | null;
  image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Question = {
  id: number;
  chapter_id: number;
  question: string;
  question_image: string | null;
  question_type: string;
  correct_answer: string | null;
  explanation: string | null;
  difficulty: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type QuestionOption = {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: number;
  created_at: string;
  updated_at: string;
};

export type PracticeSession = {
  id: number;
  user_id: number;
  chapter_id: number | null;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  score: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type MockTest = {
  id: number;
  title: string;
  description: string | null;
  time_limit: number;
  total_marks: number;
  pass_marks: number;
  total_questions: number;
  question_selection_mode: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MockTestQuestion = {
  id: number;
  mock_test_id: number;
  question_id: number;
  mark: number;
  created_at: string;
  updated_at: string;
};

export type TestAttempt = {
  id: number;
  user_id: number;
  mock_test_id: number;
  score: number;
  total_marks: number;
  correct_answers: number;
  wrong_answers: number;
  time_taken: number;
  result: string | null;
  created_at: string;
  updated_at: string;
};

export type TestAttemptAnswer = {
  id: number;
  attempt_id: number;
  question_id: number;
  selected_option: number | null;
  is_correct: number;
  created_at: string;
  updated_at: string;
};

export type UserProgress = {
  id: number;
  user_id: number;
  chapter_id: number;
  completed_questions: number;
  total_questions: number;
  percentage: number;
  created_at: string;
  updated_at: string;
};

export type PricingPlan = {
  id: number;
  title: string;
  description: string | null;
  regular_price_monthly: number;
  discount_price_monthly: number;
  regular_price_yearly: number;
  discount_price_yearly: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type PricingFeature = {
  id: number;
  pricing_plan_id: number;
  feature: string;
  created_at: string;
  updated_at: string;
};

export type Subscription = {
  id: number;
  user_id: number;
  pricing_plan_id: number;
  start_date: string | null;
  end_date: string | null;
  payment_status: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Payment = {
  id: number;
  user_id: number;
  subscription_id: number | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  transaction_id: string | null;
  gateway_response: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type StripeConfig = {
  id: number;
  publishable_key: string | null;
  secret_key: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: number;
  created_at: string;
  updated_at: string;
};

export type AppSetting = {
  id: number;
  site_name: string;
  site_tagline: string | null;
  logo: string | null;
  favicon: string | null;
  support_email: string | null;
  support_phone: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  twitter: string | null;
  terms_conditions: string | null;
  privacy_policy: string | null;
  about_us: string | null;
  created_at: string;
  updated_at: string;
};

export type Banner = {
  id: number;
  title: string;
  subtitle: string | null;
  image: string | null;
  button_text: string | null;
  button_link: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: number;
  name: string;
  designation: string | null;
  photo: string | null;
  review: string;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  reply: string | null;
  replied_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type SiteContact = {
  id: number;
  email: string | null;
  phone: string | null;
  address: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
  whatsapp: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Blog = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  short_description: string | null;
  content: string | null;
  author_id: number | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type BlogCategoryRelation = {
  id: number;
  blog_id: number;
  blog_category_id: number;
  created_at: string;
  updated_at: string;
};

export type ActivityLog = {
  id: number;
  user_id: number | null;
  action: string;
  module: string;
  description: string | null;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
};

// ===================== USERS =====================

export async function listUsers() {
  return query<User>(`SELECT * FROM users ORDER BY created_at DESC`);
}

export async function getUserById(id: number) {
  const rows = await query<User>(`SELECT * FROM users WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getUserByEmail(email: string) {
  const rows = await query<User>(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email]);
  return rows[0] || null;
}

export async function createUser(data: Partial<User>) {
  const result = await execute(
    `INSERT INTO users (full_name, user_name, email, phone, profile_pic, password, role, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.full_name ?? null, data.user_name ?? null, data.email, data.phone ?? null, data.profile_pic ?? null, data.password, data.role ?? "user", data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateUser(id: number, data: Partial<User>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteUser(id: number) {
  await query(`DELETE FROM users WHERE id = ?`, [id]);
}

// ===================== SETTINGS =====================

export async function getSettingsByUserId(userId: number) {
  const rows = await query<Setting>(`SELECT * FROM settings WHERE user_id = ? LIMIT 1`, [userId]);
  return rows[0] || null;
}

export async function upsertSettings(data: Partial<Setting> & { user_id: number }) {
  const existing = await getSettingsByUserId(data.user_id);
  if (existing) {
    const fields: string[] = [];
    const values: any[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== "id" && key !== "user_id") {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    if (fields.length > 0) {
      values.push(data.user_id);
      await query(`UPDATE settings SET ${fields.join(", ")} WHERE user_id = ?`, values);
    }
    return existing.id;
  }
  const result = await execute(
    `INSERT INTO settings (user_id, theme_style, language_id, province_id, test_date, result, reset_status, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.user_id, data.theme_style ?? "system", data.language_id, data.province_id, data.test_date, data.result, data.reset_status ?? 0, data.status ?? "active"],
  );
  return result.insertId as number;
}

// ===================== LANGUAGES =====================

export async function listLanguages() {
  return query<Language>(`SELECT * FROM languages WHERE status = 'active' ORDER BY name`);
}

export async function listAllLanguages() {
  return query<Language>(`SELECT * FROM languages ORDER BY name`);
}

export async function getLanguageById(id: number) {
  const rows = await query<Language>(`SELECT * FROM languages WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getLanguageByCode(code: string) {
  const rows = await query<Language>(`SELECT * FROM languages WHERE code = ? LIMIT 1`, [code]);
  return rows[0] || null;
}

export async function createLanguage(data: Partial<Language>) {
  const result = await execute(
    `INSERT INTO languages (name, code, status) VALUES (?, ?, ?)`,
    [data.name, data.code, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateLanguage(id: number, data: Partial<Language>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE languages SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteLanguage(id: number) {
  await query(`DELETE FROM languages WHERE id = ?`, [id]);
}

// ===================== PROVINCES =====================

export async function listProvinces() {
  return query<Province>(`SELECT * FROM provinces WHERE status = 'active' ORDER BY name`);
}

export async function listAllProvinces() {
  return query<Province>(`SELECT * FROM provinces ORDER BY name`);
}

export async function getProvinceById(id: number) {
  const rows = await query<Province>(`SELECT * FROM provinces WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getProvinceByCode(code: string) {
  const rows = await query<Province>(`SELECT * FROM provinces WHERE code = ? LIMIT 1`, [code]);
  return rows[0] || null;
}

export async function createProvince(data: Partial<Province>) {
  const result = await execute(
    `INSERT INTO provinces (name, code, status) VALUES (?, ?, ?)`,
    [data.name, data.code, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateProvince(id: number, data: Partial<Province>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE provinces SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteProvince(id: number) {
  await query(`DELETE FROM provinces WHERE id = ?`, [id]);
}

// ===================== CATEGORIES =====================

export async function listCategories() {
  return query<Category>(`SELECT * FROM categories WHERE status = 'active' ORDER BY name`);
}

export async function getCategoryById(id: number) {
  const rows = await query<Category>(`SELECT * FROM categories WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getCategoryBySlug(slug: string) {
  const rows = await query<Category>(`SELECT * FROM categories WHERE slug = ? LIMIT 1`, [slug]);
  return rows[0] || null;
}

export async function createCategory(data: Partial<Category>) {
  const result = await execute(
    `INSERT INTO categories (name, slug, description, icon, image, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.name, data.slug, data.description, data.icon, data.image, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateCategory(id: number, data: Partial<Category>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE categories SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteCategory(id: number) {
  await query(`DELETE FROM categories WHERE id = ?`, [id]);
}

// ===================== CHAPTERS =====================

export async function listChapters() {
  return query<Chapter>(`SELECT * FROM chapters WHERE status = 'active' ORDER BY id`);
}

export async function getChapterById(id: number) {
  const rows = await query<Chapter>(`SELECT * FROM chapters WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getChapterBySlug(slug: string) {
  const rows = await query<Chapter>(`SELECT * FROM chapters WHERE slug = ? LIMIT 1`, [slug]);
  return rows[0] || null;
}

export async function getChaptersByCategoryId(categoryId: number) {
  return query<Chapter>(`SELECT * FROM chapters WHERE category_id = ? AND status = 'active' ORDER BY id`, [categoryId]);
}

export async function createChapter(data: Partial<Chapter>) {
  const result = await execute(
    `INSERT INTO chapters (category_id, title, slug, short_description, pdf_link, body, image, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.category_id ?? null, data.title, data.slug, data.short_description ?? null, data.pdf_link ?? null, data.body ?? null, data.image ?? null, data.status || "active"],
  );
  return result.insertId as number;
}

export async function updateChapter(id: number, data: Partial<Chapter>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE chapters SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteChapter(id: number) {
  await query(`DELETE FROM chapters WHERE id = ?`, [id]);
}

// ===================== QUESTIONS =====================

export async function listQuestions() {
  return query<Question>(`SELECT * FROM questions WHERE status = 'active' ORDER BY id`);
}

export async function getQuestionById(id: number) {
  const rows = await query<Question>(`SELECT * FROM questions WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getQuestionsByChapterId(chapterId: number) {
  return query<Question>(`SELECT * FROM questions WHERE chapter_id = ? AND status = 'active' ORDER BY id`, [chapterId]);
}

export async function createQuestion(data: Partial<Question>) {
  const result = await execute(
    `INSERT INTO questions (chapter_id, question, question_image, question_type, correct_answer, explanation, difficulty, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.chapter_id ?? null, data.question, data.question_image ?? null, data.question_type || "mcq", data.correct_answer ?? null, data.explanation ?? null, data.difficulty || "easy", data.status || "active"],
  );
  return result.insertId as number;
}

export async function updateQuestion(id: number, data: Partial<Question>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE questions SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteQuestion(id: number) {
  await query(`DELETE FROM questions WHERE id = ?`, [id]);
}

// ===================== QUESTION OPTIONS =====================

export async function getOptionsByQuestionId(questionId: number) {
  return query<QuestionOption>(`SELECT * FROM question_options WHERE question_id = ? ORDER BY id`, [questionId]);
}

export async function createQuestionOption(data: Partial<QuestionOption>) {
  const result = await execute(
    `INSERT INTO question_options (question_id, option_text, is_correct) VALUES (?, ?, ?)`,
    [data.question_id, data.option_text, data.is_correct ?? 0],
  );
  return result.insertId as number;
}

export async function updateQuestionOption(id: number, data: Partial<QuestionOption>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE question_options SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteQuestionOption(id: number) {
  await query(`DELETE FROM question_options WHERE id = ?`, [id]);
}

// ===================== PRACTICE SESSIONS =====================

export async function listPracticeSessions() {
  return query<PracticeSession>(`SELECT * FROM practice_sessions ORDER BY created_at DESC`);
}

export async function getPracticeSessionById(id: number) {
  const rows = await query<PracticeSession>(`SELECT * FROM practice_sessions WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getPracticeSessionsByUser(userId: number) {
  return query<PracticeSession>(`SELECT * FROM practice_sessions WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
}

export async function createPracticeSession(data: Partial<PracticeSession>) {
  const result = await execute(
    `INSERT INTO practice_sessions (user_id, chapter_id, total_questions, correct_answers, wrong_answers, score, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.user_id, data.chapter_id, data.total_questions ?? 0, data.correct_answers ?? 0, data.wrong_answers ?? 0, data.score ?? 0, data.completed_at],
  );
  return result.insertId as number;
}

export async function updatePracticeSession(id: number, data: Partial<PracticeSession>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE practice_sessions SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deletePracticeSession(id: number) {
  await query(`DELETE FROM practice_sessions WHERE id = ?`, [id]);
}

// ===================== MOCK TESTS =====================

export async function listMockTests() {
  return query<MockTest>(`SELECT * FROM mock_tests WHERE status = 'active' ORDER BY id`);
}

export async function getMockTestById(id: number) {
  const rows = await query<MockTest>(`SELECT * FROM mock_tests WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createMockTest(data: Partial<MockTest>) {
  try {
    const result = await execute(
      `INSERT INTO mock_tests (title, description, time_limit, total_marks, pass_marks, total_questions, question_selection_mode, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.title, data.description, data.time_limit || 45, data.total_marks || 20, data.pass_marks || 15, data.total_questions || 20, data.question_selection_mode || "manual", data.status || "active"],
    );
    return result.insertId as number;
  } catch (error: any) {
    // Fallback for older schema without total_questions / question_selection_mode
    if (error?.message?.includes("total_questions") || error?.message?.includes("question_selection_mode")) {
      const result = await execute(
        `INSERT INTO mock_tests (title, description, time_limit, total_marks, pass_marks, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [data.title, data.description, data.time_limit || 45, data.total_marks || 20, data.pass_marks || 15, data.status || "active"],
      );
      return result.insertId as number;
    }
    throw error;
  }
}

export async function updateMockTest(id: number, data: Partial<MockTest>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  try {
    await query(`UPDATE mock_tests SET ${fields.join(", ")} WHERE id = ?`, values);
  } catch (error: any) {
    // Fallback: retry without new columns if they don't exist
    if (error?.message?.includes("total_questions") || error?.message?.includes("question_selection_mode")) {
      const safeFields: string[] = [];
      const safeValues: any[] = [];
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && key !== "id" && key !== "total_questions" && key !== "question_selection_mode") {
          safeFields.push(`${key} = ?`);
          safeValues.push(value);
        }
      }
      if (safeFields.length === 0) return;
      safeValues.push(id);
      await query(`UPDATE mock_tests SET ${safeFields.join(", ")} WHERE id = ?`, safeValues);
      return;
    }
    throw error;
  }
}

export async function deleteMockTest(id: number) {
  await query(`DELETE FROM mock_tests WHERE id = ?`, [id]);
}

// ===================== MOCK TEST QUESTIONS =====================

export async function getMockTestQuestions(mockTestId: number) {
  return query<MockTestQuestion>(`SELECT * FROM mock_test_questions WHERE mock_test_id = ? ORDER BY id`, [mockTestId]);
}

export async function addQuestionToMockTest(data: { mock_test_id: number; question_id: number; mark?: number }) {
  const result = await execute(
    `INSERT IGNORE INTO mock_test_questions (mock_test_id, question_id, mark) VALUES (?, ?, ?)`,
    [data.mock_test_id, data.question_id, data.mark ?? 1],
  );
  return result.insertId as number;
}

export async function removeQuestionFromMockTest(id: number) {
  await query(`DELETE FROM mock_test_questions WHERE id = ?`, [id]);
}

// ===================== TEST ATTEMPTS =====================

export async function listTestAttempts() {
  return query<TestAttempt>(`SELECT * FROM test_attempts ORDER BY created_at DESC`);
}

export async function getTestAttemptById(id: number) {
  const rows = await query<TestAttempt>(`SELECT * FROM test_attempts WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getTestAttemptsByUser(userId: number) {
  return query<TestAttempt>(`SELECT * FROM test_attempts WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
}

export async function createTestAttempt(data: Partial<TestAttempt>) {
  const result = await execute(
    `INSERT INTO test_attempts (user_id, mock_test_id, score, total_marks, correct_answers, wrong_answers, time_taken, result)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.user_id, data.mock_test_id, data.score ?? 0, data.total_marks ?? 0, data.correct_answers ?? 0, data.wrong_answers ?? 0, data.time_taken ?? 0, data.result],
  );
  return result.insertId as number;
}

export async function updateTestAttempt(id: number, data: Partial<TestAttempt>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE test_attempts SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteTestAttempt(id: number) {
  await query(`DELETE FROM test_attempts WHERE id = ?`, [id]);
}

// ===================== TEST ATTEMPT ANSWERS =====================

export async function getAnswersByAttempt(attemptId: number) {
  return query<TestAttemptAnswer>(`SELECT * FROM test_attempt_answers WHERE attempt_id = ? ORDER BY id`, [attemptId]);
}

export async function createTestAttemptAnswer(data: Partial<TestAttemptAnswer>) {
  const result = await execute(
    `INSERT INTO test_attempt_answers (attempt_id, question_id, selected_option, is_correct)
     VALUES (?, ?, ?, ?)`,
    [data.attempt_id, data.question_id, data.selected_option, data.is_correct ?? 0],
  );
  return result.insertId as number;
}

export async function updateTestAttemptAnswer(id: number, data: Partial<TestAttemptAnswer>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE test_attempt_answers SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteTestAttemptAnswer(id: number) {
  await query(`DELETE FROM test_attempt_answers WHERE id = ?`, [id]);
}

// ===================== USER PROGRESS =====================

export async function getUserProgress(userId: number) {
  return query<UserProgress>(`SELECT * FROM user_progress WHERE user_id = ? ORDER BY id`, [userId]);
}

export async function getUserProgressByChapter(userId: number, chapterId: number) {
  const rows = await query<UserProgress>(`SELECT * FROM user_progress WHERE user_id = ? AND chapter_id = ? LIMIT 1`, [userId, chapterId]);
  return rows[0] || null;
}

export async function upsertUserProgress(data: { user_id: number; chapter_id: number; completed_questions?: number; total_questions?: number; percentage?: number }) {
  const existing = await getUserProgressByChapter(data.user_id, data.chapter_id);
  if (existing) {
    const fields: string[] = [];
    const values: any[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== "user_id" && key !== "chapter_id") {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    if (fields.length > 0) {
      values.push(data.user_id, data.chapter_id);
      await query(`UPDATE user_progress SET ${fields.join(", ")} WHERE user_id = ? AND chapter_id = ?`, values);
    }
    return existing.id;
  }
  const result = await execute(
    `INSERT INTO user_progress (user_id, chapter_id, completed_questions, total_questions, percentage)
     VALUES (?, ?, ?, ?, ?)`,
    [data.user_id, data.chapter_id, data.completed_questions ?? 0, data.total_questions ?? 0, data.percentage ?? 0],
  );
  return result.insertId as number;
}

export async function deleteUserProgress(id: number) {
  await query(`DELETE FROM user_progress WHERE id = ?`, [id]);
}

// ===================== PRICING PLANS =====================

export async function listPricingPlans() {
  return query<PricingPlan>(`SELECT * FROM pricing_plans WHERE status = 'active' ORDER BY id`);
}

export async function getPricingPlanById(id: number) {
  const rows = await query<PricingPlan>(`SELECT * FROM pricing_plans WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createPricingPlan(data: Partial<PricingPlan>) {
  const result = await execute(
    `INSERT INTO pricing_plans (title, description, regular_price_monthly, discount_price_monthly, regular_price_yearly, discount_price_yearly, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.title, data.description, data.regular_price_monthly ?? 0, data.discount_price_monthly ?? 0, data.regular_price_yearly ?? 0, data.discount_price_yearly ?? 0, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updatePricingPlan(id: number, data: Partial<PricingPlan>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE pricing_plans SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deletePricingPlan(id: number) {
  await query(`DELETE FROM pricing_plans WHERE id = ?`, [id]);
}

// ===================== PRICING FEATURES =====================

export async function getFeaturesByPlanId(planId: number) {
  return query<PricingFeature>(`SELECT * FROM pricing_features WHERE pricing_plan_id = ? ORDER BY id`, [planId]);
}

export async function createPricingFeature(data: Partial<PricingFeature>) {
  const result = await execute(
    `INSERT INTO pricing_features (pricing_plan_id, feature) VALUES (?, ?)`,
    [data.pricing_plan_id, data.feature],
  );
  return result.insertId as number;
}

export async function updatePricingFeature(id: number, data: Partial<PricingFeature>) {
  await query(`UPDATE pricing_features SET feature = ? WHERE id = ?`, [data.feature, id]);
}

export async function deletePricingFeature(id: number) {
  await query(`DELETE FROM pricing_features WHERE id = ?`, [id]);
}

// ===================== SUBSCRIPTIONS =====================

export async function listSubscriptions() {
  return query<Subscription>(`SELECT * FROM subscriptions ORDER BY created_at DESC`);
}

export async function getSubscriptionById(id: number) {
  const rows = await query<Subscription>(`SELECT * FROM subscriptions WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getSubscriptionsByUser(userId: number) {
  return query<Subscription>(`SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
}

export async function createSubscription(data: Partial<Subscription>) {
  const result = await execute(
    `INSERT INTO subscriptions (user_id, pricing_plan_id, start_date, end_date, payment_status, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.user_id, data.pricing_plan_id, data.start_date, data.end_date, data.payment_status ?? "pending", data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateSubscription(id: number, data: Partial<Subscription>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE subscriptions SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteSubscription(id: number) {
  await query(`DELETE FROM subscriptions WHERE id = ?`, [id]);
}

// ===================== PAYMENTS =====================

export async function listPayments() {
  return query<Payment>(`SELECT * FROM payments ORDER BY created_at DESC`);
}

export async function getPaymentById(id: number) {
  const rows = await query<Payment>(`SELECT * FROM payments WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getPaymentsByUser(userId: number) {
  return query<Payment>(`SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
}

export async function createPayment(data: Partial<Payment>) {
  const result = await execute(
    `INSERT INTO payments (user_id, subscription_id, amount, currency, payment_method, transaction_id, gateway_response, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.user_id, data.subscription_id, data.amount ?? 0, data.currency ?? "CAD", data.payment_method, data.transaction_id, data.gateway_response, data.status ?? "pending"],
  );
  return result.insertId as number;
}

export async function updatePayment(id: number, data: Partial<Payment>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE payments SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deletePayment(id: number) {
  await query(`DELETE FROM payments WHERE id = ?`, [id]);
}

// ===================== SUBSCRIPTION STATS =====================

export async function getSubscriptionStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const todayRows = await query<{ total: number }>(
    `SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = 'completed' AND created_at >= ?`,
    [todayStart],
  );
  const monthRows = await query<{ total: number }>(
    `SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = 'completed' AND created_at >= ?`,
    [monthStart],
  );
  const allTimeRows = await query<{ total: number }>(
    `SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = 'completed'`,
  );

  return {
    today: Number(todayRows[0]?.total ?? 0),
    thisMonth: Number(monthRows[0]?.total ?? 0),
    allTime: Number(allTimeRows[0]?.total ?? 0),
  };
}

export async function getSubscribedUsers() {
  return query<
    {
      user_id: number;
      full_name: string | null;
      email: string;
      plan_title: string;
      amount: number;
      payment_status: string;
      subscription_status: string;
      start_date: string;
      end_date: string;
      created_at: string;
    }
  >(
    `SELECT
       u.id as user_id,
       u.full_name,
       u.email,
       p.title as plan_title,
       pm.amount,
       s.payment_status,
       s.status as subscription_status,
       s.start_date,
       s.end_date,
       s.created_at
     FROM subscriptions s
     JOIN users u ON s.user_id = u.id
     JOIN pricing_plans p ON s.pricing_plan_id = p.id
     LEFT JOIN payments pm ON pm.user_id = u.id AND pm.subscription_id = s.id
     WHERE s.payment_status = 'paid'
     ORDER BY s.created_at DESC`,
  );
}

// ===================== STRIPE CONFIG =====================

export async function getStripeConfig() {
  const rows = await query<StripeConfig>(`SELECT * FROM stripe_configs ORDER BY id DESC LIMIT 1`);
  return rows[0] || null;
}

export async function updateStripeConfig(data: Partial<StripeConfig>) {
  const existing = await getStripeConfig();
  if (existing) {
    const fields: string[] = [];
    const values: any[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== "id") {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    if (fields.length === 0) return existing.id;
    values.push(existing.id);
    await query(`UPDATE stripe_configs SET ${fields.join(", ")} WHERE id = ?`, values);
    return existing.id;
  }
  const result = await execute(
    `INSERT INTO stripe_configs (publishable_key, secret_key, status) VALUES (?, ?, ?)`,
    [data.publishable_key ?? null, data.secret_key ?? null, data.status ?? "inactive"],
  );
  return result.insertId as number;
}

// ===================== ACTIVE SUBSCRIPTION =====================

export async function getActiveSubscriptionByUser(userId: number) {
  const now = new Date().toISOString();
  const rows = await query<Subscription & { plan_title: string }>(
    `SELECT s.*, p.title as plan_title FROM subscriptions s
     JOIN pricing_plans p ON s.pricing_plan_id = p.id
     WHERE s.user_id = ? AND s.status = 'active' AND s.end_date > ?
     ORDER BY s.end_date DESC LIMIT 1`,
    [userId, now],
  );
  return rows[0] || null;
}

// ===================== FAQS =====================

export async function listFaqs() {
  return query<Faq>(`SELECT * FROM faqs WHERE status = 'active' ORDER BY id`);
}

export async function getFaqById(id: number) {
  const rows = await query<Faq>(`SELECT * FROM faqs WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createFaq(data: Partial<Faq>) {
  const result = await execute(
    `INSERT INTO faqs (question, answer, status) VALUES (?, ?, ?)`,
    [data.question, data.answer, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateFaq(id: number, data: Partial<Faq>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE faqs SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteFaq(id: number) {
  await query(`DELETE FROM faqs WHERE id = ?`, [id]);
}

// ===================== NOTIFICATIONS =====================

export async function getNotificationsByUser(userId: number) {
  return query<Notification>(`SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
}

export async function getUnreadNotificationsByUser(userId: number) {
  return query<Notification>(`SELECT * FROM notifications WHERE user_id = ? AND is_read = 0 ORDER BY created_at DESC`, [userId]);
}

export async function createNotification(data: Partial<Notification>) {
  const result = await execute(
    `INSERT INTO notifications (user_id, title, message, is_read) VALUES (?, ?, ?, ?)`,
    [data.user_id, data.title, data.message, data.is_read ?? 0],
  );
  return result.insertId as number;
}

export async function markNotificationRead(id: number) {
  await query(`UPDATE notifications SET is_read = 1 WHERE id = ?`, [id]);
}

export async function deleteNotification(id: number) {
  await query(`DELETE FROM notifications WHERE id = ?`, [id]);
}

export async function listAllNotifications() {
  return query<Notification>(`SELECT n.*, u.full_name as user_name, u.email as user_email
    FROM notifications n
    JOIN users u ON n.user_id = u.id
    ORDER BY n.created_at DESC`);
}

export async function getNotificationById(id: number) {
  const rows = await query<Notification>(`SELECT * FROM notifications WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function updateNotification(id: number, data: Partial<Notification>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE notifications SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function countUnreadNotifications(userId: number) {
  const rows = await query<{ count: number }>(`SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0`, [userId]);
  return rows[0]?.count ?? 0;
}

// ===================== APP SETTINGS =====================

export async function getAppSettings() {
  const rows = await query<AppSetting>(`SELECT * FROM app_settings ORDER BY id DESC LIMIT 1`);
  return rows[0] || null;
}

export async function updateAppSettings(data: Partial<AppSetting>) {
  const existing = await getAppSettings();
  if (existing) {
    const fields: string[] = [];
    const values: any[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== "id") {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    if (fields.length === 0) return;
    values.push(existing.id);
    await query(`UPDATE app_settings SET ${fields.join(", ")} WHERE id = ?`, values);
    return existing.id;
  }
  const result = await execute(
    `INSERT INTO app_settings (site_name, site_tagline, logo, favicon, support_email, support_phone, facebook, instagram, youtube, twitter, terms_conditions, privacy_policy, about_us)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.site_name ?? "Passpilot", data.site_tagline, data.logo, data.favicon, data.support_email, data.support_phone, data.facebook, data.instagram, data.youtube, data.twitter, data.terms_conditions, data.privacy_policy, data.about_us],
  );
  return result.insertId as number;
}

// ===================== BANNERS =====================

export async function listBanners() {
  return query<Banner>(`SELECT * FROM banners ORDER BY id`);
}

export async function getActiveBanners() {
  return query<Banner>(`SELECT * FROM banners WHERE status = 'active' ORDER BY id`);
}

export async function getBannerById(id: number) {
  const rows = await query<Banner>(`SELECT * FROM banners WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createBanner(data: Partial<Banner>) {
  const result = await execute(
    `INSERT INTO banners (title, subtitle, image, button_text, button_link, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.title, data.subtitle, data.image, data.button_text, data.button_link, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateBanner(id: number, data: Partial<Banner>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE banners SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteBanner(id: number) {
  await query(`DELETE FROM banners WHERE id = ?`, [id]);
}

// ===================== TESTIMONIALS =====================

export async function listTestimonials() {
  return query<Testimonial>(`SELECT * FROM testimonials ORDER BY id`);
}

export async function getActiveTestimonials() {
  return query<Testimonial>(`SELECT * FROM testimonials WHERE status = 'active' ORDER BY id`);
}

export async function getTestimonialById(id: number) {
  const rows = await query<Testimonial>(`SELECT * FROM testimonials WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createTestimonial(data: Partial<Testimonial>) {
  const result = await execute(
    `INSERT INTO testimonials (name, designation, photo, review, rating, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.name, data.designation, data.photo, data.review, data.rating ?? 5, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE testimonials SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteTestimonial(id: number) {
  await query(`DELETE FROM testimonials WHERE id = ?`, [id]);
}

// ===================== CONTACT MESSAGES =====================

export async function listContactMessages() {
  return query<ContactMessage>(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
}

export async function getContactMessageById(id: number) {
  const rows = await query<ContactMessage>(`SELECT * FROM contact_messages WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createContactMessage(data: Partial<ContactMessage>) {
  const result = await execute(
    `INSERT INTO contact_messages (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.name, data.email, data.phone, data.subject, data.message, data.status ?? "new"],
  );
  return result.insertId as number;
}

export async function replyContactMessage(id: number, reply: string) {
  const now = new Date().toISOString();
  await query(
    `UPDATE contact_messages SET reply = ?, replied_at = ?, status = 'replied', updated_at = ? WHERE id = ?`,
    [reply, now, now, id],
  );
}

export async function updateContactMessage(id: number, data: Partial<ContactMessage>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE contact_messages SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteContactMessage(id: number) {
  await query(`DELETE FROM contact_messages WHERE id = ?`, [id]);
}

// ===================== SITE CONTACTS =====================

export async function listSiteContacts() {
  return query<SiteContact>(`SELECT * FROM site_contacts ORDER BY id`);
}

export async function getSiteContactById(id: number) {
  const rows = await query<SiteContact>(`SELECT * FROM site_contacts WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getActiveSiteContact() {
  const rows = await query<SiteContact>(`SELECT * FROM site_contacts WHERE status = 'active' LIMIT 1`);
  return rows[0] || null;
}

export async function createSiteContact(data: Partial<SiteContact>) {
  const result = await execute(
    `INSERT INTO site_contacts (email, phone, address, facebook, twitter, instagram, linkedin, youtube, whatsapp, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.email ?? null, data.phone ?? null, data.address ?? null, data.facebook ?? null, data.twitter ?? null, data.instagram ?? null, data.linkedin ?? null, data.youtube ?? null, data.whatsapp ?? null, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateSiteContact(id: number, data: Partial<SiteContact>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE site_contacts SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteSiteContact(id: number) {
  await query(`DELETE FROM site_contacts WHERE id = ?`, [id]);
}

// ===================== BLOG CATEGORIES =====================

export async function listBlogCategories() {
  return query<BlogCategory>(`SELECT * FROM blog_categories WHERE status = 'active' ORDER BY name`);
}

export async function getBlogCategoryById(id: number) {
  const rows = await query<BlogCategory>(`SELECT * FROM blog_categories WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getBlogCategoryBySlug(slug: string) {
  const rows = await query<BlogCategory>(`SELECT * FROM blog_categories WHERE slug = ? LIMIT 1`, [slug]);
  return rows[0] || null;
}

export async function createBlogCategory(data: Partial<BlogCategory>) {
  const result = await execute(
    `INSERT INTO blog_categories (name, slug, status) VALUES (?, ?, ?)`,
    [data.name, data.slug, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateBlogCategory(id: number, data: Partial<BlogCategory>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE blog_categories SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteBlogCategory(id: number) {
  await query(`DELETE FROM blog_categories WHERE id = ?`, [id]);
}

// ===================== BLOGS =====================

export async function listBlogs() {
  return query<Blog>(`SELECT * FROM blogs WHERE status = 'active' ORDER BY created_at DESC`);
}

export async function getBlogById(id: number) {
  const rows = await query<Blog>(`SELECT * FROM blogs WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getBlogBySlug(slug: string) {
  const rows = await query<Blog>(`SELECT * FROM blogs WHERE slug = ? LIMIT 1`, [slug]);
  return rows[0] || null;
}

export async function createBlog(data: Partial<Blog>) {
  const result = await execute(
    `INSERT INTO blogs (title, slug, image, short_description, content, author_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.title, data.slug, data.image, data.short_description, data.content, data.author_id, data.status ?? "active"],
  );
  return result.insertId as number;
}

export async function updateBlog(id: number, data: Partial<Blog>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE blogs SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteBlog(id: number) {
  await query(`DELETE FROM blogs WHERE id = ?`, [id]);
}

// ===================== BLOG CATEGORY RELATIONS =====================

export async function getCategoriesByBlogId(blogId: number) {
  return query<BlogCategoryRelation>(`SELECT * FROM blog_category_relations WHERE blog_id = ?`, [blogId]);
}

export async function getBlogsByCategoryId(categoryId: number) {
  return query<Blog & { relation_id: number }>(
    `SELECT b.*, bcr.id as relation_id FROM blogs b
     JOIN blog_category_relations bcr ON b.id = bcr.blog_id
     WHERE bcr.blog_category_id = ? AND b.status = 'active'
     ORDER BY b.created_at DESC`,
    [categoryId],
  );
}

export async function addBlogCategoryRelation(data: { blog_id: number; blog_category_id: number }) {
  const result = await execute(
    `INSERT INTO blog_category_relations (blog_id, blog_category_id) VALUES (?, ?)`,
    [data.blog_id, data.blog_category_id],
  );
  return result.insertId as number;
}

export async function removeBlogCategoryRelation(id: number) {
  await query(`DELETE FROM blog_category_relations WHERE id = ?`, [id]);
}

// ===================== ACTIVITY LOGS =====================

export async function listActivityLogs() {
  return query<ActivityLog>(`SELECT * FROM activity_logs ORDER BY created_at DESC`);
}

export async function getActivityLogById(id: number) {
  const rows = await query<ActivityLog>(`SELECT * FROM activity_logs WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getActivityLogsByUser(userId: number) {
  return query<ActivityLog>(`SELECT * FROM activity_logs WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
}

export async function createActivityLog(data: Partial<ActivityLog>) {
  const result = await execute(
    `INSERT INTO activity_logs (user_id, action, module, description, ip_address) VALUES (?, ?, ?, ?, ?)`,
    [data.user_id, data.action, data.module, data.description, data.ip_address],
  );
  return result.insertId as number;
}

export async function deleteActivityLog(id: number) {
  await query(`DELETE FROM activity_logs WHERE id = ?`, [id]);
}

// ===================== AGGREGATES / HELPERS =====================

export async function getQuestionsWithOptions(chapterId?: number) {
  const sql = chapterId
    ? `SELECT q.* FROM questions q WHERE q.chapter_id = ? AND q.status = 'active' ORDER BY q.id`
    : `SELECT q.* FROM questions q WHERE q.status = 'active' ORDER BY q.id`;
  const questions = await query<Question>(sql, chapterId ? [chapterId] : []);
  const result = [];
  for (const q of questions) {
    const options = await getOptionsByQuestionId(q.id);
    result.push({ ...q, options });
  }
  return result;
}

export async function getMockTestWithQuestions(mockTestId: number) {
  const mockTest = await getMockTestById(mockTestId);
  if (!mockTest) return null;
  const mtqs = await getMockTestQuestions(mockTestId);
  const questions = [];
  for (const mtq of mtqs) {
    const q = await getQuestionById(mtq.question_id);
    if (q) {
      const options = await getOptionsByQuestionId(q.id);
      questions.push({ ...q, options, mark: mtq.mark });
    }
  }
  return { ...mockTest, questions };
}

export async function getPricingPlanWithFeatures(planId: number) {
  const plan = await getPricingPlanById(planId);
  if (!plan) return null;
  const features = await getFeaturesByPlanId(planId);
  return { ...plan, features: features.map((f) => f.feature) };
}

// ===================== LEGACY COMPATIBILITY HELPERS =====================
// These functions preserve the old API surface for existing pages.

export type TopicItem = {
  slug: string;
  label: string;
  path: string;
  visible: number;
  sort_order: number;
};

export async function getTopics() {
  return query<TopicItem>(
    "SELECT slug, label, path, visible, sort_order FROM topics WHERE visible = 1 ORDER BY sort_order",
  );
}

export type ChapterRecord = {
  slug: string;
  title: string;
  page_start: number;
  page_end: number;
  emoji: string | null;
  description: string | null;
};

export async function getChapters(): Promise<ChapterRecord[]> {
  const rows = await query<Chapter>(
    `SELECT id, slug, title, short_description, body FROM chapters WHERE status = 'active' ORDER BY id`,
  );
  return rows.map((r, i) => {
    let bodyObj: any = null;
    try { bodyObj = r.body ? JSON.parse(r.body) : null; } catch { /* ignore */ }
    const pageStart = bodyObj?.pageStart ?? (i + 1) * 8;
    const pageEnd = bodyObj?.pageEnd ?? (i + 1) * 8 + 5;
    return {
      slug: r.slug,
      title: r.title,
      page_start: pageStart,
      page_end: pageEnd,
      emoji: null,
      description: r.short_description,
    };
  });
}

export type FaqRecord = { id: number; question: string; answer: string; category: string };

export async function getFaqs(): Promise<FaqRecord[]> {
  const rows = await listFaqs();
  return rows.map((r) => ({
    id: r.id,
    question: r.question,
    answer: r.answer,
    category: "General",
  }));
}

export type LanguageRecord = { id: number; code: string; name: string };

export async function getLanguages(): Promise<LanguageRecord[]> {
  const rows = await listLanguages();
  return rows.map((r) => ({ id: r.id, code: r.code, name: r.name }));
}

export type ProvinceRecord = { id: number; code: string; name: string };

export async function getProvinces(): Promise<ProvinceRecord[]> {
  const rows = await listProvinces();
  return rows.map((r) => ({ id: r.id, code: r.code, name: r.name }));
}

export type PlanRecord = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price_cents: number;
  currency: string;
  interval: string;
  features: string[];
};

export async function getPricingPlans(): Promise<PlanRecord[]> {
  const plans = await listPricingPlans();
  const result: PlanRecord[] = [];
  for (const plan of plans) {
    const features = await getFeaturesByPlanId(plan.id);
    result.push({
      id: plan.id,
      slug: plan.title.toLowerCase().replace(/\s+/g, "-"),
      title: plan.title,
      description: plan.description ?? "",
      price_cents: Math.round(plan.discount_price_monthly * 100),
      currency: "CAD",
      interval: "monthly",
      features: features.map((f) => f.feature),
    });
  }
  return result;
}

export type UserRecord = {
  id: number;
  name: string;
  email: string;
  role: string;
  language: string | null;
  province: string | null;
  theme: string;
  created_at: string;
};

export async function getAllUsers(): Promise<UserRecord[]> {
  const rows = await query<User & { language_code: string | null; province_code: string | null }>(
    `SELECT u.*, l.code AS language_code, p.code AS province_code
     FROM users u
     LEFT JOIN settings s ON s.user_id = u.id
     LEFT JOIN languages l ON l.id = s.language_id
     LEFT JOIN provinces p ON p.id = s.province_id
     ORDER BY FIELD(u.role, 'admin', 'client', 'user'), u.created_at DESC`,
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.full_name ?? r.user_name ?? r.email,
    email: r.email,
    role: r.role,
    language: r.language_code,
    province: r.province_code,
    theme: "system",
    created_at: r.created_at,
  }));
}

export async function getDashboardPayments() {
  return query(
    `SELECT id, user_id, amount AS amount_cents, currency, status, subscription_id AS plan, payment_method AS payment_provider, created_at
     FROM payments ORDER BY created_at DESC LIMIT 20`,
  );
}


// ===================== PRACTICE QUESTIONS =====================

export type PracticeQuestion = {
  id: number;
  source_question_id: number | null;
  chapter_id: number;
  question: string;
  question_image: string | null;
  question_type: string;
  correct_answer: string | null;
  explanation: string | null;
  difficulty: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type PracticeQuestionOption = {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: number;
  created_at: string;
  updated_at: string;
};

export async function listPracticeQuestions() {
  return query<PracticeQuestion>(`SELECT * FROM practice_questions WHERE status = 'active' ORDER BY id`);
}

export async function getPracticeQuestionsByChapterId(chapterId: number) {
  return query<PracticeQuestion>(`SELECT * FROM practice_questions WHERE chapter_id = ? AND status = 'active' ORDER BY id`, [chapterId]);
}

export async function getPracticeQuestionById(id: number) {
  const rows = await query<PracticeQuestion>(`SELECT * FROM practice_questions WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getPracticeQuestionBySourceId(sourceQuestionId: number) {
  const rows = await query<PracticeQuestion>(`SELECT * FROM practice_questions WHERE source_question_id = ? LIMIT 1`, [sourceQuestionId]);
  return rows[0] || null;
}

export async function createPracticeQuestion(data: Partial<PracticeQuestion>) {
  const result = await execute(
    `INSERT INTO practice_questions (source_question_id, chapter_id, question, question_image, question_type, correct_answer, explanation, difficulty, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.source_question_id ?? null, data.chapter_id ?? null, data.question, data.question_image ?? null, data.question_type || "mcq", data.correct_answer ?? null, data.explanation ?? null, data.difficulty || "easy", data.status || "active"],
  );
  return result.insertId as number;
}

export async function updatePracticeQuestion(id: number, data: Partial<PracticeQuestion>) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "id") {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  values.push(id);
  await query(`UPDATE practice_questions SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deletePracticeQuestion(id: number) {
  await query(`DELETE FROM practice_questions WHERE id = ?`, [id]);
}

export async function getPracticeOptionsByQuestionId(questionId: number) {
  return query<PracticeQuestionOption>(`SELECT * FROM practice_question_options WHERE question_id = ? ORDER BY id`, [questionId]);
}

export async function createPracticeQuestionOption(data: Partial<PracticeQuestionOption>) {
  const result = await execute(
    `INSERT INTO practice_question_options (question_id, option_text, is_correct) VALUES (?, ?, ?)`,
    [data.question_id, data.option_text, data.is_correct ?? 0],
  );
  return result.insertId as number;
}

export async function deletePracticeQuestionOption(id: number) {
  await query(`DELETE FROM practice_question_options WHERE id = ?`, [id]);
}

export async function deletePracticeOptionsByQuestionId(questionId: number) {
  await query(`DELETE FROM practice_question_options WHERE question_id = ?`, [questionId]);
}

export async function syncQuestionToPractice(sourceQuestionId: number) {
  const existing = await getPracticeQuestionBySourceId(sourceQuestionId);
  if (existing) return existing.id;

  const sourceQ = await getQuestionById(sourceQuestionId);
  if (!sourceQ) throw new Error("Source question not found");

  const pqId = await createPracticeQuestion({
    source_question_id: sourceQ.id,
    chapter_id: sourceQ.chapter_id,
    question: sourceQ.question,
    question_image: sourceQ.question_image,
    question_type: sourceQ.question_type,
    correct_answer: sourceQ.correct_answer,
    explanation: sourceQ.explanation,
    difficulty: sourceQ.difficulty,
    status: sourceQ.status,
  });

  const options = await getOptionsByQuestionId(sourceQ.id);
  for (const opt of options) {
    await createPracticeQuestionOption({
      question_id: pqId,
      option_text: opt.option_text,
      is_correct: opt.is_correct,
    });
  }

  return pqId;
}

export async function removeQuestionFromPractice(sourceQuestionId: number) {
  const existing = await getPracticeQuestionBySourceId(sourceQuestionId);
  if (!existing) return;
  await deletePracticeOptionsByQuestionId(existing.id);
  await deletePracticeQuestion(existing.id);
}

export async function getPracticeQuestionsWithOptions(chapterId?: number) {
  const sql = chapterId
    ? `SELECT q.* FROM practice_questions q WHERE q.chapter_id = ? AND q.status = 'active' ORDER BY q.id`
    : `SELECT q.* FROM practice_questions q WHERE q.status = 'active' ORDER BY q.id`;
  const questions = await query<PracticeQuestion>(sql, chapterId ? [chapterId] : []);
  const result = [];
  for (const q of questions) {
    const options = await getPracticeOptionsByQuestionId(q.id);
    result.push({ ...q, options });
  }
  return result;
}

// ===================== PASSWORD RESETS =====================

export async function updateUserPassword(id: number, passwordHash: string) {
  await execute(`UPDATE users SET password = ? WHERE id = ?`, [passwordHash, id]);
}

export async function createPasswordReset(email: string, tokenHash: string, expiresAt: string) {
  // Invalidate any prior tokens for this email, then store the new one.
  await execute(`DELETE FROM password_resets WHERE email = ?`, [email]);
  await execute(
    `INSERT INTO password_resets (email, token_hash, expires_at) VALUES (?, ?, ?)`,
    [email, tokenHash, expiresAt],
  );
}

// Returns the matching, unexpired reset row (or null). `nowStr` is the current
// time formatted as 'YYYY-MM-DD HH:MM:SS' for lexicographic comparison.
export async function getValidPasswordReset(email: string, tokenHash: string, nowStr: string) {
  const rows = await query<{ id: number; email: string; expires_at: string }>(
    `SELECT id, email, expires_at FROM password_resets
     WHERE email = ? AND token_hash = ? AND expires_at > ? LIMIT 1`,
    [email, tokenHash, nowStr],
  );
  return rows[0] || null;
}

export async function deletePasswordResetsForEmail(email: string) {
  await execute(`DELETE FROM password_resets WHERE email = ?`, [email]);
}
