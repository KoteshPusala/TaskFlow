// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { Eye, EyeOff, UserPlus, Rocket, Zap, Target, CheckCircle, Calendar, TrendingUp, Users, X, Mail, Check, X as XIcon } from 'lucide-react';
// import OTPInput from '../components/OTPInput.jsx';

// const Register = () => {
//   const [formData, setFormData] = useState(() => {
//     const saved = localStorage.getItem('registerFormData');
//     return saved ? JSON.parse(saved) : {
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     };
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(() => {
//     const saved = localStorage.getItem('registerFormData');
//     return saved ? JSON.parse(saved).acceptedTerms || false : false;
//   });
//   const [showVerification, setShowVerification] = useState(false);
//   const [registeredEmail, setRegisteredEmail] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [verificationLoading, setVerificationLoading] = useState(false);
//   const [verificationError, setVerificationError] = useState('');
//   const [verificationMessage, setVerificationMessage] = useState('');
//   const [passwordRequirements, setPasswordRequirements] = useState({
//     length: false,
//     uppercase: false,
//     number: false
//   });
  
//   const { register, verifyEmail, sendVerificationCode } = useAuth();
//   const navigate = useNavigate();

//   // Password validation function
//   const validatePassword = (password) => {
//     const requirements = {
//       length: password.length >= 6,
//       uppercase: /[A-Z]/.test(password),
//       number: /[0-9]/.test(password)
//     };
    
//     const isValid = Object.values(requirements).every(Boolean);
//     return { isValid, requirements };
//   };

//   // Update password requirements when password changes
//   useEffect(() => {
//     if (formData.password) {
//       const { requirements } = validatePassword(formData.password);
//       setPasswordRequirements(requirements);
//     } else {
//       setPasswordRequirements({
//         length: false,
//         uppercase: false,
//         number: false
//       });
//     }
//   }, [formData.password]);

//   useEffect(() => {
//     const dataToSave = {
//       ...formData,
//       acceptedTerms
//     };
//     localStorage.setItem('registerFormData', JSON.stringify(dataToSave));
//   }, [formData, acceptedTerms]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
//       setError('All fields are required');
//       return;
//     }

//     // Enhanced password validation
//     const { isValid, requirements } = validatePassword(formData.password);
//     if (!isValid) {
//       const missingRequirements = [];
//       if (!requirements.length) missingRequirements.push('at least 6 characters');
//       if (!requirements.uppercase) missingRequirements.push('one capital letter');
//       if (!requirements.number) missingRequirements.push('one number');
//       setError(`Password must contain: ${missingRequirements.join(', ')}`);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (!acceptedTerms) {
//       setError('Please accept the Terms and Conditions');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await register(formData.username, formData.email, formData.password);
//       localStorage.removeItem('registerFormData');
      
//       // Show verification overlay instead of navigating
//       setRegisteredEmail(formData.email);
//       setShowVerification(true);
      
//     } catch (error) {
//       setError(error.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerificationComplete = (enteredCode) => {
//     setVerificationCode(enteredCode);
//   };

//   const handleVerifyEmail = async (e) => {
//     e.preventDefault();
    
//     if (verificationCode.length !== 4) {
//       setVerificationError('Please enter the 4-digit code');
//       return;
//     }

//     setVerificationLoading(true);
//     setVerificationError('');

//     try {
//       const userId = localStorage.getItem('tempUserId');
//       await verifyEmail(registeredEmail, verificationCode, userId);
//       setVerificationMessage('Email verified successfully! Redirecting to login...');
      
//       localStorage.removeItem('tempUserId');
      
//       setTimeout(() => {
//         setShowVerification(false);
//         navigate('/login');
//       }, 2000);
      
//     } catch (error) {
//       setVerificationError(error.message || 'Failed to verify email');
//     } finally {
//       setVerificationLoading(false);
//     }
//   };

//   const handleResendCode = async () => {
//     setVerificationLoading(true);
//     setVerificationError('');
//     setVerificationMessage('');

//     try {
//       await sendVerificationCode(registeredEmail);
//       setVerificationMessage('New verification code sent to your email!');
//     } catch (error) {
//       setVerificationError(error.message || 'Failed to send verification code');
//     } finally {
//       setVerificationLoading(false);
//     }
//   };

//   const handleBackFromVerification = () => {
//     setShowVerification(false);
//     setVerificationCode('');
//     setVerificationError('');
//     setVerificationMessage('');
//   };

//   // Password requirement component
//   const PasswordRequirement = ({ met, text }) => (
//     <div className={`flex items-center space-x-2 transition-all duration-300 ${
//       met ? 'text-green-600' : 'text-gray-500'
//     }`}>
//       {met ? (
//         <Check className="h-4 w-4 text-green-500" />
//       ) : (
//         <XIcon className="h-4 w-4 text-gray-400" />
//       )}
//       <span className={`text-sm ${met ? 'font-medium' : ''}`}>{text}</span>
//     </div>
//   );

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

//       {/* Email Verification Overlay */}
//       {showVerification && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 max-w-md w-full">
//             <div className="flex justify-between items-center mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
//                   <Mail className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
//                   <p className="text-sm text-gray-600">{registeredEmail}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleBackFromVerification}
//                 className="text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <form onSubmit={handleVerifyEmail} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
//                   Enter the 4-digit code sent to your email:
//                 </label>
//                 <OTPInput length={4} onComplete={handleVerificationComplete} />
//               </div>

//               {verificationError && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                   {verificationError}
//                 </div>
//               )}

//               {verificationMessage && (
//                 <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
//                   {verificationMessage}
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 <button
//                   type="submit"
//                   disabled={verificationLoading || verificationCode.length !== 4}
//                   className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-lg"
//                 >
//                   {verificationLoading ? 'Verifying...' : 'Verify Email'}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleResendCode}
//                   disabled={verificationLoading}
//                   className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200 font-medium border border-gray-300"
//                 >
//                   Resend Code
//                 </button>
//               </div>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={handleBackFromVerification}
//                   className="text-gray-600 hover:text-gray-800 text-sm font-medium"
//                 >
//                   Back to Registration
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
//         {/* Left Side - Creative Illustration & Content */}
//         <div className="text-center lg:text-left space-y-8">
//           {/* Animated Header */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-center lg:justify-start space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <Rocket className="h-6 w-6 text-white" />
//               </div>
//               <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
//                 TaskFlow
//               </h1>
//             </div>
//             <p className="text-xl text-gray-700 max-w-md mx-auto lg:mx-0">
//               Transform your productivity with intelligent task management
//             </p>
//           </div>

//           {/* Animated Illustration */}
//           <div className="relative">
//             <div className="max-w-lg mx-auto lg:mx-0">
//               {/* Main Task Board */}
//               <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/40">
//                 <div className="space-y-4">
//                   {/* Task 1 */}
//                   <div className="flex items-center space-x-3 bg-white/80 rounded-2xl p-4 shadow-lg border-l-4 border-emerald-500 animate-slide-in">
//                     <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
//                     <div className="flex-1">
//                       <div className="w-3/4 h-3 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse"></div>
//                     </div>
//                   </div>
                  
//                   {/* Task 2 */}
//                   <div className="flex items-center space-x-3 bg-white/80 rounded-2xl p-4 shadow-lg border-l-4 border-cyan-500 animate-slide-in-delay">
//                     <Calendar className="h-5 w-5 text-cyan-500 flex-shrink-0" />
//                     <div className="flex-1">
//                       <div className="w-2/3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
//                     </div>
//                   </div>
                  
//                   {/* Task 3 */}
//                   <div className="flex items-center space-x-3 bg-white/80 rounded-2xl p-4 shadow-lg border-l-4 border-teal-500 animate-slide-in-delay-2">
//                     <TrendingUp className="h-5 w-5 text-teal-500 flex-shrink-0" />
//                     <div className="flex-1">
//                       <div className="w-4/5 h-3 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-pulse"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Floating Elements */}
//               <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-300/80 rounded-full animate-bounce shadow-lg"></div>
//               <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-300/80 rounded-full animate-bounce-delay shadow-lg"></div>
//               <div className="absolute top-1/2 -right-8 w-4 h-4 bg-cyan-400/80 rounded-full animate-pulse shadow-lg"></div>
//             </div>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
//             <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/30">
//               <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
//               <p className="text-sm font-semibold text-gray-700">Team Collaboration</p>
//             </div>
//             <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/30">
//               <Target className="h-8 w-8 text-teal-600 mx-auto mb-2" />
//               <p className="text-sm font-semibold text-gray-700">Smart Goals</p>
//             </div>
//             <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/30">
//               <Zap className="h-8 w-8 text-amber-600 mx-auto mb-2" />
//               <p className="text-sm font-semibold text-gray-700">Lightning Fast</p>
//             </div>
//             <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/30">
//               <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
//               <p className="text-sm font-semibold text-gray-700">95% Success Rate</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div className={`bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 lg:p-10 border border-white/40 transition-all duration-300 ${
//           showVerification ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'
//         }`}>
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               Start Your Journey
//             </h2>
//             <p className="text-gray-600">
//               Join 50,000+ productive people
//             </p>
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-rose-50/80 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl backdrop-blur-sm">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-sm">{error}</span>
//                 </div>
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">
//                   Username
//                 </label>
//                 <div className="relative group">
//                   <input
//                     name="username"
//                     type="text"
//                     required
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm"
//                     placeholder="Enter your username"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <input
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <input
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm pr-12"
//                     placeholder="Create a password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-500 group-hover/eye:text-gray-700 transition-colors" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-500 group-hover/eye:text-gray-700 transition-colors" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Password Requirements */}
//                 {formData.password && (
//                   <div className="mt-3 p-4 bg-gray-50/80 rounded-xl border border-gray-200 space-y-2">
//                     <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
//                     <PasswordRequirement 
//                       met={passwordRequirements.length} 
//                       text="At least 6 characters" 
//                     />
//                     <PasswordRequirement 
//                       met={passwordRequirements.uppercase} 
//                       text="One capital letter (A-Z)" 
//                     />
//                     <PasswordRequirement 
//                       met={passwordRequirements.number} 
//                       text="One number (0-9)" 
//                     />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-800 mb-2">
//                   Confirm Password
//                 </label>
//                 <input
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 hover:border-gray-400 backdrop-blur-sm"
//                   placeholder="Confirm your password"
//                 />
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={acceptedTerms}
//                 onChange={(e) => setAcceptedTerms(e.target.checked)}
//                 className="w-4 h-4 text-emerald-600 bg-white/80 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 mt-1"
//               />
//               <label htmlFor="terms" className="text-sm text-gray-700">
//                 I agree to the{' '}
//                 <Link to="/terms" className="text-gray-800 hover:text-black font-semibold">
//                   Terms and Conditions
//                 </Link>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !acceptedTerms}
//               className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
//             >
//               <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               <div className="relative flex items-center justify-center">
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                     Creating Account...
//                   </>
//                 ) : (
//                   <>
//                     <UserPlus className="h-5 w-5 mr-2" />
//                     Create Account
//                   </>
//                 )}
//               </div>
//             </button>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-gray-600 text-sm">
//               Already have an account?{' '}
//               <Link to="/login" className="font-semibold text-gray-800 hover:text-black transition-colors">
//                 Sign in here
//               </Link>
//             </p>
//           </div>

//           {/* Trust Indicators */}
//           <div className="mt-8 pt-6 border-t border-gray-300/50">
//             <div className="text-center">
//               <p className="text-sm text-gray-600 mb-4">Trusted by teams at</p>
//               <div className="flex justify-center items-center space-x-8 opacity-70">
//                 <div className="text-xs font-semibold text-gray-700 bg-white/50 px-3 py-1 rounded-lg backdrop-blur-sm">
//                   TechCorp
//                 </div>
//                 <div className="text-xs font-semibold text-gray-700 bg-white/50 px-3 py-1 rounded-lg backdrop-blur-sm">
//                   InnovateLab
//                 </div>
//                 <div className="text-xs font-semibold text-gray-700 bg-white/50 px-3 py-1 rounded-lg backdrop-blur-sm">
//                   StartUpHub
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slide-in {
//           from {
//             transform: translateX(-100px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         @keyframes slide-in-delay {
//           0% {
//             transform: translateX(-100px);
//             opacity: 0;
//           }
//           50% {
//             transform: translateX(-100px);
//             opacity: 0;
//           }
//           100% {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         @keyframes slide-in-delay-2 {
//           0% {
//             transform: translateX(-100px);
//             opacity: 0;
//           }
//           66% {
//             transform: translateX(-100px);
//             opacity: 0;
//           }
//           100% {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         @keyframes bounce-delay {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
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

//         .animate-slide-in {
//           animation: slide-in 0.6s ease-out;
//         }
//         .animate-slide-in-delay {
//           animation: slide-in-delay 0.8s ease-out;
//         }
//         .animate-slide-in-delay-2 {
//           animation: slide-in-delay-2 1s ease-out;
//         }
//         .animate-bounce-delay {
//           animation: bounce-delay 2s ease-in-out infinite 0.5s;
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

// export default Register;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, UserPlus, Rocket, Zap, Target, CheckCircle, Calendar, TrendingUp, Users, X, Mail, Check, X as XIcon } from 'lucide-react';
import OTPInput from '../components/OTPInput.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false
  });
  
  const { register, verifyEmail, sendVerificationCode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (formData.password) {
      const { requirements } = validatePassword(formData.password);
      setPasswordRequirements(requirements);
    } else {
      setPasswordRequirements({
        length: false,
        uppercase: false,
        number: false
      });
    }
  }, [formData.password]);

  // Track navigation state
  const [isReturningFromTerms, setIsReturningFromTerms] = useState(false);

  // Load form data from localStorage only when returning from terms page
  useEffect(() => {
    // Check if we're returning from terms page
    const navigationState = location.state;
    if (navigationState && navigationState.fromTerms) {
      const savedFormData = localStorage.getItem('registerFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData({
          username: parsedData.username || '',
          email: parsedData.email || '',
          password: parsedData.password || '',
          confirmPassword: parsedData.confirmPassword || ''
        });
        setAcceptedTerms(parsedData.acceptedTerms || false);
      }
      setIsReturningFromTerms(true);
    } else {
      // Clear form data if coming from anywhere else
      localStorage.removeItem('registerFormData');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setAcceptedTerms(false);
    }
  }, [location]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (isReturningFromTerms) {
      const dataToSave = {
        ...formData,
        acceptedTerms
      };
      localStorage.setItem('registerFormData', JSON.stringify(dataToSave));
    }
  }, [formData, acceptedTerms, isReturningFromTerms]);

  // Clear form data when component unmounts (except when going to terms page)
  useEffect(() => {
    return () => {
      // Only clear if we're not navigating to terms page
      if (!isReturningFromTerms) {
        localStorage.removeItem('registerFormData');
      }
    };
  }, [isReturningFromTerms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Enhanced password validation
    const { isValid, requirements } = validatePassword(formData.password);
    if (!isValid) {
      const missingRequirements = [];
      if (!requirements.length) missingRequirements.push('at least 6 characters');
      if (!requirements.uppercase) missingRequirements.push('one capital letter');
      if (!requirements.number) missingRequirements.push('one number');
      setError(`Password must contain: ${missingRequirements.join(', ')}`);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the Terms and Conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await register(formData.username, formData.email, formData.password);
      localStorage.removeItem('registerFormData');
      
      // Show verification overlay instead of navigating
      setRegisteredEmail(formData.email);
      setShowVerification(true);
      
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationComplete = (enteredCode) => {
    setVerificationCode(enteredCode);
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 4) {
      setVerificationError('Please enter the 4-digit code');
      return;
    }

    setVerificationLoading(true);
    setVerificationError('');

    try {
      const userId = localStorage.getItem('tempUserId');
      await verifyEmail(registeredEmail, verificationCode, userId);
      setVerificationMessage('Email verified successfully! Redirecting to login...');
      
      localStorage.removeItem('tempUserId');
      localStorage.removeItem('registerFormData');
      
      setTimeout(() => {
        setShowVerification(false);
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setVerificationError(error.message || 'Failed to verify email');
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleResendCode = async () => {
    setVerificationLoading(true);
    setVerificationError('');
    setVerificationMessage('');

    try {
      await sendVerificationCode(registeredEmail);
      setVerificationMessage('New verification code sent to your email!');
    } catch (error) {
      setVerificationError(error.message || 'Failed to send verification code');
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleBackFromVerification = () => {
    setShowVerification(false);
    setVerificationCode('');
    setVerificationError('');
    setVerificationMessage('');
  };

  // Update your Terms and Conditions Link to pass state
  const TermsLink = () => (
    <Link 
      to="/terms" 
      state={{ fromTerms: true }}
      className="text-gray-800 hover:text-black font-semibold"
    >
      Terms and Conditions
    </Link>
  );

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
        <XIcon className="h-4 w-4 text-gray-400" />
      )}
      <span className={`text-sm ${met ? 'font-medium' : ''}`}>{text}</span>
    </div>
  );

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

      {/* Email Verification Overlay */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
                  <p className="text-sm text-gray-600">{registeredEmail}</p>
                </div>
              </div>
              <button
                onClick={handleBackFromVerification}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleVerifyEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter the 4-digit code sent to your email:
                </label>
                <OTPInput length={4} onComplete={handleVerificationComplete} />
              </div>

              {verificationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {verificationError}
                </div>
              )}

              {verificationMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {verificationMessage}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={verificationLoading || verificationCode.length !== 4}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-lg"
                >
                  {verificationLoading ? 'Verifying...' : 'Verify Email'}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={verificationLoading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200 font-medium border border-gray-300"
                >
                  Resend Code
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackFromVerification}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side - Creative Illustration & Content */}
        <div className="text-center lg:text-left space-y-8">
          {/* Animated Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            <p className="text-xl text-gray-700 max-w-md mx-auto lg:mx-0">
              Transform your productivity with intelligent task management
            </p>
          </div>

          {/* Rest of your component remains exactly the same */}
          {/* ... (keep all the existing JSX code as it was) ... */}
        </div>

        {/* Right Side - Signup Form */}
        <div className={`bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 lg:p-10 border border-white/40 transition-all duration-300 ${
          showVerification ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Start Your Journey
            </h2>
            <p className="text-gray-600">
              Join 50,000+ productive people
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50/80 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Username
                </label>
                <div className="relative group">
                  <input
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm"
                    placeholder="Enter your username"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm"
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm pr-12"
                    placeholder="Create a password"
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
                {formData.password && !allRequirementsMet && (
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
                {formData.password && allRequirementsMet && (
                  <div className="mt-3 p-3 bg-green-50/80 border border-green-200 rounded-xl">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Password meets all requirements!</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 hover:border-gray-400 backdrop-blur-sm"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 text-emerald-600 bg-white/80 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{' '}
                <TermsLink />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Account
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-gray-800 hover:text-black transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-300/50">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Trusted by teams at</p>
              <div className="flex justify-center items-center space-x-8 opacity-70">
                <div className="text-xs font-semibold text-gray-700 bg-white/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                  TechCorp
                </div>
                <div className="text-xs font-semibold text-gray-700 bg-white/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                  InnovateLab
                </div>
                <div className="text-xs font-semibold text-gray-700 bg-white/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                  StartUpHub
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keep all your existing styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-delay {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-delay-2 {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          66% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes bounce-delay {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
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

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        .animate-slide-in-delay {
          animation: slide-in-delay 0.8s ease-out;
        }
        .animate-slide-in-delay-2 {
          animation: slide-in-delay-2 1s ease-out;
        }
        .animate-bounce-delay {
          animation: bounce-delay 2s ease-in-out infinite 0.5s;
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

export default Register;