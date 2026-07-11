// src/pages/MyProfile.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, UserCircle, ArrowLeft, Save, Edit2 } from "lucide-react";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setFormData({
          name: parsed.name || parsed.firstName || "",
          email: parsed.email || "",
          role: parsed.role || "student",
        });
      } catch (e) {
        console.error("Error parsing user", e);
        setMessage({ type: "error", text: "Failed to load profile data." });
      }
    } else {
      setMessage({ type: "error", text: "You are not logged in." });
      setTimeout(() => navigate("/login"), 2000);
    }
    setLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Name cannot be empty." });
      return;
    }
    const updatedUser = {
      ...user,
      name: formData.name.trim(),
      firstName: formData.name.trim(),
    };
    localStorage.setItem("lms_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event("userLoggedIn"));
    setMessage({ type: "success", text: "Profile updated successfully!" });
    setEditing(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const getInitials = () => {
    if (!user) return "U";
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">You are not logged in.</p>
          <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/student/dashboard"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white shadow-lg">
              <span className="text-4xl font-bold text-white">{getInitials()}</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{user.name || "User"}</h2>
            <p className="text-white/80 text-sm capitalize">{user.role || "Student"}</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your full name"
                  />
                ) : (
                  <span className="text-gray-800 font-medium">{user.name || "Not set"}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-800">{user.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-800 capitalize">{user.role || "Student"}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
              {editing ? (
                <>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData({ name: user.name || "", email: user.email || "", role: user.role || "student" });
                      setMessage(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;