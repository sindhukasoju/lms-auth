// src/pages/Certifications.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  ArrowLeft,
  Search,
  Clock,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Rocket,
  Eye,
  Download,
  Sparkles,
} from "lucide-react";

const Certifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null); // for preview modal

  const categories = [
    "All",
    "Technology",
    "Design",
    "Business",
    "Data Science",
    "Marketing",
    "Cybersecurity",
  ];

  // Certificate data – each has a mock certificate image
  const certificates = [
    {
      id: 1,
      title: "Python Programming Certificate",
      category: "Technology",
      issuer: "LearnMaster & Google",
      description:
        "Validate your Python skills with this industry‑recognised certificate.",
      image:
        "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&auto=format", // placeholder, we'll use a styled card instead
      students: 12450,
      rating: 4.8,
      badge: "Most Popular",
    },
    {
      id: 2,
      title: "UI/UX Design Certificate",
      category: "Design",
      issuer: "LearnMaster & Adobe",
      description:
        "Prove your design expertise and stand out in the job market.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format",
      students: 8900,
      rating: 4.9,
      badge: "Top Rated",
    },
    {
      id: 3,
      title: "Cloud Practitioner Certificate",
      category: "Technology",
      issuer: "LearnMaster & AWS",
      description:
        "Demonstrate your cloud knowledge and start your AWS career.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format",
      students: 7500,
      rating: 4.7,
      badge: null,
    },
    {
      id: 4,
      title: "Data Science Certificate",
      category: "Data Science",
      issuer: "LearnMaster & IBM",
      description:
        "Showcase your data science and machine learning proficiency.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format",
      students: 5600,
      rating: 4.6,
      badge: "New",
    },
    {
      id: 5,
      title: "Digital Marketing Certificate",
      category: "Marketing",
      issuer: "LearnMaster & HubSpot",
      description:
        "Certify your digital marketing skills and boost your career.",
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&auto=format",
      students: 10200,
      rating: 4.8,
      badge: null,
    },
    {
      id: 6,
      title: "Cybersecurity Analyst Certificate",
      category: "Cybersecurity",
      issuer: "LearnMaster & Cisco",
      description:
        "Earn a globally recognised cybersecurity credential.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format",
      students: 4300,
      rating: 4.9,
      badge: "Best Seller",
    },
    {
      id: 7,
      title: "Full Stack Web Development Certificate",
      category: "Technology",
      issuer: "LearnMaster & Microsoft",
      description:
        "Certify your full‑stack skills and build production‑ready apps.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format",
      students: 18500,
      rating: 4.9,
      badge: "Most Popular",
    },
    {
      id: 8,
      title: "Business Analytics Certificate",
      category: "Business",
      issuer: "LearnMaster & Harvard",
      description:
        "Demonstrate your data‑driven decision‑making abilities.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format",
      students: 6800,
      rating: 4.7,
      badge: null,
    },
  ];

  const filteredCerts = certificates.filter((cert) => {
    const matchesCategory =
      activeCategory === "All" || cert.category === activeCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open preview modal with certificate details
  const openPreview = (cert) => setSelectedCert(cert);
  const closePreview = () => setSelectedCert(null);

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
            <Award className="w-10 h-10 text-violet-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Earn Your <span className="text-violet-600">Certificate</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Showcase your skills with a professional, shareable certificate
            that employers trust.
          </p>
        </div>

        {/* Certificate showcase (sample) */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Sparkles size={16} />
                Sample Certificate
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Professional Certification Template
              </h2>
              <p className="text-gray-600 mb-4">
                Every certificate includes a unique ID, QR code for
                verification, and a sleek design that impresses employers.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg">
                  <Eye size={18} />
                  View Full Preview
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:border-violet-400 text-gray-700 hover:text-violet-600 rounded-xl transition-all">
                  <Download size={18} />
                  Download Sample
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 w-48 h-36 bg-gradient-to-br from-violet-100 to-violet-200 rounded-xl shadow-md flex items-center justify-center border-2 border-violet-300 border-dashed">
              <div className="text-center">
                <Award size={40} className="text-violet-600 mx-auto mb-1" />
                <p className="text-xs text-violet-800 font-medium">Certificate</p>
                <p className="text-xs text-gray-500">Sample Design</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search certificates..."
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
          Showing {filteredCerts.length} certificate
          {filteredCerts.length !== 1 && "s"}
        </div>

        {/* Certificate Grid */}
        {filteredCerts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No certificates found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col group"
              >
                {/* Certificate preview image (styled as a card) */}
                <div className="relative h-44 bg-gradient-to-br from-violet-50 to-violet-100 flex items-center justify-center border-b border-gray-100 p-4">
                  <div className="text-center">
                    <Award size={48} className="text-violet-500 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-700 text-sm">Certificate</h4>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {cert.title}
                    </p>
                  </div>
                  {cert.badge && (
                    <div className="absolute top-3 right-3 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {cert.badge}
                    </div>
                  )}
                  <button
                    onClick={() => openPreview(cert)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-violet-700 flex items-center gap-2">
                      <Eye size={16} /> Preview
                    </span>
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
                      {cert.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Issued by {cert.issuer}</p>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {cert.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-violet-400" />
                      <span>{cert.students.toLocaleString()} earned</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400" />
                      <span>{cert.rating}</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-xl text-white font-medium transition-all shadow-md hover:shadow-lg">
                    <CheckCircle size={18} />
                    Earn This Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-violet-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to showcase your expertise?
          </h2>
          <p className="text-violet-100 max-w-2xl mx-auto mb-6">
            Start a course today and earn a shareable certificate that proves
            your skills to the world.
          </p>
          <button className="bg-white text-violet-700 hover:bg-violet-50 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            <Rocket size={20} />
            Browse Courses
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={48} className="text-violet-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {selectedCert.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Issued by {selectedCert.issuer}
              </p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                <p className="text-sm text-gray-600">
                  This is a preview of the certificate. It will include your
                  name, a unique ID, and a verification QR code.
                </p>
              </div>
              <button
                onClick={closePreview}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;