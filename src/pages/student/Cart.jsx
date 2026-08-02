// src/pages/student/Cart.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingCart, ArrowRight, Heart, Tag, Star, Clock } from "lucide-react";
import toast from "react-hot-toast";

/* ─── helpers ─────────────────────────────────────────────── */
const readCart = () => {
  try {
    const raw = localStorage.getItem("lms_cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* ─── component ───────────────────────────────────────────── */
const Cart = () => {
  const navigate  = useNavigate();
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  const syncFromStorage = useCallback(() => {
    setItems(readCart());
    setLoading(false);
  }, []);

  useEffect(() => {
    syncFromStorage();
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, [syncFromStorage]);

  /* Save & broadcast */
  const persistCart = (newItems) => {
    setItems(newItems);
    localStorage.setItem("lms_cart", JSON.stringify(newItems));
    window.dispatchEvent(new Event("storage"));
  };

  /* Remove item */
  const removeItem = (id, title) => {
    persistCart(items.filter(item => item.id !== id));
    toast(`"${title}" removed from cart`, { icon: "🗑️" });
  };

  /* Move to wishlist */
  const moveToWishlist = (course) => {
    try {
      const raw     = localStorage.getItem("lms_wishlist");
      const wl      = raw ? JSON.parse(raw) : [];
      const already = Array.isArray(wl) && wl.some(c => c?.id === course.id);
      if (!already) {
        const updated = [...(Array.isArray(wl) ? wl : []), course];
        localStorage.setItem("lms_wishlist", JSON.stringify(updated));
      }
      // Remove from cart
      persistCart(items.filter(item => item.id !== course.id));
      toast.success(`Moved "${course.title}" to wishlist!`);
    } catch {
      toast.error("Could not move to wishlist.");
    }
  };

  /* Totals */
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const discount = items.length >= 2 ? Math.round(subtotal * 0.1) : 0;   // 10% off for 2+ courses
  const total    = subtotal - discount;

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600" />
      </div>
    );
  }

  /* ── Empty ── */
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center"
      >
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <ShoppingCart size={44} className="text-orange-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6 max-w-sm leading-relaxed">
          Browse our courses and click <strong>"Add to Cart"</strong> to start learning today.
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

  /* ── Main ── */
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={24} className="text-orange-600" />
            My Cart
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {items.length} course{items.length !== 1 ? "s" : ""} in cart
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-orange-600 hover:underline font-medium"
        >
          + Add More Courses
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Cart Items ── */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4"
              >
                {/* Thumbnail */}
                <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300"; }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">by {item.instructor}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    {item.rating && (
                      <span className="flex items-center gap-0.5 text-yellow-600 font-medium">
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                    )}
                    {item.duration && (
                      <span className="flex items-center gap-0.5">
                        <Clock size={10} /> {item.duration}
                      </span>
                    )}
                    {item.level && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full">{item.level}</span>
                    )}
                  </div>
                </div>

                {/* Price + Actions */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={() => moveToWishlist(item)}
                      className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                      title="Move to Wishlist"
                    >
                      <Heart size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id, item.title)}
                      className="p-1.5 text-gray-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Order Summary ── */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tag size={18} className="text-orange-600" />
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} course{items.length > 1 ? "s" : ""})</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag size={12} /> Bundle Discount (10%)
                  </span>
                  <span>- ₹{discount}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span className="text-orange-600">₹{total}</span>
              </div>
            </div>

            {/* Bundle savings note */}
            {items.length === 1 && (
              <p className="text-xs text-gray-400 mt-3 bg-gray-50 rounded-lg p-2 text-center">
                💡 Add 1 more course to get <strong>10% off</strong>!
              </p>
            )}
            {discount > 0 && (
              <p className="text-xs text-green-600 mt-3 bg-green-50 rounded-lg p-2 text-center font-medium">
                🎉 You're saving ₹{discount} with the bundle discount!
              </p>
            )}

            <button
              onClick={() => {
                // Store order summary for checkout
                localStorage.setItem("lms_checkout", JSON.stringify({ items, subtotal, discount, total }));
                navigate("/checkout");
              }}
              className="mt-5 w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition flex items-center justify-center gap-2 font-semibold shadow-sm"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate("/")}
              className="mt-2 w-full text-gray-500 py-2 rounded-xl hover:bg-gray-50 transition text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;