// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/auth';

// class AuthService {
//   constructor() {
//     this.token = localStorage.getItem('token');
//     this.setupInterceptors();
//   }

//   setupInterceptors() {
//     // Add token to requests
//     axios.interceptors.request.use(
//       (config) => {
//         if (this.token && config.url.startsWith('http://localhost:5000/api')) {
//           config.headers.Authorization = `Bearer ${this.token}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // Handle session timeout responses
//     axios.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         if (error.response?.status === 401 && error.response?.data?.message === 'Session expired. Please login again.') {
//           // Clear local storage and redirect to login
//           localStorage.removeItem('token');
//           localStorage.removeItem('lastActivity');
//           this.token = null;
//           window.location.href = '/login?session=expired';
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   setToken(token) {
//     this.token = token;
//     if (token) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }
//   }

//   async login(email, password) {
//     try {
//       const response = await axios.post(`${API_URL}/login`, { email, password });
//       return response.data;
//     } catch (error) {
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Login failed. Please try again.');
//     }
//   }

//   async register(username, email, password) {
//     try {
//       const response = await axios.post(`${API_URL}/register`, { username, email, password });
//       return response.data;
//     } catch (error) {
//       // Extract the actual error message from backend
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Registration failed. Please try again.');
//     }
//   }

//   async verifyEmail(email, code, userId = null) {
//     try {
//       const response = await axios.post(`${API_URL}/verify-email`, { email, code, userId });
//       return response.data;
//     } catch (error) {
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Email verification failed.');
//     }
//   }

//   async sendVerificationCode(email) {
//     try {
//       const response = await axios.post(`${API_URL}/send-verification`, { email });
//       return response.data;
//     } catch (error) {
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Failed to send verification code.');
//     }
//   }

//   async sendPasswordResetCode(email) {
//     try {
//       const response = await axios.post(`${API_URL}/forgot-password`, { email });
//       return response.data;
//     } catch (error) {
//       // If 404, return mock success for development
//       if (error.response?.status === 404) {
//         console.log('🔧 Mock: Password reset code sent to', email);
//         return { 
//           success: true, 
//           message: 'Password reset code sent to your email! (Demo Mode)' 
//         };
//       }
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Failed to send reset code. Please try again.');
//     }
//   }

//   async verifyResetCode(email, code) {
//     try {
//       const response = await axios.post(`${API_URL}/verify-reset-code`, { email, code });
//       return response.data;
//     } catch (error) {
//       // If 404, mock verification for development
//       if (error.response?.status === 404) {
//         console.log('🔧 Mock: Verifying code', code, 'for', email);
//         // Accept any 4-digit code for demo
//         if (code.length === 4) {
//           return { 
//             success: true, 
//             message: 'Code verified successfully! (Demo Mode)' 
//           };
//         }
//         throw new Error('Invalid verification code');
//       }
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Failed to verify code. Please try again.');
//     }
//   }

//   async resetPassword(email, code, newPassword) {
//     try {
//       const response = await axios.post(`${API_URL}/reset-password`, { 
//         email, 
//         code, 
//         newPassword 
//       });
//       return response.data;
//     } catch (error) {
//       // If 404, mock success for development
//       if (error.response?.status === 404) {
//         console.log('🔧 Mock: Password reset for', email);
//         return { 
//           success: true, 
//           message: 'Password reset successfully! You can now login with your new password. (Demo Mode)' 
//         };
//       }
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Failed to reset password. Please try again.');
//     }
//   }

//   async updateDarkMode(darkMode) {
//     try {
//       const response = await axios.put(`${API_URL}/theme`, { darkMode });
//       return response.data;
//     } catch (error) {
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Failed to update theme preference.');
//     }
//   }

//   async getUserProfile() {
//     try {
//       const response = await axios.get(`${API_URL}/profile`);
//       return response.data;
//     } catch (error) {
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Failed to fetch user profile.');
//     }
//   }

//   async getCurrentUser() {
//     try {
//       const response = await axios.get(`${API_URL}/me`);
//       return response.data;
//     } catch (error) {
//       const backendError = error.response?.data?.error || error.response?.data?.message;
//       throw new Error(backendError || 'Failed to fetch current user.');
//     }
//   }

//   async logout() {
//     try {
//       const response = await axios.post(`${API_URL}/logout`);
//       return response.data;
//     } catch (error) {
//       // Don't throw error for logout - it's not critical
//       console.log('Logout completed (session cleared locally)');
//       return { message: 'Logged out successfully' };
//     }
//   }
// }

// export const authService = new AuthService();
import api from './api';

export const authService = {
  setToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  async register(username, email, password) {
    try {
      console.log('🔵 Registering user:', { username, email });
      const response = await api.post('/auth/register', { username, email, password });
      console.log('🟢 Registration successful');
      return response.data;
    } catch (error) {
      console.error('🔴 Registration error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Registration failed');
    }
  },

  async login(email, password) {
    try {
      console.log('🔵 Logging in user:', email);
      const response = await api.post('/auth/login', { email, password });
      console.log('🟢 Login successful');
      return response.data;
    } catch (error) {
      console.error('🔴 Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Login failed');
    }
  },

  async logout() {
    try {
      console.log('🔵 Logging out user');
      const response = await api.post('/auth/logout');
      console.log('🟢 Logout successful');
      return response.data;
    } catch (error) {
      console.error('🔴 Logout error:', error.response?.data || error.message);
      // Don't throw error for logout - it's not critical
      return { message: 'Local logout completed' };
    }
  },

  async updateDarkMode(darkMode) {
    try {
      console.log('🔵 Updating theme preference:', darkMode);
      const response = await api.put('/auth/theme', { darkMode });
      console.log('🟢 Theme updated successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Theme update error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to update theme');
    }
  },

  async getCurrentUser() {
    try {
      console.log('🔵 Fetching current user');
      const response = await api.get('/auth/me');
      console.log('🟢 User data fetched successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Get user error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to get user data');
    }
  },

  async getUserProfile() {
    try {
      console.log('🔵 Fetching user profile');
      const response = await api.get('/auth/profile');
      console.log('🟢 Profile fetched successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Get profile error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to get profile');
    }
  },

  async sendVerificationCode(email) {
    try {
      console.log('🔵 Sending verification code to:', email);
      const response = await api.post('/auth/send-verification', { email });
      console.log('🟢 Verification code sent successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Send verification code error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to send verification code');
    }
  },

  async verifyEmail(email, code, userId = null) {
    try {
      console.log('🔵 Verifying email:', { email, code, userId });
      const response = await api.post('/auth/verify-email', { email, code, userId });
      console.log('🟢 Email verified successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Verify email error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to verify email');
    }
  },

  // UPDATED: Password reset functions with proper error handling
  async sendPasswordResetCode(email) {
    try {
      console.log('🔵 Sending password reset code to:', email);
      const response = await api.post('/auth/forgot-password', { email });
      console.log('🟢 Password reset code sent successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Send password reset code error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      // Pass the exact error from backend to frontend
      const errorMessage = error.response?.data?.error || error.message || 'Failed to send reset code';
      throw new Error(errorMessage);
    }
  },

  async verifyResetCode(email, code) {
    try {
      console.log('🔵 Verifying reset code:', { email, code });
      const response = await api.post('/auth/verify-reset-code', { email, code });
      console.log('🟢 Reset code verified successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Verify reset code error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to verify reset code');
    }
  },

  async resetPassword(email, code, newPassword) {
    try {
      console.log('🔵 Resetting password for:', email);
      const response = await api.post('/auth/reset-password', { email, code, newPassword });
      console.log('🟢 Password reset successfully');
      return response.data;
    } catch (error) {
      console.error('🔴 Reset password error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to reset password');
    }
  }
};