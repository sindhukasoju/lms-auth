// ============================================================
// src/mock/mockData.js
// Central mock data store — replace with real API calls later
// ============================================================

// ── Users ────────────────────────────────────────────────────
export const mockUsers = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "student", status: "active", createdAt: "2025-01-15T10:00:00Z", avatar: null },
  { id: "u2", name: "Bob Martinez", email: "bob@example.com", role: "student", status: "active", createdAt: "2025-02-10T09:30:00Z", avatar: null },
  { id: "u3", name: "Carol White", email: "carol@example.com", role: "student", status: "blocked", createdAt: "2025-02-20T14:00:00Z", avatar: null },
  { id: "u4", name: "David Lee", email: "david@example.com", role: "instructor", status: "active", createdAt: "2025-01-05T08:00:00Z", avatar: null },
  { id: "u5", name: "Eva Green", email: "eva@example.com", role: "instructor", status: "active", createdAt: "2025-03-01T11:00:00Z", avatar: null },
  { id: "u6", name: "Frank Brown", email: "frank@example.com", role: "student", status: "active", createdAt: "2025-03-15T16:00:00Z", avatar: null },
  { id: "u7", name: "Grace Kim", email: "grace@example.com", role: "student", status: "active", createdAt: "2025-04-01T12:00:00Z", avatar: null },
  { id: "u8", name: "Henry Davis", email: "henry@example.com", role: "student", status: "blocked", createdAt: "2025-04-10T15:30:00Z", avatar: null },
  { id: "u9", name: "Irene Wilson", email: "irene@example.com", role: "instructor", status: "active", createdAt: "2025-01-20T09:00:00Z", avatar: null },
  { id: "u10", name: "Admin User", email: "admin@demo.com", role: "admin", status: "active", createdAt: "2024-12-01T00:00:00Z", avatar: null },
];

// ── Courses ──────────────────────────────────────────────────
export const mockCourses = [
  {
    id: "c1", title: "Complete React Masterclass", instructor: "David Lee", instructorName: "David Lee",
    price: 49, status: "approved", category: "Development", rating: 4.8, enrolled: 1240,
    lessons: 32, duration: "18 hours", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    description: "Learn React from scratch to advanced concepts.", createdAt: "2025-01-20T10:00:00Z"
  },
  {
    id: "c2", title: "UI/UX Design Fundamentals", instructor: "Eva Green", instructorName: "Eva Green",
    price: 39, status: "approved", category: "Design", rating: 4.7, enrolled: 875,
    lessons: 24, duration: "12 hours", thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    description: "Master Figma and design principles.", createdAt: "2025-02-05T09:00:00Z"
  },
  {
    id: "c3", title: "Node.js Backend Development", instructor: "Irene Wilson", instructorName: "Irene Wilson",
    price: 59, status: "pending", category: "Development", rating: 4.6, enrolled: 560,
    lessons: 28, duration: "15 hours", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    description: "Build scalable backends with Node.js and Express.", createdAt: "2025-03-10T11:00:00Z"
  },
  {
    id: "c4", title: "Digital Marketing Mastery", instructor: "David Lee", instructorName: "David Lee",
    price: 29, status: "approved", category: "Marketing", rating: 4.5, enrolled: 2100,
    lessons: 18, duration: "8 hours", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "SEO, PPC, and social media marketing.", createdAt: "2025-03-25T14:00:00Z"
  },
  {
    id: "c5", title: "Python for Data Science", instructor: "Eva Green", instructorName: "Eva Green",
    price: 79, status: "rejected", category: "Data Science", rating: 4.9, enrolled: 3400,
    lessons: 45, duration: "30 hours", thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
    description: "Pandas, NumPy, and Machine Learning basics.", createdAt: "2025-04-01T08:00:00Z"
  },
  {
    id: "c6", title: "Cybersecurity Foundations", instructor: "Irene Wilson", instructorName: "Irene Wilson",
    price: 69, status: "pending", category: "Security", rating: 4.4, enrolled: 430,
    lessons: 20, duration: "10 hours", thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    description: "Learn ethical hacking and network security.", createdAt: "2025-04-15T13:00:00Z"
  },
];

// ── Instructors (Applications) ────────────────────────────────
export const mockInstructors = [
  {
    id: "i1", name: "David Lee", email: "david@example.com",
    status: "approved", applicationStatus: "approved",
    expertise: "Web Development", bio: "10+ years in React and Node.js",
    appliedAt: "2025-01-05T08:00:00Z", coursesCount: 2
  },
  {
    id: "i2", name: "Eva Green", email: "eva@example.com",
    status: "approved", applicationStatus: "approved",
    expertise: "UI/UX Design", bio: "Senior designer at top tech firms",
    appliedAt: "2025-02-01T09:00:00Z", coursesCount: 2
  },
  {
    id: "i3", name: "Irene Wilson", email: "irene@example.com",
    status: "approved", applicationStatus: "approved",
    expertise: "Backend Development", bio: "Full-stack developer with cloud expertise",
    appliedAt: "2025-01-18T10:00:00Z", coursesCount: 2
  },
  {
    id: "i4", name: "James Taylor", email: "james@example.com",
    status: "pending", applicationStatus: "pending",
    expertise: "Machine Learning", bio: "PhD in AI from Stanford",
    appliedAt: "2025-04-20T11:00:00Z", coursesCount: 0
  },
  {
    id: "i5", name: "Karen Smith", email: "karen@example.com",
    status: "pending", applicationStatus: "pending",
    expertise: "Business Strategy", bio: "MBA + 15 years corporate experience",
    appliedAt: "2025-04-25T14:00:00Z", coursesCount: 0
  },
];

// ── Orders ───────────────────────────────────────────────────
export const mockOrders = [
  {
    id: "ORD001", userId: "u1", userEmail: "alice@example.com", userName: "Alice Johnson", userPhone: "+1 555-0101",
    totalAmount: 49, status: "completed", paymentMethod: "Credit Card",
    shippingAddress: "123 Main St", shippingCity: "New York", shippingPostalCode: "10001", shippingCountry: "USA",
    createdAt: "2025-05-18T10:00:00Z", updatedAt: "2025-05-18T10:05:00Z",
    items: [{ title: "Complete React Masterclass", price: 49, quantity: 1 }]
  },
  {
    id: "ORD002", userId: "u2", userEmail: "bob@example.com", userName: "Bob Martinez", userPhone: "+1 555-0202",
    totalAmount: 79, status: "pending", paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave", shippingCity: "Los Angeles", shippingPostalCode: "90001", shippingCountry: "USA",
    createdAt: "2025-05-17T14:00:00Z", updatedAt: "2025-05-17T14:00:00Z",
    items: [{ title: "Python for Data Science", price: 79, quantity: 1 }]
  },
  {
    id: "ORD003", userId: "u3", userEmail: "carol@example.com", userName: "Carol White", userPhone: "+1 555-0303",
    totalAmount: 39, status: "cancelled", paymentMethod: "Debit Card",
    shippingAddress: "789 Pine Rd", shippingCity: "Chicago", shippingPostalCode: "60601", shippingCountry: "USA",
    createdAt: "2025-05-16T09:00:00Z", updatedAt: "2025-05-16T10:00:00Z",
    items: [{ title: "UI/UX Design Fundamentals", price: 39, quantity: 1 }]
  },
  {
    id: "ORD004", userId: "u6", userEmail: "frank@example.com", userName: "Frank Brown", userPhone: "+1 555-0404",
    totalAmount: 88, status: "completed", paymentMethod: "Credit Card",
    shippingAddress: "321 Elm St", shippingCity: "Houston", shippingPostalCode: "77001", shippingCountry: "USA",
    createdAt: "2025-05-15T11:00:00Z", updatedAt: "2025-05-15T11:10:00Z",
    items: [
      { title: "Complete React Masterclass", price: 49, quantity: 1 },
      { title: "UI/UX Design Fundamentals", price: 39, quantity: 1 }
    ]
  },
  {
    id: "ORD005", userId: "u7", userEmail: "grace@example.com", userName: "Grace Kim", userPhone: "+1 555-0505",
    totalAmount: 59, status: "processing", paymentMethod: "UPI",
    shippingAddress: "654 Maple Dr", shippingCity: "Phoenix", shippingPostalCode: "85001", shippingCountry: "USA",
    createdAt: "2025-05-14T16:00:00Z", updatedAt: "2025-05-14T16:00:00Z",
    items: [{ title: "Node.js Backend Development", price: 59, quantity: 1 }]
  },
  {
    id: "ORD006", userId: "u1", userEmail: "alice@example.com", userName: "Alice Johnson", userPhone: "+1 555-0101",
    totalAmount: 29, status: "completed", paymentMethod: "Credit Card",
    shippingAddress: "123 Main St", shippingCity: "New York", shippingPostalCode: "10001", shippingCountry: "USA",
    createdAt: "2025-05-13T13:00:00Z", updatedAt: "2025-05-13T13:05:00Z",
    items: [{ title: "Digital Marketing Mastery", price: 29, quantity: 1 }]
  },
  {
    id: "ORD007", userId: "u8", userEmail: "henry@example.com", userName: "Henry Davis", userPhone: "+1 555-0606",
    totalAmount: 69, status: "refunded", paymentMethod: "PayPal",
    shippingAddress: "987 Cedar Ln", shippingCity: "Philadelphia", shippingPostalCode: "19101", shippingCountry: "USA",
    createdAt: "2025-05-10T08:00:00Z", updatedAt: "2025-05-12T09:00:00Z",
    items: [{ title: "Cybersecurity Foundations", price: 69, quantity: 1 }]
  },
  {
    id: "ORD008", userId: "u2", userEmail: "bob@example.com", userName: "Bob Martinez", userPhone: "+1 555-0202",
    totalAmount: 49, status: "completed", paymentMethod: "Credit Card",
    shippingAddress: "456 Oak Ave", shippingCity: "Los Angeles", shippingPostalCode: "90001", shippingCountry: "USA",
    createdAt: "2025-05-08T10:00:00Z", updatedAt: "2025-05-08T10:05:00Z",
    items: [{ title: "Complete React Masterclass", price: 49, quantity: 1 }]
  },
];

// ── Analytics / Revenue ──────────────────────────────────────
export const mockRevenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6500 },
  { month: "May", revenue: 9100 },
  { month: "Jun", revenue: 11400 },
  { month: "Jul", revenue: 10800 },
  { month: "Aug", revenue: 13200 },
];

export const mockOrderAnalytics = [
  { month: "Jan", orders: 82 },
  { month: "Feb", orders: 110 },
  { month: "Mar", orders: 145 },
  { month: "Apr", orders: 128 },
  { month: "May", orders: 187 },
  { month: "Jun", orders: 220 },
  { month: "Jul", orders: 198 },
  { month: "Aug", orders: 254 },
];

export const mockCourseStats = {
  totalCourses: 6,
  activeCourses: 4,
  totalEnrollments: 8609,
  avgCompletionRate: 72,
  mostPopularCategory: "Development",
  topCategories: [
    { name: "Development", count: 35 },
    { name: "Design", count: 20 },
    { name: "Marketing", count: 18 },
    { name: "Data Science", count: 15 },
    { name: "Security", count: 12 },
  ],
};

// ── Settings ─────────────────────────────────────────────────
export const mockPlatformSettings = {
  siteName: "LearnMaster LMS",
  maintenanceMode: false,
  maxUsers: 50000,
};

export const mockPaymentSettings = {
  paymentGateway: "Stripe",
  currency: "INR",
  taxPercentage: 18,
};

export const mockNotificationSettings = {
  emailEnabled: true,
  smsEnabled: false,
  pushNotifications: true,
};

// ── Notifications ────────────────────────────────────────────
export const mockNotifications = [
  { id: "n1", title: "New Enrollment", message: "Alice Johnson enrolled in React Masterclass", type: "info", read: false, createdAt: "2025-05-18T10:05:00Z" },
  { id: "n2", title: "Course Pending Review", message: "Node.js Backend Development is awaiting approval", type: "warning", read: false, createdAt: "2025-05-17T14:00:00Z" },
  { id: "n3", title: "Payment Received", message: "$49 payment received for ORD001", type: "success", read: true, createdAt: "2025-05-18T10:00:00Z" },
  { id: "n4", title: "Instructor Application", message: "James Taylor applied to become an instructor", type: "info", read: false, createdAt: "2025-04-20T11:00:00Z" },
  { id: "n5", title: "Order Cancelled", message: "Carol White cancelled order ORD003", type: "error", read: true, createdAt: "2025-05-16T10:00:00Z" },
];

// ── Certificates ─────────────────────────────────────────────
export const mockCertificates = [
  { id: "cert1", userId: "u1", courseId: "c1", courseTitle: "Complete React Masterclass", studentName: "Alice Johnson", issuedAt: "2025-04-30T12:00:00Z", certificateUrl: "#" },
  { id: "cert2", userId: "u1", courseId: "c4", courseTitle: "Digital Marketing Mastery", studentName: "Alice Johnson", issuedAt: "2025-05-20T12:00:00Z", certificateUrl: "#" },
  { id: "cert3", userId: "u2", courseId: "c1", courseTitle: "Complete React Masterclass", studentName: "Bob Martinez", issuedAt: "2025-05-15T12:00:00Z", certificateUrl: "#" },
];

// ── Student enrolled courses ──────────────────────────────────
export const mockStudentEnrollments = [
  {
    id: "e1", courseId: "c1", title: "Complete React Masterclass", instructor: "David Lee",
    progress: 65, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    lastAccessed: "2025-05-17T15:00:00Z", totalLessons: 32, completedLessons: 21
  },
  {
    id: "e2", courseId: "c4", title: "Digital Marketing Mastery", instructor: "David Lee",
    progress: 100, thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    lastAccessed: "2025-05-20T10:00:00Z", totalLessons: 18, completedLessons: 18
  },
  {
    id: "e3", courseId: "c2", title: "UI/UX Design Fundamentals", instructor: "Eva Green",
    progress: 30, thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    lastAccessed: "2025-05-10T09:00:00Z", totalLessons: 24, completedLessons: 7
  },
];

// ── Demo Credentials ──────────────────────────────────────────
export const DEMO_CREDENTIALS = [
  { role: "Admin",       email: "admin@demo.com",      password: "demo123" },
  { role: "Instructor",  email: "instructor@demo.com",  password: "demo123" },
  { role: "Student",     email: "student@demo.com",     password: "demo123" },
];

// ── Helper: determine role from email ────────────────────────
export const getRoleFromEmail = (email = "") => {
  const lower = email.toLowerCase();
  if (lower.includes("admin")) return "admin";
  if (lower.includes("instructor")) return "instructor";
  return "student";
};
