import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  Heart,
  BookOpen,
  ShoppingBag,
  Award,
  Monitor,
  LogOut,
  Edit,
  ChevronDown,
} from "lucide-react";

function ProfileDropdown({ user, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch wishlist count
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("lms_wishlist") || "[]");
    setWishlistCount(wishlist.length);
  }, []);

  // Helper: user initials
  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    if (user.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const getUserName = () => {
    if (!user) return "User";
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    if (user.name) return user.name;
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  // Navigation helper – closes dropdown
  const navigateTo = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 shadow-sm hover:shadow-md group"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
            {getInitials()}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <span className="text-sm font-medium text-gray-700 hidden lg:block">
          {getUserName()}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 hidden lg:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in-down max-h-[90vh] overflow-y-auto">
          {/* User Info Header */}
          <div className="px-4 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {getInitials()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-lg truncate">
                  {getUserName()}
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                    Student
                  </span>
                  <button
                    onClick={() => navigateTo("/student/profile")}
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium hover:underline flex items-center gap-1"
                  >
                    <Edit size={12} /> View / Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-2 py-2">
            {/* My Profile */}
            <button
              onClick={() => navigateTo("/student/profile")}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <UserCircle size={16} className="text-gray-500 group-hover:text-orange-500" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">My Profile</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo("/student/wishlist")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                  <Heart size={16} className="text-gray-500 group-hover:text-orange-500" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800">Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* My Learning */}
            <button
              onClick={() => navigateTo("/student/my-learning")}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <BookOpen size={16} className="text-gray-500 group-hover:text-orange-500" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">My Learning</span>
            </button>

            {/* My Orders */}
            <button
              onClick={() => navigateTo("/student/my-orders")}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <ShoppingBag size={16} className="text-gray-500 group-hover:text-orange-500" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">My Orders</span>
            </button>

            {/* Certificates */}
            <button
              onClick={() => navigateTo("/student/certificates")}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <Award size={16} className="text-gray-500 group-hover:text-orange-500" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Certificates</span>
            </button>

            {/* List Devices */}
            <button
              onClick={() => navigateTo("/student/devices")}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <Monitor size={16} className="text-gray-500 group-hover:text-orange-500" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">List Devices</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="px-2 py-2 border-t border-gray-100 sticky bottom-0 bg-white">
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center">
                <LogOut size={16} className="text-red-500" />
              </div>
              <span className="text-sm text-red-600 group-hover:text-red-700 font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ProfileDropdown;