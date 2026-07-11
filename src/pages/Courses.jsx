// src/pages/Courses.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowLeft,
  Search,
  Clock,
  Users,
  Star,
  ShoppingCart,
  Filter,
  Rocket,
  ChevronRight,
} from "lucide-react";
import { courses } from "../data/courses"; // ✅ shared courses

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories from courses
  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === "All" || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add to cart function (simplified – reuses localStorage logic)
  const addToCart = (course) => {
    const cart = localStorage.getItem("lms_cart");
    let cartItems = cart ? JSON.parse(cart) : [];
    const existing = cartItems.find((item) => item.id === course.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cartItems.push({ ...course, quantity: 1 });
    }
    localStorage.setItem("lms_cart", JSON.stringify(cartItems));
    alert(`Added "${course.title}" to cart.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 mb-6 shadow-lg shadow-violet-200/50">
            <BookOpen className="w-10 h-10 text-violet-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore Our <span className="text-violet-600">Courses</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover a wide range of expert‑led courses and start learning
            today – from beginner to advanced.
          </p>
        </div>

        {/* Featured / Popular banner (optional but adds visual appeal) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 rounded-full">
              <Star className="w-6 h-6 text-violet-600 fill-violet-200" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Popular Courses</h3>
              <p className="text-sm text-gray-500">
                {courses.filter((c) => c.tag === "Most Popular").length} courses
                with the highest ratings
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">
              🔥 Trending
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              🆕 New
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "bg-white text-gray-600 hover:bg-violet-50 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-6">
          Showing {filteredCourses.length} course{filteredCourses.length !== 1 && "s"}
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No courses found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {course.tag && (
                    <div className="absolute top-3 right-3 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {course.tag}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-gray-800 font-medium">
                    {course.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    by {course.instructor}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-violet-400" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-violet-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{course.price}
                    </span>
                    <button
                      onClick={() => addToCart(course)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-xl text-white font-medium transition-all shadow-md hover:shadow-lg"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-violet-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to advance your skills?
          </h2>
          <p className="text-violet-100 max-w-2xl mx-auto mb-6">
            Join thousands of students already learning on LearnMaster. Start
            your first course today – no risk, 30‑day money‑back guarantee.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-violet-50 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            <Rocket size={20} />
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;