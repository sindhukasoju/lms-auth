// src/pages/student/SavedCourses.jsx
import { useAuth } from "../../context/AuthContext";

const SavedCourses = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">Saved Courses</h1>
        <p className="text-gray-600">Courses you have saved for later.</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-gray-500 text-sm">
          No saved courses. Explore and save your favorites!
        </div>
      </div>
    </div>
  );
};
export default SavedCourses;