// src/pages/admin/Settings.jsx — fully mock, no real API calls
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const DEFAULTS = {
  platform: { siteName: "LearnMaster LMS", maintenanceMode: false, maxUsers: 50000 },
  payment:  { paymentGateway: "Stripe", currency: "INR", taxPercentage: 18 },
  notif:    { emailEnabled: true, smsEnabled: false, pushNotifications: true },
};

const load  = (key, def) => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; } };
const save  = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const Settings = () => {
  const [activeTab, setActiveTab] = useState("platform");

  // Platform
  const [platformSettings,  setPlatformSettings]  = useState(() => load("s_platform", DEFAULTS.platform));
  const [platformLoading,   setPlatformLoading]    = useState(false);
  const [platformSaving,    setPlatformSaving]     = useState(false);
  const [platformError,     setPlatformError]      = useState("");
  const [platformSuccess,   setPlatformSuccess]    = useState("");

  // Payment
  const [paymentSettings,   setPaymentSettings]    = useState(() => load("s_payment", DEFAULTS.payment));
  const [paymentLoading,    setPaymentLoading]     = useState(false);
  const [paymentSaving,     setPaymentSaving]      = useState(false);
  const [paymentError,      setPaymentError]       = useState("");
  const [paymentSuccess,    setPaymentSuccess]     = useState("");

  // Notifications
  const [notifications,     setNotifications]      = useState(() => load("s_notif", DEFAULTS.notif));
  const [notifLoading,      setNotifLoading]       = useState(false);
  const [notifSaving,       setNotifSaving]        = useState(false);
  const [notifError,        setNotifError]         = useState("");
  const [notifSuccess,      setNotifSuccess]       = useState("");

  // Simulate initial load delays
  useEffect(() => {
    setPlatformLoading(true);
    setTimeout(() => {
      setPlatformSettings(load("s_platform", DEFAULTS.platform));
      setPlatformLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentSettings(load("s_payment", DEFAULTS.payment));
      setPaymentLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setNotifLoading(true);
    setTimeout(() => {
      setNotifications(load("s_notif", DEFAULTS.notif));
      setNotifLoading(false);
    }, 600);
  }, []);

  // Save handlers
  const handleSavePlatform = async () => {
    setPlatformSaving(true);
    setPlatformError("");
    setPlatformSuccess("");
    await new Promise((r) => setTimeout(r, 500));
    save("s_platform", platformSettings);
    setPlatformSuccess("Platform settings saved successfully!");
    toast.success("Platform settings saved!");
    setTimeout(() => setPlatformSuccess(""), 3000);
    setPlatformSaving(false);
  };

  const handleSavePayment = async () => {
    setPaymentSaving(true);
    setPaymentError("");
    setPaymentSuccess("");
    await new Promise((r) => setTimeout(r, 500));
    save("s_payment", paymentSettings);
    setPaymentSuccess("Payment settings saved successfully!");
    toast.success("Payment settings saved!");
    setTimeout(() => setPaymentSuccess(""), 3000);
    setPaymentSaving(false);
  };

  const handleSaveNotifications = async () => {
    setNotifSaving(true);
    setNotifError("");
    setNotifSuccess("");
    await new Promise((r) => setTimeout(r, 500));
    save("s_notif", notifications);
    setNotifSuccess("Notification settings saved successfully!");
    toast.success("Notification settings saved!");
    setTimeout(() => setNotifSuccess(""), 3000);
    setNotifSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex gap-4 border-b pb-2">
        {["platform", "payment_gateways", "notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 capitalize ${
              activeTab === tab
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {activeTab === "platform" && (
          <div className="space-y-4">
            {platformLoading ? (
              <div className="text-center py-4 text-gray-500">Loading platform settings...</div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Site Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={platformSettings.siteName}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, siteName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={platformSettings.maintenanceMode}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, maintenanceMode: e.target.checked })}
                    />
                    Maintenance Mode
                  </label>
                  <p className="text-xs text-gray-500 mt-1">When enabled, only admins can access the site.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Users</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg p-2"
                    value={platformSettings.maxUsers}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, maxUsers: parseInt(e.target.value) || 0 })}
                  />
                </div>
                {platformError   && <p className="text-red-500 text-sm">{platformError}</p>}
                {platformSuccess && <p className="text-green-500 text-sm">{platformSuccess}</p>}
                <button
                  onClick={handleSavePlatform}
                  disabled={platformSaving}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-orange-700 transition"
                >
                  {platformSaving ? "Saving..." : "Save Platform Settings"}
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "payment_gateways" && (
          <div className="space-y-4">
            {paymentLoading ? (
              <div className="text-center py-4 text-gray-500">Loading payment settings...</div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Gateway</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={paymentSettings.paymentGateway}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentGateway: e.target.value })}
                  >
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Razorpay">Razorpay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={paymentSettings.currency}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                  >
                    <option value="INR">INR (Indian Rupee)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (British Pound)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tax Percentage (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full border rounded-lg p-2"
                    value={paymentSettings.taxPercentage}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, taxPercentage: parseFloat(e.target.value) })}
                  />
                </div>
                {paymentError   && <p className="text-red-500 text-sm">{paymentError}</p>}
                {paymentSuccess && <p className="text-green-500 text-sm">{paymentSuccess}</p>}
                <button
                  onClick={handleSavePayment}
                  disabled={paymentSaving}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-orange-700 transition"
                >
                  {paymentSaving ? "Saving..." : "Save Payment Settings"}
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-4">
            {notifLoading ? (
              <div className="text-center py-4 text-gray-500">Loading notification settings...</div>
            ) : (
              <>
                {[
                  { label: "Email Notifications",   key: "emailEnabled" },
                  { label: "SMS Notifications",     key: "smsEnabled" },
                  { label: "Push Notifications",    key: "pushNotifications" },
                ].map(({ label, key }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                    />
                    {label}
                  </label>
                ))}
                {notifError   && <p className="text-red-500 text-sm">{notifError}</p>}
                {notifSuccess && <p className="text-green-500 text-sm">{notifSuccess}</p>}
                <button
                  onClick={handleSaveNotifications}
                  disabled={notifSaving}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-orange-700 transition"
                >
                  {notifSaving ? "Saving..." : "Save Notification Settings"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Settings;