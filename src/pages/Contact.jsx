import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you. Get in touch with our team.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600">support@learnmaster.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Learning Street, Education City</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Office Hours</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="text-purple-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Monday - Friday</p>
                  <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-purple-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Saturday</p>
                  <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-purple-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Sunday</p>
                  <p className="text-gray-600">Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-4">Need immediate assistance? Chat with our support team.</p>
              <button className="w-full px-4 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Start Live Chat
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">FAQ</h3>
              <p className="text-gray-600 mb-2">Check our FAQ section for quick answers to common questions.</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View FAQ →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
