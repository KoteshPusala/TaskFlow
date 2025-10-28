// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import OTPInput from './OTPInput';
// import { ArrowLeft, Mail, Lock, Sparkles, Shield, Key, RefreshCw } from 'lucide-react';

// const ForgotPassword = () => {
//   const [step, setStep] = useState('email');
//   const [formData, setFormData] = useState({
//     email: '',
//     code: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
  
//   const { sendPasswordResetCode, resetPassword, verifyResetCode } = useAuth();

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//     if (error) setError('');
//   };

//   const handleSendCode = async (e) => {
//     if (e) e.preventDefault();
//     setError('');
//     setMessage('');
    
//     if (!formData.email) {
//       setError('Please enter your email address');
//       return;
//     }

//     setLoading(true);
//     try {
//       await sendPasswordResetCode(formData.email);
//       setMessage('Password reset code sent to your email!');
//       setStep('verify');
//     } catch (error) {
//       setError(error.message || 'Failed to send reset code');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = async (enteredCode) => {
//     setError('');
//     setMessage('');
//     setLoading(true);
    
//     try {
//       await verifyResetCode(formData.email, enteredCode);
//       setFormData(prev => ({ ...prev, code: enteredCode }));
//       setStep('reset');
//     } catch (error) {
//       setError('Invalid verification code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     if (!formData.newPassword || !formData.confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (formData.newPassword.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     try {
//       await resetPassword(formData.email, formData.code, formData.newPassword);
//       setMessage('Password reset successfully! You can now login with your new password.');
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 1000);
//     } catch (error) {
//       setError(error.message || 'Failed to reset password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendCode = async () => {
//     setLoading(true);
//     setError('');
//     setMessage('');
//     try {
//       await sendPasswordResetCode(formData.email);
//       setMessage('New verification code sent to your email!');
//     } catch (error) {
//       setError(error.message || 'Failed to send verification code');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-100 flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Subtle Gradient Orbs */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/40 to-teal-300/30 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-200/30 to-blue-300/20 rounded-full blur-3xl animate-float-delay"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-100/20 to-emerald-200/10 rounded-full blur-3xl"></div>
        
//         {/* Geometric Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-emerald-300 rounded-tl-3xl"></div>
//           <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-cyan-300 rounded-tr-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-teal-300 rounded-bl-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-blue-300 rounded-br-3xl"></div>
//         </div>
//       </div>

//       <div className="relative w-full max-w-md">
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
//                   <Shield className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
//                   <Key className="h-4 w-4 text-white" />
//                 </div>
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               Reset Password
//             </h1>
//             <p className="text-gray-600">
//               {step === 'email' && 'Enter your email to receive a reset code'}
//               {step === 'verify' && 'Enter the 4-digit code from your email'}
//               {step === 'reset' && 'Enter your new password'}
//             </p>
//           </div>

//           {error && (
//             <div className="bg-rose-50/80 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl backdrop-blur-sm mb-6">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 <span className="text-sm">{error}</span>
//               </div>
//             </div>
//           )}

//           {message && (
//             <div className="bg-green-50/80 border border-green-200 text-green-700 px-4 py-3 rounded-xl backdrop-blur-sm mb-6">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//                 <span className="text-sm">{message}</span>
//               </div>
//             </div>
//           )}

//           {step === 'email' && (
//             <form onSubmit={handleSendCode} className="space-y-6">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm pr-12"
//                     placeholder="Enter your email"
//                   />
//                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                     <Mail className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
//               >
//                 <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                 <div className="relative flex items-center justify-center">
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                       Sending Code...
//                     </>
//                   ) : (
//                     <>
//                       <Mail className="h-5 w-5 mr-2" />
//                       Send Reset Code
//                     </>
//                   )}
//                 </div>
//               </button>
//             </form>
//           )}

//           {step === 'verify' && (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
//                   Enter the 4-digit code sent to:
//                 </label>
//                 <p className="text-emerald-600 text-center font-medium mb-6">{formData.email}</p>
//                 <OTPInput length={4} onComplete={handleVerifyCode} />
//               </div>

//               {loading && (
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto"></div>
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setStep('email')}
//                   className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200 font-medium border border-gray-300"
//                 >
//                   <ArrowLeft className="h-4 w-4 inline mr-2" />
//                   Back
//                 </button>
//                 <button
//                   onClick={handleResendCode}
//                   disabled={loading}
//                   className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl transition-colors duration-200 font-medium flex items-center justify-center"
//                 >
//                   <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//                   {loading ? 'Sending...' : 'Resend Code'}
//                 </button>
//               </div>
//             </div>
//           )}

//           {step === 'reset' && (
//             <form onSubmit={handleResetPassword} className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-800 mb-2">
//                     New Password
//                   </label>
//                   <input
//                     id="newPassword"
//                     name="newPassword"
//                     type="password"
//                     required
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 hover:border-gray-400 backdrop-blur-sm"
//                     placeholder="Enter new password"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-2">
//                     Confirm New Password
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 hover:border-gray-400 backdrop-blur-sm"
//                     placeholder="Confirm new password"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
//               >
//                 <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                 <div className="relative flex items-center justify-center">
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                       Resetting Password...
//                     </>
//                   ) : (
//                     <>
//                       <Lock className="h-5 w-5 mr-2" />
//                       Reset Password
//                     </>
//                   )}
//                 </div>
//               </button>
//             </form>
//           )}

//           {/* Back to Login Link */}
//           <div className="mt-8 text-center">
//             <Link 
//               to="/login" 
//               className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-medium"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) scale(1);
//           }
//           50% {
//             transform: translateY(-20px) scale(1.05);
//           }
//         }
//         @keyframes float-delay {
//           0%, 100% {
//             transform: translateY(0px) scale(1);
//           }
//           50% {
//             transform: translateY(-15px) scale(1.03);
//           }
//         }

//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }
//         .animate-float-delay {
//           animation: float-delay 6s ease-in-out infinite 2s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import OTPInput from './OTPInput';
import { ArrowLeft, Mail, Lock, Shield, Key, RefreshCw, Check, X, Eye, EyeOff } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { sendPasswordResetCode, resetPassword, verifyResetCode } = useAuth();

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError('');
        setMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, message]);

  // Password validation function
  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password)
    };
    
    const isValid = Object.values(requirements).every(Boolean);
    return { isValid, requirements };
  };

  // Update password requirements when password changes
  useEffect(() => {
    if (formData.newPassword) {
      const { requirements } = validatePassword(formData.newPassword);
      setPasswordRequirements(requirements);
    } else {
      setPasswordRequirements({
        length: false,
        uppercase: false,
        number: false
      });
    }
  }, [formData.newPassword]);

  // Clear form data when component mounts
  useEffect(() => {
    setFormData({
      email: '',
      code: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  // Check if all password requirements are met
  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  // Password requirement component
  const PasswordRequirement = ({ met, text }) => (
    <div className={`flex items-center space-x-2 transition-all duration-300 ${
      met ? 'text-green-600' : 'text-gray-500'
    }`}>
      {met ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-400" />
      )}
      <span className={`text-sm ${met ? 'font-medium' : ''}`}>{text}</span>
    </div>
  );

  const handleSendCode = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setMessage('');
    
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending reset code to:', formData.email);
      const response = await sendPasswordResetCode(formData.email);
      
      // Check if the response indicates user doesn't exist
      if (response.message && response.message.includes('not exist') || response.message.includes('not found')) {
        setError('No account found with this email address');
        return;
      }
      
      setMessage(response.message || 'Password reset code sent to your email!');
      setStep('verify');
    } catch (error) {
      console.error('Send code error:', error);
      
      // Handle specific error messages from backend
      if (error.message && (error.message.includes('not exist') || error.message.includes('not found'))) {
        setError('No account found with this email address');
      } else if (error.message && error.message.includes('already sent')) {
        setError('Reset code already sent. Please check your email or wait before requesting a new one.');
      } else {
        setError(error.message || 'Failed to send reset code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (enteredCode) => {
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      console.log('Verifying code:', enteredCode, 'for email:', formData.email);
      const response = await verifyResetCode(formData.email, enteredCode);
      setFormData(prev => ({ ...prev, code: enteredCode }));
      setMessage(response.message || 'Code verified successfully!');
      setStep('reset');
    } catch (error) {
      console.error('Verify code error:', error);
      setError(error.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Enhanced password validation
    const { isValid, requirements } = validatePassword(formData.newPassword);
    if (!isValid) {
      const missingRequirements = [];
      if (!requirements.length) missingRequirements.push('at least 6 characters');
      if (!requirements.uppercase) missingRequirements.push('one capital letter');
      if (!requirements.number) missingRequirements.push('one number');
      setError(`Password must contain: ${missingRequirements.join(', ')}`);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      console.log('Resetting password for:', formData.email);
      const response = await resetPassword(formData.email, formData.code, formData.newPassword);
      setMessage(response.message || 'Password reset successfully! You can now login with your new password.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await sendPasswordResetCode(formData.email);
      
      // Check if the response indicates user doesn't exist
      if (response.message && response.message.includes('not exist') || response.message.includes('not found')) {
        setError('No account found with this email address');
        return;
      }
      
      setMessage(response.message || 'New verification code sent to your email!');
    } catch (error) {
      console.error('Resend code error:', error);
      
      // Handle specific error messages from backend
      if (error.message && (error.message.includes('not exist') || error.message.includes('not found'))) {
        setError('No account found with this email address');
      } else {
        setError(error.message || 'Failed to send verification code');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-sky-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/40 to-teal-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-200/30 to-blue-300/20 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-100/20 to-emerald-200/10 rounded-full blur-3xl"></div>
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-emerald-300 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-cyan-300 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-teal-300 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-blue-300 rounded-br-3xl"></div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Key className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600">
              {step === 'email' && 'Enter your email to receive a reset code'}
              {step === 'verify' && 'Enter the 4-digit code from your email'}
              {step === 'reset' && 'Enter your new password'}
            </p>
          </div>

          {error && (
            <div className="bg-rose-50/80 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl backdrop-blur-sm mb-6 animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {message && (
            <div className="bg-green-50/80 border border-green-200 text-green-700 px-4 py-3 rounded-xl backdrop-blur-sm mb-6 animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{message}</span>
              </div>
            </div>
          )}

          {/* Rest of your component remains the same */}
          {step === 'email' && (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm pr-12"
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" />
                      Send Reset Code
                    </>
                  )}
                </div>
              </button>
            </form>
          )}

          {step === 'verify' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter the 4-digit code sent to:
                </label>
                <p className="text-emerald-600 text-center font-medium mb-6">{formData.email}</p>
                <OTPInput length={4} onComplete={handleVerifyCode} />
              </div>

              {loading && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto"></div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('email')}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200 font-medium border border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 inline mr-2" />
                  Back
                </button>
                <button
                  onClick={handleResendCode}
                  disabled={loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl transition-colors duration-200 font-medium flex items-center justify-center"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Sending...' : 'Resend Code'}
                </button>
              </div>
            </div>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-800 mb-2">
                    New Password
                  </label>
                  <div className="relative group">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm pr-12"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 group-hover/eye:text-gray-700 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 group-hover/eye:text-gray-700 transition-colors" />
                      )}
                    </button>
                  </div>

                  {/* Password Requirements - Only show when password has content AND not all requirements are met */}
                  {formData.newPassword && !allRequirementsMet && (
                    <div className="mt-3 p-4 bg-gray-50/80 rounded-xl border border-gray-200 space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
                      <PasswordRequirement 
                        met={passwordRequirements.length} 
                        text="At least 6 characters" 
                      />
                      <PasswordRequirement 
                        met={passwordRequirements.uppercase} 
                        text="One capital letter (A-Z)" 
                      />
                      <PasswordRequirement 
                        met={passwordRequirements.number} 
                        text="One number (0-9)" 
                      />
                    </div>
                  )}

                  {/* Success message when all requirements are met */}
                  {formData.newPassword && allRequirementsMet && (
                    <div className="mt-3 p-3 bg-green-50/80 border border-green-200 rounded-xl">
                      <div className="flex items-center space-x-2 text-green-700">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Password meets all requirements!</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative group">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm pr-12"
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 group-hover/eye:text-gray-700 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 group-hover/eye:text-gray-700 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !allRequirementsMet || formData.newPassword !== formData.confirmPassword}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Reset Password
                    </>
                  )}
                </div>
              </button>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 6s ease-in-out infinite 2s;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;