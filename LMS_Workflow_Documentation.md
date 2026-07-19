# Learning Management System (LMS) - Workflow Documentation

## 1. Introduction
This document outlines the complete workflow of the Learning Management System (LMS) project. The platform is designed to serve multiple user roles, each with a distinct set of features and permissions.

The application is built using React (Vite) and Tailwind CSS, utilizing `react-router-dom` for navigation, and context providers (`AuthProvider`, `OrderProvider`) for state management.

## 2. User Roles
The LMS supports the following primary user roles:
- **Guest (Unauthenticated User)**
- **Student**
- **Instructor**
- **Administrator (Admin)**

---

## 3. Workflows by Role

### 3.1. Guest (Public) Workflow
Guests can browse public-facing pages and authenticate to gain access to role-specific features.
- **Landing Page (`/`)**: The main entry point showcasing the platform, featured courses, and calls to action.
- **Authentication**:
  - **Login (`/login`)**: Standard email/password login.
  - **Register (`/register`)**: New user registration.
  - **OTP Authentication**: 
    - `/otp-login`: Request OTP for login.
    - `/otp-verify`: Verify the provided OTP.
  - **Password Recovery**:
    - `/forgot-password`: Request password reset.
    - `/reset-otp`: Enter reset OTP and new password.

### 3.2. Student Workflow
Students focus on discovering, purchasing, and consuming course content.
- **Dashboard (`/student/dashboard`)**: Overview of learning progress, recent activities, and recommendations.
- **My Learning (`/student/my-learning`)**: Access to purchased and enrolled courses.
- **Wishlist (`/student/wishlist`)**: Saved courses for future consideration.
- **Cart & Checkout**:
  - `/cart`: View courses selected for purchase.
  - `/checkout`: Complete the payment process.
- **Orders (`/student/orders`)**: History of past purchases and transactions.

### 3.3. Instructor Workflow
Instructors can create and manage course content and view their performance.
- **Dashboard (`/instructor/dashboard`)**: Overview of sales, student enrollments, and course engagement.
- **Course Management**:
  - **My Courses (`/instructor/my-courses`)**: List of all courses published or drafted by the instructor.
  - **Create Course (`/instructor/create-course`)**: Interface to build new courses, upload materials, and set pricing.
- **Analytics (`/instructor/analytics`)**: Detailed insights into course performance and revenue.

### 3.4. Administrator Workflow
Admins have full control over the platform's operations, user management, and configuration.
- **Admin Authentication**:
  - `/admin/login`: Secure login portal for administrators.
  - `/admin/register`: Registration for new admin accounts (if enabled).
- **Core Management**:
  - **Dashboard (`/admin/dashboard`)**: High-level metrics and platform health.
  - **Users (`/admin/users`)**: Manage all platform users (ban, suspend, view details).
  - **Courses (`/admin/courses`)**: Approve, reject, or manage all courses.
  - **Instructors (`/admin/instructors`)**: Manage instructor profiles and payouts.
  - **Orders & Payments**:
    - `/admin/orders`: View all transactions.
    - `/admin/orders/:orderId`: Detailed view of a specific order.
    - `/admin/payments`: Manage platform revenue and instructor payouts.
- **Platform Operations**:
  - **Analytics (`/admin/analytics`)**: Platform-wide data and reports.
  - **Certificates (`/admin/certificates`)**: Manage course completion certificates.
  - **Notifications (`/admin/notifications`)**: Send and manage system alerts.
  - **Moderation & Reviews**:
    - `/admin/moderation`: Moderate user-generated content.
    - `/admin/reviews`: Manage course reviews and ratings.
  - **Support (`/admin/support`)**: Handle user support tickets.
- **System Configuration**:
  - **CMS (`/admin/cms`)**: Manage platform content (blogs, pages).
  - **Settings (`/admin/settings`)**: Global platform settings.
  - **Roles (`/admin/roles`)**: Manage RBAC (Role-Based Access Control).
  - **Advanced Features**:
    - `/admin/ai-features`: Configure AI integrations.
    - `/admin/gamification`: Manage badges, points, and leaderboards.
  - **Profile (`/admin/profile`)**: Manage admin's own profile settings.

---

## 4. Technical Implementation Details
- **Routing Protection**: All role-specific routes (Student, Instructor, Admin) are guarded by a `<ProtectedRoute>` component which checks the user's role against the `allowedRoles` array.
- **Layouts**: Authenticated users share a common `DashboardLayout` ensuring a consistent sidebar/navbar experience across different roles.
- **State Management**: 
  - `AuthProvider`: Manages user sessions, tokens, and roles.
  - `OrderProvider`: Manages cart and checkout states globally.

## 5. Conclusion
This workflow ensures a scalable and secure separation of concerns, providing tailored experiences for learners, educators, and platform managers.
