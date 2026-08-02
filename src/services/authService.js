// src/services/authService.js
// Mock auth service — no real API calls.
// To re-enable real APIs: replace mockAuthService with real axios calls.
import { mockAuthService } from "../mock/mockService";
import { setUser, removeUser, getUser, decodeToken } from "../utils/auth";
import { getRoleFromEmail } from "../mock/mockData";

export const authService = {
  // Password Login
  login: async (email, password) => {
    const result = await mockAuthService.login(email, password);
    const user = result.user;
    localStorage.setItem("lms_token", user.token);
    localStorage.setItem("access_token", user.token);
    setUser(user);
    return { user, token: user.token };
  },

  // OTP request
  requestOtp: async (email) => {
    return await mockAuthService.requestOtp(email);
  },

  // OTP verify
  verifyOtp: async (email, otp, isAdmin) => {
    const result = await mockAuthService.verifyOtp(email, otp);
    const user = result.user;
    localStorage.setItem("lms_token", user.token);
    localStorage.setItem("access_token", user.token);
    setUser(user);
    return { user, token: user.token };
  },

  // Resend OTP
  resendOtp: async (email, isAdmin) => {
    return await mockAuthService.requestOtp(email);
  },

  // Process successful authentication
  handleAuthSuccess: (email) => {
    const role = getRoleFromEmail(email);
    const nameFromEmail = email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const user = {
      id: "demo_" + role,
      email,
      name: nameFromEmail,
      role,
      token: "demo_token_" + role,
    };
    localStorage.setItem("lms_token", user.token);
    localStorage.setItem("access_token", user.token);
    setUser(user);
    return { user, token: user.token };
  },

  // Logout
  logout: async () => {
    await mockAuthService.logout();
    localStorage.removeItem("lms_token");
    localStorage.removeItem("access_token");
    removeUser();
  },

  // Get current user
  getCurrentUser: () => {
    try {
      return getUser();
    } catch {
      return null;
    }
  },
};
