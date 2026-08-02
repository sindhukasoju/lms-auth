import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Home, BookOpen, Heart, PlusCircle, BarChart3, Users, DollarSign, LogOut, Menu,
  LayoutDashboard, Award, Bell, Shield, HelpCircle, Globe, Settings, Sparkles,
  Trophy, Star, ShoppingCart
} from "lucide-react";
import { getUser, logout } from "../../utils/auth";

// Read counts from localStorage
const getWishlistCount = () => {
  try {
    const w = localStorage.getItem("lms_wishlist");
    const arr = w ? JSON.parse(w) : [];
    return Array.isArray(arr) ? arr.length : 0;
  } catch { return 0; }
};
const getCartCount = () => {
  try {
    const c = localStorage.getItem("lms_cart");
    const arr = c ? JSON.parse(c) : [];
    return arr.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } catch { return 0; }
};

const Sidebar = ({ open, setOpen }) => {
  const user = getUser();
  const [wishlistCount, setWishlistCount] = useState(getWishlistCount);
  const [cartCount,     setCartCount]     = useState(getCartCount);

  // Re-sync counts whenever localStorage changes (cross-tab + same-tab)
  useEffect(() => {
    const sync = () => {
      setWishlistCount(getWishlistCount());
      setCartCount(getCartCount());
    };
    window.addEventListener("storage", sync);
    // Also poll every 2s so same-tab changes (addToCart / toggleWishlist) reflect quickly
    const interval = setInterval(sync, 2000);
    return () => {
      window.removeEventListener("storage", sync);
      clearInterval(interval);
    };
  }, []);

  const studentLinks = [
    { to: "/student/dashboard",   icon: Home,         label: "Dashboard" },
    { to: "/student/my-learning", icon: BookOpen,     label: "My Learning" },
    {
      to: "/student/wishlist",
      icon: Heart,
      label: "Wishlist",
      badge: wishlistCount > 0 ? wishlistCount : null,
      badgeColor: "bg-red-500",
    },
    {
      to: "/student/cart",
      icon: ShoppingCart,
      label: "My Cart",
      badge: cartCount > 0 ? cartCount : null,
      badgeColor: "bg-orange-500",
    },
  ];

  const instructorLinks = [
    { to: "/instructor/dashboard",    icon: Home,        label: "Dashboard" },
    { to: "/instructor/create-course",icon: PlusCircle,  label: "Create Course" },
    { to: "/instructor/my-courses",   icon: BookOpen,    label: "My Courses" },
    { to: "/instructor/analytics",    icon: BarChart3,   label: "Analytics" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard",    icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users",        icon: Users,           label: "Users" },
    { to: "/admin/courses",      icon: BookOpen,        label: "Courses" },
    { to: "/admin/instructors",  icon: Users,           label: "Instructors" },
    { to: "/admin/orders",       icon: DollarSign,      label: "Orders" },
    { to: "/admin/payments",     icon: DollarSign,      label: "Payments" },
    { to: "/admin/reviews",      icon: Star,            label: "Reviews" },
    { to: "/admin/analytics",    icon: BarChart3,       label: "Analytics" },
    { to: "/admin/certificates", icon: Award,           label: "Certificates" },
    { to: "/admin/notifications",icon: Bell,            label: "Notifications" },
    { to: "/admin/moderation",   icon: Shield,          label: "Moderation" },
    { to: "/admin/support",      icon: HelpCircle,      label: "Support" },
    { to: "/admin/cms",          icon: Globe,           label: "CMS" },
    { to: "/admin/settings",     icon: Settings,        label: "Settings" },
    { to: "/admin/roles",        icon: Shield,          label: "Roles" },
    { to: "/admin/ai-features",  icon: Sparkles,        label: "AI Features" },
    { to: "/admin/gamification", icon: Trophy,          label: "Gamification" },
  ];

  let links = [];
  if (user?.role === "student")    links = studentLinks;
  else if (user?.role === "instructor") links = instructorLinks;
  else if (user?.role === "admin") links = adminLinks;

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-20 ${open ? "w-64" : "w-20"}`}>
      <div className="flex flex-col h-full">
        {/* Logo / Home link */}
        <div className="p-4 border-b flex justify-between items-center">
          <Link
            to="/"
            title="Go to Landing Page"
            className={`flex items-center gap-1.5 font-bold text-orange-600 hover:text-orange-700 transition-colors ${!open && "hidden"}`}
          >
            <Home size={16} />
            <span>LMS Portal</span>
          </Link>
          {!open && (
            <Link to="/" title="Go to Home" className="text-orange-600 hover:text-orange-700 mx-auto">
              <Home size={20} />
            </Link>
          )}
          <button onClick={() => setOpen(!open)} className="p-1 rounded hover:bg-gray-100">
            <Menu size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition ${
                  isActive ? "bg-orange-50 text-orange-600 border-r-2 border-orange-600" : ""
                }`
              }
            >
              <div className="relative flex-shrink-0">
                <link.icon size={20} />
                {/* Badge — shown even when collapsed */}
                {link.badge && (
                  <span className={`absolute -top-2 -right-2 ${link.badgeColor} text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5`}>
                    {link.badge > 9 ? "9+" : link.badge}
                  </span>
                )}
              </div>
              {open && (
                <span className="flex-1 flex items-center justify-between">
                  {link.label}
                  {link.badge && (
                    <span className={`${link.badgeColor} text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1`}>
                      {link.badge > 9 ? "9+" : link.badge}
                    </span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button onClick={logout} className="flex items-center gap-3 text-gray-600 hover:text-red-500 w-full">
            <LogOut size={20} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;