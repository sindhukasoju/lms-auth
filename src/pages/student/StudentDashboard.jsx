import { useState } from "react";
import { LayoutDashboard, BookOpen, Star, TrendingUp, Clock, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import InstructorApplication from "./InstructorApplication";

const ENROLLMENTS = [
  {
    id: "e1", courseId: "c1", title: "Complete React Masterclass", instructor: "David Lee",
    progress: 65, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    lastAccessed: "2025-05-17", totalLessons: 32, completedLessons: 21
  },
  {
    id: "e2", courseId: "c4", title: "Digital Marketing Mastery", instructor: "David Lee",
    progress: 100, thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    lastAccessed: "2025-05-20", totalLessons: 18, completedLessons: 18
  },
  {
    id: "e3", courseId: "c2", title: "UI/UX Design Fundamentals", instructor: "Eva Green",
    progress: 30, thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    lastAccessed: "2025-05-10", totalLessons: 24, completedLessons: 7
  },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [applicationStatus, setApplicationStatus] = useState(() => {
    return localStorage.getItem("instructor_application_status") || null;
  });

  const handleStatusChange = (status) => {
    setApplicationStatus(status);
    localStorage.setItem("instructor_application_status", status);
  };

  const completed   = ENROLLMENTS.filter(e => e.progress === 100).length;
  const certificates = completed; // one certificate per completed course

  const tabs = [
    { id: "dashboard",         label: "Dashboard",           icon: LayoutDashboard },
    { id: "learning",          label: "My Learning",         icon: BookOpen },
    { id: "become-instructor", label: "Become an Instructor",icon: Star, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200
                    ${isActive
                      ? tab.highlight
                        ? "border-purple-600 text-purple-700"
                        : "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${tab.highlight && !isActive ? "text-purple-500" : ""}`} />
                  {tab.label}
                  {tab.id === "become-instructor" && applicationStatus === "pending" && (
                    <span className="ml-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  {tab.id === "become-instructor" && !applicationStatus && (
                    <span className="ml-1 text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Dashboard Tab ─────────────────────────────────── */}
        {activeTab === "dashboard" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
              </h1>
              <p className="text-gray-500 mt-1">Here's what's happening with your learning journey.</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {[
                { label: "Enrolled Courses", value: ENROLLMENTS.length, color: "from-purple-500 to-indigo-600", icon: "🎓" },
                { label: "Completed",        value: completed,           color: "from-green-400 to-emerald-600",  icon: "✅" },
                { label: "Certificates",     value: certificates,        color: "from-orange-400 to-rose-500",    icon: "🏆" },
              ].map((s) => (
                <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-lg`}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-4xl font-bold">{s.value}</div>
                  <div className="text-sm opacity-80 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Continue Learning */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Continue Learning</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ENROLLMENTS.filter(e => e.progress < 100).map(course => (
                  <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="h-36 relative overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
                      <div className="absolute bottom-2 left-3 text-white text-xs flex items-center gap-1">
                        <Clock size={12} /> Last: {course.lastAccessed}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 mb-3">by {course.instructor}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span className="font-semibold text-purple-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Completed course badge */}
                {ENROLLMENTS.filter(e => e.progress === 100).map(course => (
                  <div key={course.id} className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
                    <div className="h-36 relative overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-green-900/30 flex items-center justify-center">
                        <span className="text-4xl">✅</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">by {course.instructor}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Completed</span>
                        <Award size={12} className="text-orange-500" />
                        <span className="text-xs text-orange-600 font-medium">Certificate Earned</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Become Instructor CTA */}
            {!applicationStatus && (
              <div
                onClick={() => setActiveTab("become-instructor")}
                className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white flex items-center justify-between cursor-pointer hover:shadow-xl hover:shadow-purple-200 hover:scale-[1.01] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-medium text-purple-200">New Feature</span>
                  </div>
                  <h3 className="text-xl font-bold">Ready to become an Instructor?</h3>
                  <p className="text-purple-200 text-sm mt-0.5">Share your expertise and earn. Apply now!</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-3 flex-shrink-0">
                  <Star className="w-8 h-8 text-yellow-300" />
                </div>
              </div>
            )}
            {applicationStatus === "pending" && (
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⏳</span>
                </div>
                <div>
                  <p className="font-semibold text-amber-800">Instructor application under review</p>
                  <p className="text-amber-600 text-sm">We'll notify you once it's approved (3–5 business days)</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── My Learning Tab ────────────────────────────────── */}
        {activeTab === "learning" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Learning</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ENROLLMENTS.map(course => (
                <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="h-40 relative overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
                    {course.progress === 100 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-900/20">
                        <span className="text-4xl">✅</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">by {course.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span className={`font-bold ${course.progress === 100 ? "text-green-600" : "text-purple-600"}`}>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full ${course.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    {course.progress === 100 && (
                      <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
                        <Award size={12} /> Certificate Available
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Become Instructor Tab ──────────────────────────── */}
        {activeTab === "become-instructor" && (
          <InstructorApplication
            onBack={() => setActiveTab("dashboard")}
            applicationStatus={applicationStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default StudentDashboard;