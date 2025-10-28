// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { TodoProvider } from './contexts/TodoContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';


// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <TodoProvider>
//           <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route 
//                 path="/dashboard" 
//                 element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 } 
//               />
//               {/* Catch all route - redirect to dashboard */}
//               <Route path="*" element={<Navigate to="/dashboard" replace />} />
//             </Routes>
//           </div>
//         </TodoProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// Import new components
import EmailVerification from './components/EmailVerification';
import ForgotPassword from './components/ForgotPassword';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Catch all route - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;