// src/pages/Wishlist.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

// ---------- Sample courses (same as used in MyLearning) ----------
const sampleCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
    price: 49,
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
    price: 79,
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
    price: 39,
  },
  {
    id: 4,
    title: "Cloud Computing with AWS",
    category: "IT & Software",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    price: 69,
  },
  {
    id: 5,
    title: "Python PCEP Certification",
    category: "Development",
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=500",
    price: 49,
  },
  {
    id: 6,
    title: "React Native Mobile Apps",
    category: "Development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
    price: 59,
  },
];

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [message, setMessage] = useState(null); // for toast notification

  // ---------- Load wishlist from localStorage ----------
  useEffect(() => {
    const saved = localStorage.getItem("lms_wishlist");
    if (saved) {
      try {
        setWishlistIds(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing wishlist", e);
      }
    } else {
      // initial empty wishlist – can also seed with demo IDs
      setWishlistIds([]);
    }
  }, []);

  // ---------- Save wishlist to localStorage whenever it changes ----------
  useEffect(() => {
    localStorage.setItem("lms_wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // ---------- Toggle wishlist ----------
  const toggleWishlist = (courseId) => {
    setWishlistIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // ---------- Add to cart (and remove from wishlist) ----------
  const moveToCart = (course) => {
    // 1. Check if already in cart
    const cart = JSON.parse(localStorage.getItem("lms_cart") || "[]");
    const alreadyInCart = cart.some((item) => item.id === course.id);

    if (!alreadyInCart) {
      // Add to cart with quantity 1
      cart.push({ ...course, quantity: 1 });
      localStorage.setItem("lms_cart", JSON.stringify(cart));
      // Dispatch event so Navbar updates cart count
      window.dispatchEvent(new Event("cartUpdated"));
      setMessage(`✅ Added "${course.title}" to cart!`);
    } else {
      setMessage(`⚠️ "${course.title}" is already in your cart.`);
    }

    // 2. Remove from wishlist
    if (wishlistIds.includes(course.id)) {
      toggleWishlist(course.id);
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  // Filter courses that are in wishlist
  const wishlistCourses = sampleCourses.filter((course) =>
    wishlistIds.includes(course.id)
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Header with Back button */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/student/dashboard"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            My <span className="text-black">Wishlist</span>
          </h1>
        </div>
        <p className="text-gray-600 mb-10">
          Courses you've saved for later. Add them to your cart when you're ready to start learning.
        </p>

        {/* Toast message */}
        {message && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center text-blue-700">
            {message}
          </div>
        )}

        {wishlistCourses.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg py-20 px-6 text-center">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Start adding courses to your wishlist to keep track of what you want to learn.
            </p>
            <Link
              to="/courses"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {course.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-neutral-900">
                      ₹{course.price}
                    </span>
                    <div className="flex gap-2">
                      {/* Remove from wishlist */}
                      <button
                        onClick={() => toggleWishlist(course.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
                      >
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      </button>
                      {/* Move to cart */}
                      <button
                        onClick={() => moveToCart(course)}
                        className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition"
                      >
                        <ShoppingCart className="w-5 h-5 text-neutral-900" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;