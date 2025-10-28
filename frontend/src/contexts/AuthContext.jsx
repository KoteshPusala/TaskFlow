import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

// Session timeout constants - Direct logout after 30 minutes
const SESSION_TIMEOUT = 5* 60 * 1000; // 2 minutes

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  // Update user activity
  const updateUserActivity = () => {
    localStorage.setItem('lastActivity', Date.now().toString());
  };

  // Check session timeout
  const checkSessionTimeout = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity || !user) return;

    const currentTime = Date.now();
    const timeSinceLastActivity = currentTime - parseInt(lastActivity);

    // Show warning and logout immediately when timeout reached
    if (timeSinceLastActivity > SESSION_TIMEOUT) {
      setShowTimeoutWarning(true);
      // Auto logout after showing warning for 3 seconds
      setTimeout(() => {
        handleAutoLogout();
      }, 3000);
    }
  };

  // Auto logout function
  const handleAutoLogout = () => {
    setShowTimeoutWarning(false);
    logout();
    window.location.href = '/login?session=expired';
  };

  // Set up activity listeners
  useEffect(() => {
    if (!user) return;

    const activities = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      updateUserActivity();
    };

    activities.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      activities.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [user]);

  // Set up timeout check interval
  useEffect(() => {
    if (!user) return;

    updateUserActivity(); // Initialize on login

    const interval = setInterval(() => {
      checkSessionTimeout();
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  // Rest of your existing code remains the same...
  const updateUser = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const updateDarkMode = async (darkMode) => {
    try {
      const response = await authService.updateDarkMode(darkMode);
      updateUser({ darkMode });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await authService.getUserProfile();
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          authService.setToken(token);
          
          const userData = await authService.getCurrentUser();
          setUser(userData);
          updateUserActivity();
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('lastActivity');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      localStorage.setItem('token', response.token);
      authService.setToken(response.token);
      updateUserActivity();
      
      setUser(response.user);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await authService.register(username, email, password);
      
      if (response.userId) {
        localStorage.setItem('tempUserId', response.userId);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (email, code, userId = null) => {
    try {
      const tempUserId = userId || localStorage.getItem('tempUserId');
      const response = await authService.verifyEmail(email, code, tempUserId);
      localStorage.removeItem('tempUserId');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const sendVerificationCode = async (email) => {
    try {
      const response = await authService.sendVerificationCode(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const sendPasswordResetCode = async (email) => {
    try {
      const response = await authService.sendPasswordResetCode(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const verifyResetCode = async (email, code) => {
    try {
      const response = await authService.verifyResetCode(email, code);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    try {
      const response = await authService.resetPassword(email, code, newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
      setUser(null);
      setShowTimeoutWarning(false);
      localStorage.removeItem('token');
      localStorage.removeItem('tempUserId');
      localStorage.removeItem('lastActivity');
      authService.setToken(null);
      
      // Call backend logout but don't wait for it (non-blocking)
      authService.logout().catch(error => {
        console.log('Backend logout failed, but local logout completed:', error.message);
      });
    };
  const value = {
    user,
    login,
    register,
    logout,
    loading,
    sendVerificationCode,
    verifyEmail,
    sendPasswordResetCode,
    verifyResetCode,
    resetPassword,
    updateDarkMode,
    getUserProfile,
    updateUser,
    showTimeoutWarning
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Simple Session Expired Modal */}
      {showTimeoutWarning && (
        <SessionExpiredModal />
      )}
    </AuthContext.Provider>
  );
};

// Simple Session Expired Modal
const SessionExpiredModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in text-center">
        {/* Warning Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Session Expired
        </h3>
        
        <p className="text-gray-600 mb-2">
          Your session has expired due to inactivity.
        </p>

        <p className="text-sm text-gray-500">
          Redirecting to login page...
        </p>

        {/* Loading spinner */}
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AuthContext;