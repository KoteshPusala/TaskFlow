import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Lock, UserCheck, Ban, Calendar } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/40 to-cyan-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-slate-200/30 to-gray-300/20 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-slate-100/20 to-blue-200/10 rounded-full blur-3xl"></div>
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-blue-300 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-cyan-300 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-slate-300 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-gray-300 rounded-br-3xl"></div>
        </div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-3">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 text-lg">
              Please read our terms carefully before using TaskFlow
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 max-h-96 overflow-y-auto mb-8 border border-white/40 shadow-inner">
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="text-center pb-4 border-b border-gray-200/60">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Welcome to TaskFlow</h3>
                <p className="text-gray-700 text-lg">
                  Your intelligent task management solution
                </p>
              </div>
              
              {/* Terms Sections */}
              <div className="space-y-6">
                {/* Acceptance of Terms */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      By accessing and using TaskFlow, you accept and agree to be bound by the terms and provisions of this agreement. 
                      If you do not agree to these terms, please do not use our service.
                    </p>
                  </div>
                </div>

                {/* User Account */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">2. User Account</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You are responsible for maintaining the confidentiality of your account and password. 
                      You agree to accept responsibility for all activities that occur under your account. 
                      Please notify us immediately of any unauthorized use of your account.
                    </p>
                  </div>
                </div>

                {/* Privacy Policy */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Privacy Policy</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Your privacy is important to us. We collect and use your personal information only to provide and improve the service. 
                      We will not share your information with third parties except as described in our Privacy Policy.
                    </p>
                  </div>
                </div>

                {/* User Content */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">4. User Content</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You retain all rights to the content you create and store on TaskFlow. 
                      By using our service, you grant us a license to store and display your content solely for the purpose of providing the service to you.
                    </p>
                  </div>
                </div>

                {/* Prohibited Uses */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Ban className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">5. Prohibited Uses</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You may not use TaskFlow for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction 
                      while using the service, including copyright laws and data protection regulations.
                    </p>
                  </div>
                </div>

                {/* Service Modifications */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">6. Service Modifications</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. 
                      We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center pt-4 border-t border-gray-200/60">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <p className="text-sm font-medium">
                    Last updated: {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Registration
            </Link>
          </div>
          

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              By using TaskFlow, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        @keyframes float-delay {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.03);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 6s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;