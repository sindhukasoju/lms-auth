import { Users, Award, Target, Globe, BookOpen, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About LearnMaster</h1>
          <p className="text-xl text-gray-600">Empowering learners worldwide with quality education</p>
        </div>

        {/* Mission Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At LearnMaster, we believe that education should be accessible to everyone, everywhere. 
                Our mission is to democratize learning by providing high-quality, affordable courses 
                taught by industry experts. We're committed to helping individuals and organizations 
                achieve their goals through innovative online learning experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-gray-600">Active Students</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Expert Courses</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-gray-600">Expert Instructors</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Quality Education</h3>
            <p className="text-gray-600 text-sm">
              We partner with industry experts to create courses that are relevant, practical, and up-to-date.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Community Driven</h3>
            <p className="text-gray-600 text-sm">
              Our vibrant community of learners and instructors supports collaborative learning and growth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Career Growth</h3>
            <p className="text-gray-600 text-sm">
              Our courses are designed to help you advance your career and achieve your professional goals.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-xl shadow-sm mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="leading-relaxed opacity-90">
            Founded in 2020, LearnMaster started with a simple idea: make quality education accessible to everyone. 
            What began as a small platform with a handful of courses has grown into a global learning community 
            serving thousands of students across the world. Our journey has been driven by passion, innovation, 
            and a commitment to excellence. Today, we continue to push boundaries and explore new ways to make 
            learning more engaging, effective, and accessible.
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600 text-sm">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                JS
              </div>
              <h3 className="font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600 text-sm">CTO & Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                MJ
              </div>
              <h3 className="font-semibold text-gray-800">Mike Johnson</h3>
              <p className="text-gray-600 text-sm">Head of Education</p>
            </div>
          </div>
        </div>

        {/* Global Reach */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Global Reach</h2>
              <p className="text-gray-600 leading-relaxed">
                LearnMaster serves learners from over 100 countries. Our platform supports multiple languages 
                and is designed to work seamlessly across devices. Whether you're learning from home, 
                office, or on the go, LearnMaster is always accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
