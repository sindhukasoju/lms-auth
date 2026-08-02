// ============================================================
// src/mock/mockService.js
// Mock API service — mirrors real API signatures.
// To re-enable real APIs: replace implementations in api/*.js
// ============================================================

import {
  mockUsers,
  mockCourses,
  mockInstructors,
  mockOrders,
  mockRevenueData,
  mockOrderAnalytics,
  mockCourseStats,
  mockPlatformSettings,
  mockPaymentSettings,
  mockNotificationSettings,
  mockNotifications,
  mockCertificates,
  mockStudentEnrollments,
  getRoleFromEmail,
} from "./mockData";

// ── Utility: simulated network delay ────────────────────────
export const mockDelay = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ── In-memory store helpers (persist to localStorage) ────────
const _read = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};
const _write = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Lazy-initialise mutable stores once
const initStore = (key, defaultData) => {
  if (!localStorage.getItem(key)) {
    _write(key, defaultData);
  }
};

initStore("mock_users", mockUsers);
initStore("mock_courses", mockCourses);
initStore("mock_instructors", mockInstructors);
initStore("mock_orders", mockOrders);
initStore("mock_settings_platform", mockPlatformSettings);
initStore("mock_settings_payment", mockPaymentSettings);
initStore("mock_settings_notifications", mockNotificationSettings);
initStore("mock_notifications", mockNotifications);
initStore("mock_certificates", mockCertificates);
initStore("mock_enrollments", mockStudentEnrollments);

// ── Auth ─────────────────────────────────────────────────────
export const mockAuthService = {
  login: async (email, password) => {
    await mockDelay(500);
    const role = getRoleFromEmail(email);
    const nameFromEmail = email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const user = {
      id: "demo_" + role + "_" + Date.now(),
      email,
      name: nameFromEmail || role,
      role,
      token: "demo_token_" + role,
    };
    return { success: true, user, token: user.token };
  },

  register: async (userData) => {
    await mockDelay(600);
    const role = getRoleFromEmail(userData.email);
    return {
      success: true,
      message: "Registration successful! Please log in.",
      user: { ...userData, id: "new_" + Date.now(), role },
    };
  },

  requestOtp: async (email) => {
    await mockDelay(500);
    return { success: true, message: `OTP sent to ${email}. (Demo: use 123456)` };
  },

  verifyOtp: async (email, otp) => {
    await mockDelay(500);
    // Accept any 6-digit OTP in demo mode
    if (otp.length < 4) throw new Error("Invalid OTP. Please enter a 6-digit code.");
    const role = getRoleFromEmail(email);
    const user = {
      id: "demo_" + role,
      email,
      name: email.split("@")[0],
      role,
      token: "demo_token_" + role,
    };
    return { success: true, user, token: user.token };
  },

  forgotPassword: async (email) => {
    await mockDelay(500);
    return { success: true, message: `Password reset OTP sent to ${email}. (Demo: use 123456)` };
  },

  resetPassword: async (email, otp, newPassword) => {
    await mockDelay(500);
    return { success: true, message: "Password reset successfully! Please log in." };
  },

  logout: async () => {
    await mockDelay(200);
    return { success: true };
  },

  uploadProfilePhoto: async (file) => {
    await mockDelay(800);
    return { success: true, photoUrl: URL.createObjectURL(file) };
  },
};

// ── Admin API ────────────────────────────────────────────────
export const mockAdminApi = {
  getDashboardData: async () => {
    await mockDelay(400);
    const users = _read("mock_users", mockUsers);
    const courses = _read("mock_courses", mockCourses);
    const orders = _read("mock_orders", mockOrders);
    const revenue = orders.filter(o => o.status === "completed").reduce((s, o) => s + o.totalAmount, 0);
    return { totalUsers: users.length, totalCourses: courses.length, revenue, orders: orders.length };
  },

  getAllUsers: async (params = {}) => {
    await mockDelay(400);
    const users = _read("mock_users", mockUsers);
    return { users, total: users.length };
  },

  getUserById: async (userId) => {
    await mockDelay(300);
    const users = _read("mock_users", mockUsers);
    return users.find(u => u.id === userId) || null;
  },

  updateUser: async (userId, userData) => {
    await mockDelay(400);
    const users = _read("mock_users", mockUsers);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) { users[idx] = { ...users[idx], ...userData }; _write("mock_users", users); }
    return users[idx];
  },

  deleteUser: async (userId) => {
    await mockDelay(400);
    const users = _read("mock_users", mockUsers).filter(u => u.id !== userId);
    _write("mock_users", users);
    return { success: true };
  },

  banUser: async (userId) => {
    await mockDelay(400);
    return mockAdminApi.updateUser(userId, { status: "blocked" });
  },

  unbanUser: async (userId) => {
    await mockDelay(400);
    return mockAdminApi.updateUser(userId, { status: "active" });
  },

  getInstructors: async (params = {}) => {
    await mockDelay(500);
    const instructors = _read("mock_instructors", mockInstructors);
    return { instructors, data: instructors, total: instructors.length };
  },

  approveInstructor: async (instructorId) => {
    await mockDelay(400);
    const instructors = _read("mock_instructors", mockInstructors);
    const idx = instructors.findIndex(i => i.id === instructorId);
    if (idx !== -1) {
      instructors[idx].status = "approved";
      instructors[idx].applicationStatus = "approved";
      _write("mock_instructors", instructors);
    }
    return { success: true, data: instructors[idx] };
  },

  rejectInstructor: async (instructorId) => {
    await mockDelay(400);
    const instructors = _read("mock_instructors", mockInstructors);
    const idx = instructors.findIndex(i => i.id === instructorId);
    if (idx !== -1) {
      instructors[idx].status = "rejected";
      instructors[idx].applicationStatus = "rejected";
      _write("mock_instructors", instructors);
    }
    return { success: true, data: instructors[idx] };
  },

  deleteInstructor: async (instructorId) => {
    await mockDelay(400);
    const instructors = _read("mock_instructors", mockInstructors).filter(i => i.id !== instructorId);
    _write("mock_instructors", instructors);
    return { success: true };
  },

  getAllCourses: async (params = {}) => {
    await mockDelay(500);
    const courses = _read("mock_courses", mockCourses);
    return { courses, total: courses.length };
  },

  updateCourseStatus: async (courseId, status) => {
    await mockDelay(400);
    const courses = _read("mock_courses", mockCourses);
    const idx = courses.findIndex(c => c.id === courseId);
    if (idx !== -1) { courses[idx].status = status; _write("mock_courses", courses); }
    return { success: true, data: courses[idx] };
  },

  deleteCourse: async (courseId) => {
    await mockDelay(400);
    const courses = _read("mock_courses", mockCourses).filter(c => c.id !== courseId);
    _write("mock_courses", courses);
    return { success: true };
  },

  getCategories: async () => {
    await mockDelay(300);
    return [
      { id: "cat1", name: "Development" },
      { id: "cat2", name: "Design" },
      { id: "cat3", name: "Marketing" },
      { id: "cat4", name: "Data Science" },
      { id: "cat5", name: "Security" },
      { id: "cat6", name: "Business" },
    ];
  },

  createCategory: async (data) => {
    await mockDelay(400);
    return { id: "cat_" + Date.now(), ...data };
  },

  updateCategory: async (id, data) => {
    await mockDelay(400);
    return { id, ...data };
  },

  deleteCategory: async (id) => {
    await mockDelay(400);
    return { success: true };
  },

  getAnalytics: async (params = {}) => {
    await mockDelay(500);
    return { revenueData: mockRevenueData, orderAnalytics: mockOrderAnalytics, courseStats: mockCourseStats };
  },

  getRevenue: async (params = {}) => {
    await mockDelay(400);
    return mockRevenueData;
  },

  getReports: async (params = {}) => {
    await mockDelay(400);
    return [];
  },

  resolveReport: async (reportId) => {
    await mockDelay(400);
    return { success: true };
  },

  getSettings: async () => {
    await mockDelay(400);
    return {
      platform: _read("mock_settings_platform", mockPlatformSettings),
      payment: _read("mock_settings_payment", mockPaymentSettings),
      notifications: _read("mock_settings_notifications", mockNotificationSettings),
    };
  },

  updateSettings: async (settingsData) => {
    await mockDelay(400);
    return { success: true, ...settingsData };
  },

  getPlatformSettings: async () => {
    await mockDelay(300);
    return _read("mock_settings_platform", mockPlatformSettings);
  },

  savePlatformSettings: async (data) => {
    await mockDelay(400);
    _write("mock_settings_platform", { ..._read("mock_settings_platform", mockPlatformSettings), ...data });
    return { success: true };
  },

  getPaymentSettings: async () => {
    await mockDelay(300);
    return _read("mock_settings_payment", mockPaymentSettings);
  },

  savePaymentSettings: async (data) => {
    await mockDelay(400);
    _write("mock_settings_payment", { ..._read("mock_settings_payment", mockPaymentSettings), ...data });
    return { success: true };
  },

  getNotificationSettings: async () => {
    await mockDelay(300);
    return _read("mock_settings_notifications", mockNotificationSettings);
  },

  saveNotificationSettings: async (data) => {
    await mockDelay(400);
    _write("mock_settings_notifications", { ..._read("mock_settings_notifications", mockNotificationSettings), ...data });
    return { success: true };
  },

  getActivityLogs: async (params = {}) => {
    await mockDelay(400);
    return [
      { id: "log1", action: "User Login", user: "alice@example.com", createdAt: "2025-05-18T10:00:00Z" },
      { id: "log2", action: "Course Approved", user: "admin@demo.com", createdAt: "2025-05-17T14:00:00Z" },
      { id: "log3", action: "Order Created", user: "bob@example.com", createdAt: "2025-05-17T13:00:00Z" },
    ];
  },

  getAllOrders: async (params = {}) => {
    await mockDelay(500);
    const orders = _read("mock_orders", mockOrders);
    return { orders, total: orders.length };
  },

  getOrderById: async (orderId) => {
    await mockDelay(400);
    const orders = _read("mock_orders", mockOrders);
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");
    return order;
  },

  getNotifications: async () => {
    await mockDelay(300);
    return _read("mock_notifications", mockNotifications);
  },

  getCertificates: async () => {
    await mockDelay(400);
    return _read("mock_certificates", mockCertificates);
  },
};

// ── Course API ───────────────────────────────────────────────
export const mockCourseApi = {
  getAllCourses: async (params = {}) => {
    await mockDelay(400);
    return _read("mock_courses", mockCourses);
  },

  getCourseById: async (courseId) => {
    await mockDelay(300);
    const courses = _read("mock_courses", mockCourses);
    return courses.find(c => c.id === courseId) || null;
  },

  searchCourses: async (query, filters = {}) => {
    await mockDelay(400);
    const courses = _read("mock_courses", mockCourses);
    return courses.filter(c => c.title.toLowerCase().includes((query || "").toLowerCase()));
  },

  getCoursesByCategory: async (category) => {
    await mockDelay(300);
    const courses = _read("mock_courses", mockCourses);
    return courses.filter(c => c.category === category);
  },

  enrollCourse: async (courseId) => {
    await mockDelay(500);
    return { success: true, message: "Successfully enrolled in course." };
  },

  getEnrolledCourses: async () => {
    await mockDelay(400);
    return _read("mock_enrollments", mockStudentEnrollments);
  },

  addToWishlist: async (courseId) => {
    await mockDelay(300);
    return { success: true };
  },

  removeFromWishlist: async (courseId) => {
    await mockDelay(300);
    return { success: true };
  },

  getWishlist: async () => {
    await mockDelay(300);
    const courses = _read("mock_courses", mockCourses);
    return courses.slice(0, 2);
  },

  getCourseReviews: async (courseId) => {
    await mockDelay(400);
    return [
      { id: "r1", user: "Alice J.", rating: 5, comment: "Excellent course!", createdAt: "2025-04-15T10:00:00Z" },
      { id: "r2", user: "Bob M.", rating: 4, comment: "Very helpful content.", createdAt: "2025-04-20T12:00:00Z" },
    ];
  },

  addCourseReview: async (courseId, reviewData) => {
    await mockDelay(400);
    return { id: "r_" + Date.now(), ...reviewData, createdAt: new Date().toISOString() };
  },

  updateProgress: async (courseId, lessonId, progressData) => {
    await mockDelay(300);
    return { success: true, ...progressData };
  },

  getCourseProgress: async (courseId) => {
    await mockDelay(300);
    return { courseId, progress: 65, completedLessons: [1, 2, 3] };
  },
};

// ── Instructor API ────────────────────────────────────────────
export const mockInstructorApi = {
  getDashboardData: async () => {
    await mockDelay(500);
    return {
      totalCourses: 2,
      totalStudents: 87,
      totalEarnings: 2450,
      pendingEarnings: 150,
      recentEnrollments: 12,
    };
  },

  getProfile: async () => {
    await mockDelay(400);
    return {
      id: "i1", name: "Demo Instructor", email: "instructor@demo.com",
      bio: "Passionate educator with 8+ years of experience.",
      expertise: "Web Development", rating: 4.8, totalStudents: 87,
    };
  },

  updateProfile: async (profileData) => {
    await mockDelay(500);
    return { success: true, ...profileData };
  },

  createCourse: async (courseData) => {
    await mockDelay(600);
    const newCourse = { id: "c_" + Date.now(), status: "draft", createdAt: new Date().toISOString(), ...courseData };
    const courses = _read("mock_courses", mockCourses);
    courses.push(newCourse);
    _write("mock_courses", courses);
    return newCourse;
  },

  updateCourse: async (courseId, courseData) => {
    await mockDelay(500);
    const courses = _read("mock_courses", mockCourses);
    const idx = courses.findIndex(c => c.id === courseId);
    if (idx !== -1) { courses[idx] = { ...courses[idx], ...courseData }; _write("mock_courses", courses); }
    return courses[idx];
  },

  deleteCourse: async (courseId) => {
    await mockDelay(400);
    const courses = _read("mock_courses", mockCourses).filter(c => c.id !== courseId);
    _write("mock_courses", courses);
    return { success: true };
  },

  getCourses: async () => {
    await mockDelay(400);
    return _read("mock_courses", mockCourses).slice(0, 2);
  },

  uploadThumbnail: async (courseId, file) => {
    await mockDelay(800);
    return { success: true, thumbnailUrl: URL.createObjectURL(file) };
  },

  uploadVideo: async (courseId, lessonId, file) => {
    await mockDelay(1000);
    return { success: true, videoUrl: "#" };
  },

  addLesson: async (courseId, lessonData) => {
    await mockDelay(400);
    return { id: "l_" + Date.now(), courseId, ...lessonData };
  },

  updateLesson: async (courseId, lessonId, lessonData) => {
    await mockDelay(400);
    return { id: lessonId, courseId, ...lessonData };
  },

  deleteLesson: async (courseId, lessonId) => {
    await mockDelay(400);
    return { success: true };
  },

  getCourseEnrollments: async (courseId) => {
    await mockDelay(400);
    return [
      { id: "e1", studentName: "Alice Johnson", studentEmail: "alice@example.com", progress: 65, enrolledAt: "2025-04-15T10:00:00Z" },
      { id: "e2", studentName: "Bob Martinez", studentEmail: "bob@example.com", progress: 40, enrolledAt: "2025-04-20T09:00:00Z" },
    ];
  },

  getEarnings: async (params = {}) => {
    await mockDelay(400);
    return { total: 2450, pending: 150, monthly: [320, 450, 580, 620, 480, 600] };
  },

  getCourseAnalytics: async (courseId) => {
    await mockDelay(400);
    return { enrollments: 87, completionRate: 72, avgRating: 4.8, revenue: 2450 };
  },

  getCourseReviews: async (courseId) => {
    await mockDelay(400);
    return [
      { id: "rv1", user: "Alice J.", rating: 5, comment: "Excellent!", createdAt: "2025-04-15T10:00:00Z" },
    ];
  },

  respondToReview: async (courseId, reviewId, response) => {
    await mockDelay(400);
    return { success: true };
  },
};

// ── Student API ───────────────────────────────────────────────
export const mockStudentApi = {
  getDashboardData: async () => {
    await mockDelay(400);
    const enrollments = _read("mock_enrollments", mockStudentEnrollments);
    const completed = enrollments.filter(e => e.progress === 100).length;
    const certs = _read("mock_certificates", mockCertificates);
    return { enrolledCourses: enrollments.length, completedCourses: completed, certificates: certs.length };
  },

  getProfile: async () => {
    await mockDelay(400);
    return {
      id: "demo_student", name: "Demo Student", email: "student@demo.com",
      phone: "+1 555-0100", bio: "Lifelong learner.", joinedAt: "2025-01-01T00:00:00Z",
    };
  },

  updateProfile: async (profileData) => {
    await mockDelay(500);
    return { success: true, ...profileData };
  },

  getCertificates: async () => {
    await mockDelay(400);
    return _read("mock_certificates", mockCertificates);
  },

  downloadCertificate: async (certificateId) => {
    await mockDelay(500);
    return new Blob(["Mock Certificate PDF"], { type: "application/pdf" });
  },

  getCart: async () => {
    await mockDelay(300);
    const stored = localStorage.getItem("lms_cart");
    return stored ? JSON.parse(stored) : [];
  },

  addToCart: async (courseId) => {
    await mockDelay(300);
    return { success: true };
  },

  removeFromCart: async (courseId) => {
    await mockDelay(300);
    return { success: true };
  },

  clearCart: async () => {
    await mockDelay(300);
    localStorage.removeItem("lms_cart");
    return { success: true };
  },

  checkout: async (paymentData) => {
    await mockDelay(800);
    return { success: true, orderId: "ORD_" + Date.now(), message: "Payment successful!" };
  },

  getNotifications: async () => {
    await mockDelay(300);
    return _read("mock_notifications", mockNotifications);
  },

  markNotificationRead: async (notificationId) => {
    await mockDelay(300);
    const notifications = _read("mock_notifications", mockNotifications);
    const idx = notifications.findIndex(n => n.id === notificationId);
    if (idx !== -1) { notifications[idx].read = true; _write("mock_notifications", notifications); }
    return { success: true };
  },

  getLearningHistory: async () => {
    await mockDelay(400);
    return _read("mock_enrollments", mockStudentEnrollments);
  },
};
