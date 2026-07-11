import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button on the homepage. Fill in your details including name, email, and password. You'll receive a verification email to confirm your account. Once verified, you can start learning immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee for most courses. If you've completed less than 20% of the course content and haven't received a certificate, you can request a full refund."
    },
    {
      question: "How long do I have access to a course?",
      answer: "Course access duration varies by course. Most courses offer lifetime access, allowing you to learn at your own pace. Some specialized programs may have time-limited access as specified in the course details."
    },
    {
      question: "Do I receive a certificate upon completion?",
      answer: "Yes, upon successful completion of a course, you'll receive a digital certificate that you can share on LinkedIn, add to your resume, or print. Certificates are verifiable and include a unique verification code."
    },
    {
      question: "Can I download course videos?",
      answer: "For copyright protection, course videos cannot be downloaded. However, you can access them anytime through our platform with an internet connection. Some courses offer downloadable resources like PDFs and code files."
    },
    {
      question: "How do I contact instructors?",
      answer: "Each course has a dedicated Q&A section where you can ask questions and get answers from instructors and fellow students. For direct instructor support, some courses offer additional mentorship options."
    },
    {
      question: "Are there any prerequisites for courses?",
      answer: "Prerequisites vary by course and are listed in the course description. Some courses require basic knowledge, while others are designed for complete beginners. Always check the requirements before enrolling."
    },
    {
      question: "Can I switch between devices?",
      answer: "Absolutely! Our platform is fully responsive and works on desktop, tablet, and mobile devices. Your progress is automatically synced across all devices."
    },
    {
      question: "How do corporate or team enrollments work?",
      answer: "We offer corporate and team plans for organizations. Contact our sales team for custom pricing, bulk enrollment options, and administrative features for managing team learning."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="text-purple-600" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about LearnMaster</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-purple-600 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-purple-50 p-8 rounded-xl border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-4">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
