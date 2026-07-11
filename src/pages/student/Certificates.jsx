// src/pages/student/Certificates.jsx
import { useState } from "react";
import { Award, Download, Calendar, X, CheckCircle } from "lucide-react";

// ---------- Sample course data (replace with your real data source) ----------
const sampleCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
    instructor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
    instructor: "Prof. Michael Chen",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
    instructor: "Emily Davis",
  },
];

// ---------- Sample certificates (each references a course) ----------
const sampleCertificates = [
  {
    id: 1,
    course: sampleCourses[0],
    issueDate: "2024-03-15",
    certificateId: "CERT-2024-001",
    score: 95,
  },
  {
    id: 2,
    course: sampleCourses[1],
    issueDate: "2024-02-28",
    certificateId: "CERT-2024-002",
    score: 88,
  },
  {
    id: 3,
    course: sampleCourses[2],
    issueDate: "2024-01-10",
    certificateId: "CERT-2024-003",
    score: 92,
  },
];

// ---------- Component ----------
const Certificates = () => {
  const [certificates] = useState(sampleCertificates);
  const [selectedCert, setSelectedCert] = useState(null);

  // Handle "View Certificate" – open a modal or download
  const handleViewCertificate = (cert) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  // Handle download (just alert for demo)
  const handleDownload = (certId) => {
    alert(`Downloading certificate ${certId} ... (PDF would download here)`);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My <span className="text-neutral-900">Certificates</span>
          </h1>
          <p className="text-gray-600">
            Your earned certificates from completed courses.
          </p>
        </div>

        {/* EMPTY STATE */}
        {certificates.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
              <Award className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Certificates Yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Complete courses to earn certificates that validate your learning achievements.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  {/* Top: Icon + Score */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      Score: {cert.score}%
                    </span>
                  </div>

                  {/* Course Info */}
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {cert.course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {cert.course.category}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-900" />
                      <span>Issued: {cert.issueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>ID: {cert.certificateId}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewCertificate(cert)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition"
                    >
                      View Certificate
                    </button>
                    <button
                      onClick={() => handleDownload(cert.certificateId)}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- CERTIFICATE PREVIEW MODAL ---------- */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Certificate Preview */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Certificate of Completion
              </h2>
              <p className="text-gray-600 mb-1">
                This certifies that
              </p>
              <p className="text-xl font-bold text-gray-900 mb-1">
                {/* In a real app, show the student's name from context */}
                [Student Name]
              </p>
              <p className="text-gray-600 mb-4">
                has successfully completed the course
              </p>
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                {selectedCert.course.title}
              </h3>
              <div className="border-t border-gray-200 pt-4 text-sm text-gray-500 space-y-1">
                <p>
                  <span className="font-medium">Score:</span> {selectedCert.score}%
                </p>
                <p>
                  <span className="font-medium">Certificate ID:</span>{" "}
                  {selectedCert.certificateId}
                </p>
                <p>
                  <span className="font-medium">Issued on:</span>{" "}
                  {selectedCert.issueDate}
                </p>
              </div>
              <button
                onClick={() => handleDownload(selectedCert.certificateId)}
                className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;