// src/pages/admin/Instructors.jsx — fully mock, no real API calls
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_INSTRUCTORS = [
  { id: "i1", name: "David Lee",    email: "david@example.com",  status: "approved", applicationStatus: "approved", expertise: "Web Development",  appliedAt: "2025-01-05" },
  { id: "i2", name: "Eva Green",    email: "eva@example.com",    status: "approved", applicationStatus: "approved", expertise: "UI/UX Design",      appliedAt: "2025-02-01" },
  { id: "i3", name: "Irene Wilson", email: "irene@example.com",  status: "approved", applicationStatus: "approved", expertise: "Backend Dev",       appliedAt: "2025-01-18" },
  { id: "i4", name: "James Taylor", email: "james@example.com",  status: "pending",  applicationStatus: "pending",  expertise: "Machine Learning",  appliedAt: "2025-04-20" },
  { id: "i5", name: "Karen Smith",  email: "karen@example.com",  status: "pending",  applicationStatus: "pending",  expertise: "Business Strategy", appliedAt: "2025-04-25" },
];

const getInstructors = () => {
  try {
    const stored = localStorage.getItem("admin_mock_instructors");
    return stored ? JSON.parse(stored) : DEFAULT_INSTRUCTORS;
  } catch { return DEFAULT_INSTRUCTORS; }
};
const saveInstructors = (data) =>
  localStorage.setItem("admin_mock_instructors", JSON.stringify(data));

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setInstructors(getInstructors());
      setLoading(false);
    }, 500);
  }, []);

  const handleApprove = (id) => {
    const updated = instructors.map((i) =>
      i.id === id ? { ...i, status: "approved", applicationStatus: "approved" } : i
    );
    setInstructors(updated);
    saveInstructors(updated);
    toast.success("Instructor approved");
  };

  const handleReject = (id) => {
    const updated = instructors.map((i) =>
      i.id === id ? { ...i, status: "rejected", applicationStatus: "rejected" } : i
    );
    setInstructors(updated);
    saveInstructors(updated);
    toast.success("Instructor rejected");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Permanently delete this instructor?")) return;
    const updated = instructors.filter((i) => i.id !== id);
    setInstructors(updated);
    saveInstructors(updated);
    toast.success("Instructor deleted");
  };

  const filtered = instructors.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase())
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
        <h1 className="text-2xl font-bold">Instructor Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search instructors..."
            className="pl-9 pr-4 py-2 border rounded-lg w-64 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expertise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{instructor.name}</td>
                  <td className="px-6 py-4 text-sm">{instructor.email}</td>
                  <td className="px-6 py-4 text-sm">{instructor.expertise}</td>
                  <td className="px-6 py-4 text-sm">{instructor.appliedAt}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      instructor.status === "approved" ? "bg-green-100 text-green-700" :
                      instructor.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {instructor.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    {instructor.status !== "approved" && (
                      <button onClick={() => handleApprove(instructor.id)} className="p-1 text-green-600 hover:bg-green-50 rounded" title="Approve">
                        <CheckCircle size={16} />
                      </button>
                    )}
                    {instructor.status !== "rejected" && (
                      <button onClick={() => handleReject(instructor.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject">
                        <XCircle size={16} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(instructor.id)} className="p-1 text-gray-400 hover:text-red-600 rounded" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-400">No instructors found.</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Instructors;