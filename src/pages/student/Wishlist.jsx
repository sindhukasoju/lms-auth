// src/pages/student/Wishlist.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Star, Clock, Users, BookOpen, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

/* ─── helpers ─────────────────────────────────────────────── */
const readWishlist = () => {
  try {
    const raw = localStorage.getItem("lms_wishlist");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Accept only full course objects (not plain IDs)
    return parsed.filter(c => c && typeof c === "object" && c.id !== undefined);
  } catch {
    return [];
  }
};

const readCart = () => {
  try {
    const raw = localStorage.getItem("lms_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/* ─── component ───────────────────────────────────────────── */
const Wishlist = () => {
  const navigate = useNavigate();
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  const syncFromStorage = useCallback(() => {
    setItems(readWishlist());
    setLoading(false);
  }, []);

  useEffect(() => {
    syncFromStorage();
    // Stay in sync if another tab updates wishlist
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, [syncFromStorage]);

  /* Remove course from wishlist */
  const removeFromWishlist = (courseId) => {
    const updated = items.filter(c => c.id !== courseId);
    setItems(updated);
    localStorage.setItem("lms_wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    toast("Removed from wishlist", { icon: "💔" });
  };

  /* Move course to cart */
  const addToCart = (course) => {
    const cartItems = readCart();
    const alreadyIn = cartItems.some(item => item.id === course.id);
    if (alreadyIn) {
      toast(`"${course.title}" is already in your cart!`, { icon: "🛒" });
      return;
    }
    const updated = [...cartItems, { ...course, quantity: 1 }];
    localStorage.setItem("lms_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    toast.success(`Added "${course.title}" to cart!`);
  };

  /* Move to cart then remove from wishlist */
  const moveToCart = (course) => {
    addToCart(course);
    const updatedWishlist = items.filter(c => c.id !== course.id);
    setItems(updatedWishlist);
    localStorage.setItem("lms_wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("storage"));
  };

  /* ── Empty state ── */
  if (!loading && items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center"
      >
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Heart size={44} className="text-red-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6 max-w-sm leading-relaxed">
          Browse our courses and click the <span className="text-red-500">❤️</span> heart icon on any course to save it here.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-600 text-white px-7 py-2.5 rounded-xl hover:bg-orange-700 transition font-semibold shadow-sm"
        >
          Browse Courses
        </button>
      </motion.div>
    );
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600" />
      </div>
    );
  }

  /* ── Main ── */
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="text-red-500 fill-red-500" size={24} />
            My Wishlist
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {items.length} saved course{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-orange-600 hover:underline font-medium flex items-center gap-1"
        >
          <BookOpen size={14} /> Browse More
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {items.map((course, idx) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-40 overflow-hidden bg-gray-100">
                <img
                  src={course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Tag */}
                {course.tag && (
                  <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {course.tag}
                  </span>
                )}
                {/* Remove heart button */}
                <button
                  onClick={() => removeFromWishlist(course.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition group"
                  title="Remove from wishlist"
                >
                  <Heart size={15} className="fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 flex-1 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-400 mb-3">by {course.instructor}</p>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  {course.rating && (
                    <span className="flex items-center gap-0.5 font-medium text-yellow-600">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </span>
                  )}
                  {course.students && (
                    <span className="flex items-center gap-0.5">
                      <Users size={11} />
                      {course.students.toLocaleString()}
                    </span>
                  )}
                  {course.duration && (
                    <span className="flex items-center gap-0.5">
                      <Clock size={11} />
                      {course.duration}
                    </span>
                  )}
                  {course.level && (
                    <span className="flex items-center gap-0.5">
                      <TrendingUp size={11} />
                      {course.level}
                    </span>
                  )}
                </div>

                {/* Price + Actions */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="text-lg font-bold text-orange-600">
                    ₹{course.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromWishlist(course.id)}
                      className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      onClick={() => moveToCart(course)}
                      className="flex items-center gap-1.5 bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-orange-700 transition shadow-sm"
                    >
                      <ShoppingCart size={13} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Wishlist;