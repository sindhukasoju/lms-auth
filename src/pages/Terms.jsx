import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="text-purple-600" size={24} />
              Acceptance of Terms
            </h2>
            <div className="text-gray-600">
              <p>
                By accessing and using LearnMaster, you agree to be bound by these Terms & Conditions. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Scale className="text-purple-600" size={24} />
              User Accounts
            </h2>
            <div className="text-gray-600 space-y-3">
              <p>To use our services, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 13 years of age</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Not share your account with others</li>
              </ul>
              <p className="mt-3">
                You are responsible for all activities that occur under your account.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-purple-600" size={24} />
              Course Enrollment & Access
            </h2>
            <div className="text-gray-600 space-y-3">
              <p>Upon enrollment, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Complete payment for enrolled courses</li>
                <li>Access course content for personal use only</li>
                <li>Not reproduce, distribute, or share course materials</li>
                <li>Respect intellectual property rights</li>
                <li>Complete courses within the specified access period</li>
              </ul>
              <p className="mt-3">
                Course access is granted for the duration specified at the time of enrollment.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="text-purple-600" size={24} />
              Payment Terms
            </h2>
            <div className="text-gray-600 space-y-3">
              <p>All payments are processed through secure payment gateways. By making a purchase, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate payment information</li>
                <li>Pay all applicable fees and taxes</li>
                <li>Authorize charges to your payment method</li>
                <li>Understand that refunds are subject to our refund policy</li>
              </ul>
              <p className="mt-3">
                We reserve the right to modify pricing at any time without prior notice.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Policy</h2>
            <div className="text-gray-600">
              <p className="mb-3">Refunds are available under the following conditions:</p>
<ul className="list-disc pl-6 space-y-2">
                <li>Request made within 30 days of purchase</li>
                <li>Less than 20% of course content has been accessed</li>
                <li>No certificates have been issued</li>
                <li>The request is made in good faith</li>
              </ul>
              <p className="mt-3">
                Refund requests are reviewed on a case-by-case basis. Processing may take 5-10 business days.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property</h2>
            <div className="text-gray-600">
              <p className="mb-3">
                All content on LearnMaster, including but not limited to text, graphics, logos, images, 
                videos, and software, is the property of LearnMaster or its content suppliers and is 
                protected by international copyright laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works, or publicly display 
                any content without our express written permission.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Conduct</h2>
            <div className="text-gray-600">
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the platform for any illegal purpose</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Upload malicious code or viruses</li>
                <li>Interfere with or disrupt the service</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Certificates</h2>
            <div className="text-gray-600">
              <p className="mb-3">
                Certificates are issued upon successful completion of courses. Certificate issuance is subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Completion of all course requirements</li>
                <li>Passing all assessments with minimum required scores</li>
                <li>Verification of identity</li>
                <li>Compliance with academic integrity policies</li>
              </ul>
              <p className="mt-3">
                Certificates remain the property of LearnMaster and may be revoked for misconduct.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
            <div className="text-gray-600">
              <p>
                LearnMaster shall not be liable for any indirect, incidental, special, or consequential 
                damages arising from your use of our services. Our total liability shall not exceed the 
                amount you paid for the services in question.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Termination</h2>
            <div className="text-gray-600">
              <p>
                We reserve the right to terminate or suspend your account at any time, with or without 
                cause, with or without notice. Upon termination, your right to use the service will 
                immediately cease.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h2>
            <div className="text-gray-600">
              <p>
                These terms shall be governed by and construed in accordance with the laws of the 
                jurisdiction in which LearnMaster is headquartered, without regard to its conflict 
                of law provisions.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
            <div className="text-gray-600">
              <p>
                We may modify these terms at any time. Continued use of the service after modifications 
                constitutes acceptance of the new terms.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="text-gray-600">
              <p className="mb-2">
                For questions about these terms, please contact us at:
              </p>
              <p className="font-medium">legal@learnmaster.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
