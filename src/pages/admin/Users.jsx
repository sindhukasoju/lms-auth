// src/pages/admin/Users.jsx — fully mock, no real API calls
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Trash2, Ban, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_USERS = [
  { id: "u1",  name: "Alice Johnson",  email: "alice@example.com",      role: "student",    status: "active",  createdAt: "2025-01-15" },
  { id: "u2",  name: "Bob Martinez",   email: "bob@example.com",        role: "student",    status: "active",  createdAt: "2025-02-10" },
  { id: "u3",  name: "Carol White",    email: "carol@example.com",      role: "student",    status: "blocked", createdAt: "2025-02-20" },
  { id: "u4",  name: "David Lee",      email: "david@example.com",      role: "instructor", status: "active",  createdAt: "2025-01-05" },
  { id: "u5",  name: "Eva Green",      email: "eva@example.com",        role: "instructor", status: "active",  createdAt: "2025-03-01" },
  { id: "u6",  name: "Frank Brown",    email: "frank@example.com",      role: "student",    status: "active",  createdAt: "2025-03-15" },
  { id: "u7",  name: "Grace Kim",      email: "grace@example.com",      role: "student",    status: "active",  createdAt: "2025-04-01" },
  { id: "u8",  name: "Henry Davis",    email: "henry@example.com",      role: "student",    status: "blocked", createdAt: "2025-04-10" },
  { id: "u9",  name: "Irene Wilson",   email: "irene@example.com",      role: "instructor", status: "active",  createdAt: "2025-01-20" },
  { id: "u10", name: "Admin User",     email: "admin@demo.com",         role: "admin",      status: "active",  createdAt: "2024-12-01" },
];

const getUsers = () => {
  try {
    const stored = localStorage.getItem("admin_mock_users");
    return stored ? JSON.parse(stored) : DEFAULT_USERS;
  } catch { return DEFAULT_USERS; }
};
const saveUsers = (data) =>
  localStorage.setItem("admin_mock_users", JSON.stringify(data));

const Users = () => {
  const [users, setUsers]           = useState([]);
  const [search, setSearch]         = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal]   = useState(false);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers(getUsers());
      setLoading(false);
    }, 500);
  }, []);

  const handleDelete = (userId) => {
    if (!window.confirm("Permanently delete this user?")) return;
    const updated = users.filter((u) => u.id !== userId);
    setUsers(updated);
    saveUsers(updated);
    toast.success("User deleted successfully");
  };

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const updated = users.map((u) =>
      u.id === userId ? { ...u, status: newStatus } : u
    );
    setUsers(updated);
    saveUsers(updated);
    toast.success(`User ${newStatus === "active" ? "activated" : "blocked"} successfully`);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
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
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-9 pr-4 py-2 border rounded-lg w-64 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                <td className="px-6 py-4 text-sm">{user.email}</td>
                <td className="px-6 py-4 text-sm capitalize">{user.role}</td>
                <td className="px-6 py-4 text-sm">{user.createdAt}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  <button onClick={() => handleView(user)} className="p-1 text-gray-400 hover:text-blue-600" title="View">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => handleStatusToggle(user.id, user.status)} className="p-1 text-gray-400 hover:text-orange-600" title={user.status === "active" ? "Block" : "Activate"}>
                    {user.status === "active" ? <Ban size={16} /> : <CheckCircle size={16} />}
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-400">No users found.</div>
        )}
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Details</h2>
                <button onClick={() => setShowModal(false)}><X size={20} /></button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                    {selectedUser.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedUser.name}</p>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
                <p><strong>Role:</strong> <span className="capitalize">{selectedUser.role}</span></p>
                <p><strong>Status:</strong> <span className={selectedUser.status === "active" ? "text-green-600" : "text-red-600"}>{selectedUser.status}</span></p>
                <p><strong>Joined:</strong> {selectedUser.createdAt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Users;