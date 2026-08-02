// src/pages/admin/Courses.jsx — fully mock, no API calls
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, CheckCircle, XCircle, Trash2, FileText, Search } from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_COURSES = [
  { id: "c1", title: "Complete React Masterclass", instructorName: "David Lee", price: 49, status: "approved", category: "Development", enrolled: 1240, createdAt: "2025-01-20" },
  { id: "c2", title: "UI/UX Design Fundamentals",  instructorName: "Eva Green",  price: 39, status: "approved", category: "Design",       enrolled: 875,  createdAt: "2025-02-05" },
  { id: "c3", title: "Node.js Backend Development", instructorName: "Irene Wilson", price: 59, status: "pending", category: "Development", enrolled: 560, createdAt: "2025-03-10" },
  { id: "c4", title: "Digital Marketing Mastery",   instructorName: "David Lee",   price: 29, status: "approved", category: "Marketing",   enrolled: 2100, createdAt: "2025-03-25" },
  { id: "c5", title: "Python for Data Science",     instructorName: "Eva Green",   price: 79, status: "rejected", category: "Data Science", enrolled: 3400, createdAt: "2025-04-01" },
  { id: "c6", title: "Cybersecurity Foundations",   instructorName: "Irene Wilson", price: 69, status: "pending", category: "Security",    enrolled: 430,  createdAt: "2025-04-15" },
];

const getCoursesFromStore = () => {
  try {
    const stored = localStorage.getItem("admin_mock_courses");
    return stored ? JSON.parse(stored) : DEFAULT_COURSES;
  } catch { return DEFAULT_COURSES; }
};
const saveCoursesToStore = (courses) =>
  localStorage.setItem("admin_mock_courses", JSON.stringify(courses));

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCourses(getCoursesFromStore());
      setLoading(false);
    }, 500);
  }, []);

  const handleApprove = (id) => {
    const updated = courses.map((c) =>
      c.id === id ? { ...c, status: "approved" } : c
    );
    setCourses(updated);
    saveCoursesToStore(updated);
    toast.success("Course approved successfully");
  };

  const handleReject = (id) => {
    const updated = courses.map((c) =>
      c.id === id ? { ...c, status: "rejected" } : c
    );
    setCourses(updated);
    saveCoursesToStore(updated);
    toast.success("Course rejected");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this course permanently?")) return;
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    saveCoursesToStore(updated);
    toast.success("Course deleted");
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase())
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
        <h1 className="text-2xl font-bold">Course Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrolled</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium max-w-[180px] truncate">{course.title}</td>
                <td className="px-6 py-4 text-sm">{course.instructorName}</td>
                <td className="px-6 py-4 text-sm">{course.category}</td>
                <td className="px-6 py-4 text-sm">${course.price}</td>
                <td className="px-6 py-4 text-sm">{course.enrolled.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.status === "approved" ? "bg-green-100 text-green-700" :
                    course.status === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {course.status || "pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  {course.status !== "approved" && (
                    <button onClick={() => handleApprove(course.id)} className="p-1 text-green-600 hover:bg-green-50 rounded" title="Approve">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  {course.status !== "rejected" && (
                    <button onClick={() => handleReject(course.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject">
                      <XCircle size={16} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(course.id)} className="p-1 text-gray-400 hover:text-red-600 rounded" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCourses.length === 0 && (
          <div className="p-8 text-center text-gray-400">No courses found.</div>
        )}
      </div>
    </motion.div>
  );
};

export default Courses;