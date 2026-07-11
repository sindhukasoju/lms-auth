import { Shield, Lock, Eye, Database } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-purple-600" size={24} />
              Information We Collect
            </h2>
            <div className="text-gray-600 space-y-3">
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Account credentials (encrypted)</li>
                <li>Payment information (processed securely)</li>
                <li>Course enrollment and progress data</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Eye className="text-purple-600" size={24} />
              How We Use Your Information
            </h2>
            <div className="text-gray-600 space-y-3">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to comments and questions</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Lock className="text-purple-600" size={24} />
              Data Security
            </h2>
            <div className="text-gray-600">
              <p className="mb-3">
                We implement appropriate technical and organizational measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for all data transmissions</li>
                <li>Secure password hashing and storage</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access to personal data</li>
                <li>Compliance with GDPR and other privacy regulations</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Database className="text-purple-600" size={24} />
              Data Retention
            </h2>
            <div className="text-gray-600">
              <p className="mb-3">
                We retain your personal data for as long as necessary to provide our services and fulfill 
                the purposes outlined in this privacy policy. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account data: Retained while your account is active</li>
                <li>Course data: Retained for the duration of your enrollment</li>
                <li>Payment records: Retained as required by law (typically 7 years)</li>
                <li>Marketing communications: Until you opt out</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
            <div className="text-gray-600">
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Export your data</li>
                <li>Object to processing of your data</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Services</h2>
            <div className="text-gray-600">
              <p className="mb-3">
                We may share your data with trusted third-party service providers who assist us in operating 
                our platform, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Email service providers</li>
                <li>Analytics services</li>
                <li>Cloud hosting providers</li>
              </ul>
              <p className="mt-3">
                These providers are contractually obligated to protect your data and are only permitted to 
                use it for the purposes specified in our agreements.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Children's Privacy</h2>
            <div className="text-gray-600">
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal 
                information from children under 13. If we become aware that we have collected such information, 
                we will take steps to delete it.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
            <div className="text-gray-600">
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="text-gray-600">
              <p className="mb-2">
                If you have questions about this privacy policy, please contact us at:
              </p>
              <p className="font-medium">privacy@learnmaster.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
