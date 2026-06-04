// Frontend API client — change API_BASE to separate backend when needed
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }
  return res.json();
}

// ===================== USERS =====================
export const getUsers = () => fetchJson<any[]>("/api/users");
export const getUser = (id: number) => fetchJson<any>(`/api/users/${id}`);
export const createUser = (data: any) => fetchJson<any>("/api/users", { method: "POST", body: JSON.stringify(data) });
export const updateUser = (id: number, data: any) => fetchJson<any>(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteUser = (id: number) => fetchJson<any>(`/api/users/${id}`, { method: "DELETE" });

// ===================== LANGUAGES =====================
export const getLanguages = () => fetchJson<any[]>("/api/languages");
export const getLanguage = (id: number) => fetchJson<any>(`/api/languages/${id}`);

// ===================== PROVINCES =====================
export const getProvinces = () => fetchJson<any[]>("/api/provinces");
export const getProvince = (id: number) => fetchJson<any>(`/api/provinces/${id}`);

// ===================== CATEGORIES =====================
export const getCategories = () => fetchJson<any[]>("/api/categories");
export const getCategory = (id: number) => fetchJson<any>(`/api/categories/${id}`);

// ===================== CHAPTERS =====================
export const getChapters = () => fetchJson<any[]>("/api/chapters");
export const getChapter = (slug: string) => fetchJson<any>(`/api/chapters/${slug}`);
export const getChapterQuestions = (chapterId: number) => fetchJson<any[]>(`/api/questions/by-chapter/${chapterId}`);

// ===================== QUESTIONS =====================
export const getQuestions = () => fetchJson<any[]>("/api/questions");
export const getQuestion = (id: number) => fetchJson<any>(`/api/questions/${id}`);

// ===================== MOCK TESTS =====================
export const getMockTests = () => fetchJson<any[]>("/api/mock-tests");
export const getMockTest = (id: number) => fetchJson<any>(`/api/mock-tests/${id}`);

// ===================== PRICING PLANS =====================
export const getPricingPlans = () => fetchJson<any[]>("/api/pricing");
export const getPricingPlan = (id: number) => fetchJson<any>(`/api/pricing/${id}`);

// ===================== FAQS =====================
export const getFaqs = () => fetchJson<any[]>("/api/faqs");

// ===================== APP SETTINGS =====================
export const getAppSettings = () => fetchJson<any>("/api/app-settings");

// ===================== BANNERS =====================
export const getBanners = () => fetchJson<any[]>("/api/banners");

// ===================== TESTIMONIALS =====================
export const getTestimonials = () => fetchJson<any[]>("/api/testimonials");

// ===================== BLOGS =====================
export const getBlogs = () => fetchJson<any[]>("/api/blogs");
export const getBlog = (slug: string) => fetchJson<any>(`/api/blogs/${slug}`);

// ===================== CONTACT =====================
export const sendContactMessage = (data: any) => fetchJson<any>("/api/contact-messages", { method: "POST", body: JSON.stringify(data) });

// ===================== TEST ATTEMPTS =====================
export const getTestAttempts = () => fetchJson<any[]>("/api/test-attempts");
export const createTestAttempt = (data: any) => fetchJson<any>("/api/test-attempts", { method: "POST", body: JSON.stringify(data) });

// ===================== PRACTICE SESSIONS =====================
export const getPracticeSessions = () => fetchJson<any[]>("/api/practice-sessions");
export const createPracticeSession = (data: any) => fetchJson<any>("/api/practice-sessions", { method: "POST", body: JSON.stringify(data) });

// ===================== USER PROGRESS =====================
export const getUserProgress = (userId: number) => fetchJson<any[]>(`/api/user-progress/${userId}`);
export const upsertUserProgress = (data: any) => fetchJson<any>("/api/user-progress", { method: "POST", body: JSON.stringify(data) });

// ===================== NOTIFICATIONS =====================
export const getNotifications = (userId: number) => fetchJson<any[]>(`/api/notifications?userId=${userId}`);
export const markNotificationRead = (id: number) => fetchJson<any>(`/api/notifications/${id}/read`, { method: "PATCH" });

// ===================== AUTH =====================
export const register = (data: any) => fetchJson<any>("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
export const login = (data: any) => fetchJson<any>("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
