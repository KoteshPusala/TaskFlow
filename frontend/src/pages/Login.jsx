import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, LogIn, Rocket, Zap, Target, CheckCircle, Users, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      let errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      errorMessage = errorMessage.replace(/[^\x20-\x7E]/g, '');
      errorMessage = errorMessage.replace(/[^\w\s.,!?\-@:()]/g, '');
      errorMessage = errorMessage.trim();
      
      if (!errorMessage) {
        errorMessage = 'Login failed. Please try again.';
      }
      
      // Check if user needs email verification
      if (errorMessage.includes('verify your email') || 
          errorMessage.includes('not verified') ||
          errorMessage.includes('verify email')) {
        
        // Store email for verification page
        localStorage.setItem('pendingVerificationEmail', formData.email);
        
        // Redirect to verification page
        navigate('/verify-email', { 
          state: { 
            email: formData.email,
            fromLogin: true 
          } 
        });
        return;
      }
      
      setError(errorMessage);
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
            <p className="text-xl text-emerald-700/80 max-w-md mx-auto lg:mx-0">
              Welcome back to your peaceful productivity space
            </p>
          </div>

          {/* Animated Dashboard Preview */}
          <div className="relative">
            <div className="max-w-lg mx-auto lg:mx-0">
              {/* Dashboard Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/40">
                <div className="space-y-6">
                  {/* Welcome Message */}
                  <div className="text-center animate-fade-in">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-800">Welcome Back!</h3>
                    <p className="text-emerald-600/80 text-sm mt-1">Ready to continue your productivity journey?</p>
                  </div>
                  
                  {/* Stats Preview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/60">
                      <div className="text-lg font-bold text-emerald-600">12</div>
                      <div className="text-xs text-emerald-700/80">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-cyan-50/80 rounded-2xl border border-cyan-200/60">
                      <div className="text-lg font-bold text-cyan-600">5</div>
                      <div className="text-xs text-cyan-700/80">In Progress</div>
                    </div>
                    <div className="text-center p-3 bg-teal-50/80 rounded-2xl border border-teal-200/60">
                      <div className="text-lg font-bold text-teal-600">3</div>
                      <div className="text-xs text-teal-700/80">Upcoming</div>
                    </div>
                  </div>
                  
                  {/* Quick Task Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-2xl border border-emerald-200/40 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-emerald-800">Team Meeting</span>
                      </div>
                      <div className="text-xs text-emerald-600/70">Today</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-2xl border border-emerald-200/40 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-emerald-800">Project Review</span>
                      </div>
                      <div className="text-xs text-emerald-600/70">Tomorrow</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-300/80 rounded-full animate-bounce shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-300/80 rounded-full animate-bounce-delay shadow-lg"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-cyan-400/80 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>

          {/* User Testimonials */}
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">SD</span>
                </div>
                <div>
                  <p className="text-sm text-emerald-800 italic">
                    "TaskFlow helped our team increase productivity by 40%!"
                  </p>
                  <p className="text-xs text-emerald-600/70 mt-1">- Sarah D., Team Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 lg:p-10 border border-white/40">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-emerald-600/80">
              Sign in to your peaceful workspace
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

            {window.location.search.includes('session=expired') && (
                <div className="bg-amber-50/80 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl backdrop-blur-sm mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Your session has expired. Please login again.</span>
                  </div>
                </div>
              )}


            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 group-hover:border-gray-400 backdrop-blur-sm pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 group-hover/eye:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 group-hover/eye:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-emerald-600 bg-white/80 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors"
              >
                Forgot password?
              </Link>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                    Sign In to Dashboard
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Join TaskFlow
              </Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Join 50,000+ peaceful productive users</p>
              <div className="flex justify-center space-x-6 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>2M+ Tasks Completed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>95% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
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

export default Login;