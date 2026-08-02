// src/pages/admin/Analytics.jsx — fully mock, no real API calls
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const REVENUE_DATA = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6500 },
  { month: "May", revenue: 9100 },
  { month: "Jun", revenue: 11400 },
  { month: "Jul", revenue: 10800 },
  { month: "Aug", revenue: 13200 },
];

const ORDER_DATA = [
  { month: "Jan", orders: 82  },
  { month: "Feb", orders: 110 },
  { month: "Mar", orders: 145 },
  { month: "Apr", orders: 128 },
  { month: "May", orders: 187 },
  { month: "Jun", orders: 220 },
  { month: "Jul", orders: 198 },
  { month: "Aug", orders: 254 },
];

const COURSE_CATEGORIES = [
  { name: "Development", count: 35 },
  { name: "Design",      count: 20 },
  { name: "Marketing",   count: 18 },
  { name: "Data Science",count: 15 },
  { name: "Security",    count: 12 },
];

const COURSE_STATS = {
  totalCourses: 6,
  activeCourses: 4,
  totalEnrollments: 8609,
  avgCompletionRate: 72,
  mostPopularCategory: "Development",
};

const USER_STATS = { total: 12345, active: 9876, new: 345 };

const COLORS = ["#f97316", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
        <span className="ml-3 text-gray-500">Loading analytics...</span>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-3xl font-bold mt-1">{USER_STATS.total.toLocaleString()}</p>
          <p className="text-green-500 text-xs mt-1">+{USER_STATS.new} new this month</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Active Users</p>
          <p className="text-3xl font-bold mt-1">{USER_STATS.active.toLocaleString()}</p>
          <p className="text-blue-500 text-xs mt-1">{Math.round((USER_STATS.active / USER_STATS.total) * 100)}% engagement</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Courses</p>
          <p className="text-3xl font-bold mt-1">{COURSE_STATS.totalCourses}</p>
          <p className="text-purple-500 text-xs mt-1">{COURSE_STATS.activeCourses} active</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Enrollments</p>
          <p className="text-3xl font-bold mt-1">{COURSE_STATS.totalEnrollments.toLocaleString()}</p>
          <p className="text-orange-500 text-xs mt-1">{COURSE_STATS.avgCompletionRate}% avg completion</p>
        </div>
      </div>

      {/* Revenue & Orders Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ fill: "#f97316" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Orders Analytics</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ORDER_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Course Categories Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={COURSE_CATEGORIES}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="count"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {COURSE_CATEGORIES.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-6">Course Enrollment Stats</h2>
          <div className="space-y-4">
            {[
              { label: "Total Enrollments",      value: COURSE_STATS.totalEnrollments.toLocaleString() },
              { label: "Average Completion Rate", value: `${COURSE_STATS.avgCompletionRate}%` },
              { label: "Most Popular Category",   value: COURSE_STATS.mostPopularCategory },
              { label: "Active Courses",          value: COURSE_STATS.activeCourses },
              { label: "Total Revenue (Aug)",     value: "$13,200" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600 text-sm">{row.label}</span>
                <span className="font-bold text-gray-900">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;