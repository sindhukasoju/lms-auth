import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, PlayCircle, CheckCircle, Award, FolderOpen, 
  Heart, Bell, MessageCircle, Calendar, LogOut, Edit,
  ChevronDown
} from "lucide-react";

function ProfileDropdown({ user, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('lms_wishlist') || '[]');
    setWishlistCount(wishlist.length);
  }, []);

  // Get user initials
  const getInitials = () => {
    if (!user) return 'U';
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    if (user.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  // Get user display name
  const getUserName = () => {
    if (!user) return 'User';
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    if (user.name) return user.name;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button - White background */}
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
          className={`text-gray-400 transition-transform duration-300 hidden lg:block ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu - With Scroll */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in-down max-h-[90vh] overflow-y-auto">
          {/* User Info Header - White background */}
          <div className="px-4 py-4 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {getInitials()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-lg truncate">{getUserName()}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                    Student
                  </span>
                  <button 
                    onClick={() => { navigate("/student/profile"); setIsOpen(false); }}
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium hover:underline flex items-center gap-1"
                  >
                    <Edit size={12} /> View / Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MY LEARNING Section */}
          <div className="px-2 py-2 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">
              MY LEARNING
            </p>
            <button
              onClick={() => { navigate("/student/my-learning"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <BookOpen size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Enrolled Courses</span>
            </button>
            <button
              onClick={() => { navigate("/student/continue-learning"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <PlayCircle size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Continue Learning</span>
            </button>
            <button
              onClick={() => { navigate("/student/completed"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <CheckCircle size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Completed Courses</span>
            </button>
            <button
              onClick={() => { navigate("/student/certificates"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <Award size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Certificates</span>
            </button>
          </div>

          {/* MY CART Section */}
          <div className="px-2 py-2 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">
              MY CART
            </p>
            <button
              onClick={() => { navigate("/student/saved-courses"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <FolderOpen size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Saved Courses</span>
            </button>
            <button
              onClick={() => { navigate("/student/wishlist"); setIsOpen(false); }}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                  <Heart size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800">Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>

          {/* Notifications, Messages, Calendar */}
          <div className="px-2 py-2 border-b border-gray-100">
            <button
              onClick={() => { navigate("/student/notifications"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <Bell size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Notifications</span>
            </button>
            <button
              onClick={() => { navigate("/student/messages"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <MessageCircle size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Messages</span>
            </button>
            <button
              onClick={() => { navigate("/student/calendar"); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center">
                <Calendar size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-800">Calendar & Schedule</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="px-2 py-2 sticky bottom-0 bg-white border-t border-gray-100">
            <button
              onClick={() => { onLogout(); setIsOpen(false); }}
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