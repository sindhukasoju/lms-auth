// src/pages/admin/Instructors.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { adminApi } from "../../api/adminApi";
import axiosInstance from "../../api/axiosInstance";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all instructors
  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getInstructors();
      setInstructors(data.instructors || data.data || data);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // ✅ Approve instructor
  const handleApprove = async (instructorId) => {
    if (!window.confirm("Approve this instructor?")) return;
    try {
      await adminApi.approveInstructor(instructorId);
      setInstructors((prev) =>
        prev.map((inst) =>
          inst.id === instructorId ? { ...inst, status: "approved", applicationStatus: "approved" } : inst
        )
      );
      toast.success("Instructor approved");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Approval failed");
    }
  };

  // ❌ Reject instructor
  const handleReject = async (instructorId) => {
    if (!window.confirm("Reject this instructor?")) return;
    try {
      await adminApi.rejectInstructor(instructorId);
      setInstructors((prev) =>
        prev.map((inst) =>
          inst.id === instructorId ? { ...inst, status: "rejected", applicationStatus: "rejected" } : inst
        )
      );
      toast.success("Instructor rejected");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Rejection failed");
    }
  };

  // 🗑️ Delete instructor (permanently)
  const handleDelete = async (instructorId) => {
    if (!window.confirm("Permanently delete this instructor? This action cannot be undone.")) return;
    try {
      // Assuming a delete endpoint exists, we can use axiosInstance if not in adminApi
      await axiosInstance.delete(`/admin/instructors/applications/${instructorId}`);
      setInstructors((prev) => prev.filter((inst) => inst.id !== instructorId));
      toast.success("Instructor deleted permanently");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Deletion failed");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading instructors...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold">Instructor Management</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {instructors.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">
                    {instructor.name || instructor.user?.name || instructor.User?.name || instructor.user?.firstName || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {instructor.email || instructor.user?.email || instructor.User?.email || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      (instructor.status || instructor.applicationStatus || "").toLowerCase() === "approved" ? "bg-green-100 text-green-700" :
                      (instructor.status || instructor.applicationStatus || "").toLowerCase() === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {instructor.status || instructor.applicationStatus || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {instructor.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(instructor.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition"
                        title="Approve"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    {instructor.status !== "rejected" && (
                      <button
                        onClick={() => handleReject(instructor.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                        title="Reject"
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(instructor.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded transition"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Instructors;