// src/pages/admin/Orders.jsx — fully mock, no real API calls
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DEFAULT_ORDERS = [
  { id: "ORD001", userEmail: "alice@example.com",   totalAmount: 49,  status: "completed",  paymentMethod: "Credit Card", createdAt: "2025-05-18T10:00:00Z" },
  { id: "ORD002", userEmail: "bob@example.com",     totalAmount: 79,  status: "pending",    paymentMethod: "PayPal",      createdAt: "2025-05-17T14:00:00Z" },
  { id: "ORD003", userEmail: "carol@example.com",   totalAmount: 39,  status: "cancelled",  paymentMethod: "Debit Card",  createdAt: "2025-05-16T09:00:00Z" },
  { id: "ORD004", userEmail: "frank@example.com",   totalAmount: 88,  status: "completed",  paymentMethod: "Credit Card", createdAt: "2025-05-15T11:00:00Z" },
  { id: "ORD005", userEmail: "grace@example.com",   totalAmount: 59,  status: "processing", paymentMethod: "UPI",         createdAt: "2025-05-14T16:00:00Z" },
  { id: "ORD006", userEmail: "alice@example.com",   totalAmount: 29,  status: "completed",  paymentMethod: "Credit Card", createdAt: "2025-05-13T13:00:00Z" },
  { id: "ORD007", userEmail: "henry@example.com",   totalAmount: 69,  status: "refunded",   paymentMethod: "PayPal",      createdAt: "2025-05-10T08:00:00Z" },
  { id: "ORD008", userEmail: "bob@example.com",     totalAmount: 49,  status: "completed",  paymentMethod: "Credit Card", createdAt: "2025-05-08T10:00:00Z" },
];

const getOrders = () => {
  try {
    const stored = localStorage.getItem("admin_mock_orders");
    return stored ? JSON.parse(stored) : DEFAULT_ORDERS;
  } catch { return DEFAULT_ORDERS; }
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

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");

  const fetchOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders(getOrders());
      setLoading(false);
    }, 400);
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 border rounded-lg w-64 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-purple-700">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.userEmail}</td>
                  <td className="px-6 py-4 text-sm font-semibold">${order.totalAmount}</td>
                  <td className="px-6 py-4 text-sm">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="p-1 text-gray-400 hover:text-blue-600"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-400">No orders found.</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Orders;