// src/pages/MyOrders.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Get logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user", e);
      }
    }
  }, []);

  // Load orders from localStorage
  useEffect(() => {
    const loadOrders = () => {
      const storedOrders = localStorage.getItem("lms_orders");
      if (storedOrders) {
        try {
          const allOrders = JSON.parse(storedOrders);
          // Filter orders by logged-in user ID (or email)
          const filtered = user
            ? allOrders.filter((order) => order.userId === user.id || order.userEmail === user.email)
            : allOrders;
          // Sort by newest first
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(filtered);
        } catch (e) {
          console.error("Error parsing orders", e);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
      setLoading(false);
    };

    // Wait for user to be loaded
    if (user !== null) {
      loadOrders();
    } else {
      // If no user, still load orders (but might show all)
      loadOrders();
    }
  }, [user]);

  // Listen for storage changes (e.g., new order placed in another tab)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "lms_orders") {
        setLoading(true);
        const storedOrders = localStorage.getItem("lms_orders");
        if (storedOrders) {
          try {
            const allOrders = JSON.parse(storedOrders);
            const filtered = user
              ? allOrders.filter((order) => order.userId === user.id || order.userEmail === user.email)
              : allOrders;
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(filtered);
          } catch (e) {
            console.error("Error parsing orders", e);
            setOrders([]);
          }
        } else {
          setOrders([]);
        }
        setLoading(false);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user]);

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">
              View all your purchased courses
            </p>
          </div>
          <Link
            to="/student/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-500 mb-6">
              You haven't purchased any courses yet.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden"
              >
                <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-orange-600" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.items?.length || 0} course(s) in this order
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status || "Pending"}
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Purchase Date</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-semibold text-gray-900">
                        ₹{(order.totalAmount || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start md:justify-end">
                    <Link
                      to="/student/my-learning"
                      className="px-5 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition flex items-center gap-1"
                    >
                      Start Learning <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* List of items */}
                <div className="px-6 pb-6 border-t pt-4">
                  <p className="font-medium text-gray-700 mb-2">Courses:</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items?.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                      >
                        {item.title} (x{item.quantity || 1})
                      </span>
                    ))}
                  </div>
                  {order.address && (
                    <p className="text-sm text-gray-500 mt-3">
                      📍 {order.address}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;