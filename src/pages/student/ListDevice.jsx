// src/pages/ListDevice.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

// ---------- API configuration ----------
const API_BASE = "https://matted-ascent-specimen.ngrok-free.dev/auth/sessions";

const ListDevice = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  // ---------- Helper: get token ----------
  const getToken = () => localStorage.getItem("lms_token");

  // ---------- Fetch devices ----------
  const fetchDevices = async () => {
    const token = getToken();
    if (!token) {
      setError("You are not logged in. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDevices(response.data.data || []);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to fetch devices";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Logout a specific device ----------
  const logoutDevice = async (id) => {
    const token = getToken();
    if (!token) {
      alert("You are not logged in. Please log in again.");
      return;
    }

    try {
      setActionLoading(id);
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDevices((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to logout device";
      alert(message);
    } finally {
      setActionLoading(null);
    }
  };

  // ---------- Fetch on mount ----------
  useEffect(() => {
    fetchDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Format date ----------
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
        
        {/* Back button + title */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/student/dashboard"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Active Devices</h2>
        </div>

        {loading && (
          <p className="text-center text-gray-600">Loading devices...</p>
        )}

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {!loading && devices.length === 0 && !error && (
          <div className="text-center text-gray-500 py-10">
            No active sessions found.
          </div>
        )}

        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm"
            >
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {device.deviceInfo || "Unknown Device"}
                </p>
                <p className="text-sm text-gray-600 mt-1">{device.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Login: {formatDate(device.loginTime)}
                </p>
              </div>
              <button
                onClick={() => logoutDevice(device.id)}
                disabled={actionLoading === device.id}
                className="mt-4 md:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {actionLoading === device.id ? "Logging out..." : "Logout"}
              </button>
            </div>
          ))}
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchDevices}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Refreshing..." : "Refresh Devices"}
        </button>
      </div>
    </div>
  );
};

export default ListDevice;