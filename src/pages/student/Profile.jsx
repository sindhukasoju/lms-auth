// src/pages/student/Profile.jsx
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="space-y-3">
          <p>
            <strong>Name:</strong> {user?.name || user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "N/A"}
          </p>
          <p><strong>Email:</strong> {user?.email || "N/A"}</p>
          <p><strong>Role:</strong> {user?.role || "Student"}</p>
          {/* Add edit form if needed */}
        </div>
      </div>
    </div>
  );
};

export default Profile;