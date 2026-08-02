// src/pages/admin/OrderDetails.jsx — fully mock, no real API calls
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";

const DEFAULT_ORDERS = {
  ORD001: {
    id: "ORD001", status: "completed", totalAmount: 49, paymentMethod: "Credit Card",
    createdAt: "2025-05-18T10:00:00Z", updatedAt: "2025-05-18T10:05:00Z",
    userName: "Alice Johnson", userEmail: "alice@example.com", userPhone: "+1 555-0101",
    shippingAddress: "123 Main St", shippingCity: "New York", shippingPostalCode: "10001", shippingCountry: "USA",
    items: [{ title: "Complete React Masterclass", price: 49, quantity: 1 }]
  },
  ORD002: {
    id: "ORD002", status: "pending", totalAmount: 79, paymentMethod: "PayPal",
    createdAt: "2025-05-17T14:00:00Z", updatedAt: "2025-05-17T14:00:00Z",
    userName: "Bob Martinez", userEmail: "bob@example.com", userPhone: "+1 555-0202",
    shippingAddress: "456 Oak Ave", shippingCity: "Los Angeles", shippingPostalCode: "90001", shippingCountry: "USA",
    items: [{ title: "Python for Data Science", price: 79, quantity: 1 }]
  },
  ORD003: {
    id: "ORD003", status: "cancelled", totalAmount: 39, paymentMethod: "Debit Card",
    createdAt: "2025-05-16T09:00:00Z", updatedAt: "2025-05-16T10:00:00Z",
    userName: "Carol White", userEmail: "carol@example.com", userPhone: "+1 555-0303",
    shippingAddress: "789 Pine Rd", shippingCity: "Chicago", shippingPostalCode: "60601", shippingCountry: "USA",
    items: [{ title: "UI/UX Design Fundamentals", price: 39, quantity: 1 }]
  },
  ORD004: {
    id: "ORD004", status: "completed", totalAmount: 88, paymentMethod: "Credit Card",
    createdAt: "2025-05-15T11:00:00Z", updatedAt: "2025-05-15T11:10:00Z",
    userName: "Frank Brown", userEmail: "frank@example.com", userPhone: "+1 555-0404",
    shippingAddress: "321 Elm St", shippingCity: "Houston", shippingPostalCode: "77001", shippingCountry: "USA",
    items: [
      { title: "Complete React Masterclass", price: 49, quantity: 1 },
      { title: "UI/UX Design Fundamentals", price: 39, quantity: 1 }
    ]
  },
  ORD005: {
    id: "ORD005", status: "processing", totalAmount: 59, paymentMethod: "UPI",
    createdAt: "2025-05-14T16:00:00Z", updatedAt: "2025-05-14T16:00:00Z",
    userName: "Grace Kim", userEmail: "grace@example.com", userPhone: "+1 555-0505",
    shippingAddress: "654 Maple Dr", shippingCity: "Phoenix", shippingPostalCode: "85001", shippingCountry: "USA",
    items: [{ title: "Node.js Backend Development", price: 59, quantity: 1 }]
  },
  ORD006: {
    id: "ORD006", status: "completed", totalAmount: 29, paymentMethod: "Credit Card",
    createdAt: "2025-05-13T13:00:00Z", updatedAt: "2025-05-13T13:05:00Z",
    userName: "Alice Johnson", userEmail: "alice@example.com", userPhone: "+1 555-0101",
    shippingAddress: "123 Main St", shippingCity: "New York", shippingPostalCode: "10001", shippingCountry: "USA",
    items: [{ title: "Digital Marketing Mastery", price: 29, quantity: 1 }]
  },
  ORD007: {
    id: "ORD007", status: "refunded", totalAmount: 69, paymentMethod: "PayPal",
    createdAt: "2025-05-10T08:00:00Z", updatedAt: "2025-05-12T09:00:00Z",
    userName: "Henry Davis", userEmail: "henry@example.com", userPhone: "+1 555-0606",
    shippingAddress: "987 Cedar Ln", shippingCity: "Philadelphia", shippingPostalCode: "19101", shippingCountry: "USA",
    items: [{ title: "Cybersecurity Foundations", price: 69, quantity: 1 }]
  },
  ORD008: {
    id: "ORD008", status: "completed", totalAmount: 49, paymentMethod: "Credit Card",
    createdAt: "2025-05-08T10:00:00Z", updatedAt: "2025-05-08T10:05:00Z",
    userName: "Bob Martinez", userEmail: "bob@example.com", userPhone: "+1 555-0202",
    shippingAddress: "456 Oak Ave", shippingCity: "Los Angeles", shippingPostalCode: "90001", shippingCountry: "USA",
    items: [{ title: "Complete React Masterclass", price: 49, quantity: 1 }]
  },
};

const statusColor = (status) => {
  switch (status) {
    case "completed":  return "bg-green-100 text-green-700";
    case "pending":    return "bg-yellow-100 text-yellow-700";
    case "cancelled":  return "bg-red-100 text-red-700";
    case "refunded":   return "bg-purple-100 text-purple-700";
    case "processing": return "bg-blue-100 text-blue-700";
    default:           return "bg-gray-100 text-gray-700";
  }
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate    = useNavigate();
  const [order, setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setOrder(DEFAULT_ORDERS[orderId] || null);
      setLoading(false);
    }, 400);
  };

  useEffect(() => { fetchOrder(); }, [orderId]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Order <strong>{orderId}</strong> not found.</p>
        <button onClick={() => navigate("/admin/orders")} className="text-purple-600 hover:underline">← Back to Orders</button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/admin/orders")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm">
          <ArrowLeft size={18} /> Back to Orders
        </button>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <button onClick={fetchOrder} className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Order Information</h2>
          <div className="space-y-3 text-sm">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p className="flex items-center gap-2">
              <strong>Status:</strong>
              <span className={`px-2 py-1 text-xs rounded-full ${statusColor(order.status)}`}>{order.status}</span>
            </p>
            <p><strong>Total Amount:</strong> <span className="text-lg font-bold text-purple-700">${order.totalAmount}</span></p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                {order.userName[0]}
              </div>
              <div>
                <p className="font-semibold">{order.userName}</p>
                <p className="text-gray-500">{order.userEmail}</p>
              </div>
            </div>
            <p><strong>Phone:</strong> {order.userPhone}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{order.shippingAddress}</p>
            <p>{order.shippingCity}, {order.shippingPostalCode}</p>
            <p>{order.shippingCountry}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-sm border p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-sm font-medium">{item.title}</td>
                    <td className="px-4 py-3 text-sm">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm">${item.price}</td>
                    <td className="px-4 py-3 text-sm font-semibold">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-sm font-bold text-right">Total:</td>
                  <td className="px-4 py-3 text-sm font-bold text-purple-700">${order.totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;