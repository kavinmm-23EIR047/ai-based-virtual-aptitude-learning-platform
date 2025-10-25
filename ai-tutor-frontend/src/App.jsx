// import React, { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, AuthContext } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import TopicDetail from "./pages/TopicDetail";
// import Quiz from "./pages/Quiz";
// import ChatbotPage from "./pages/ChatbotPage"; // ← Import ChatbotPage
// import NotFound from "./pages/NotFound";

// // ProtectedRoute ensures only logged-in users can access
// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   return user ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Protected Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/topic/:id"
//             element={
//               <ProtectedRoute>
//                 <TopicDetail />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/quiz/:id"
//             element={
//               <ProtectedRoute>
//                 <Quiz />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/chatbot/:topicId" // ← Chatbot route
//             element={
//               <ProtectedRoute>
//                 <ChatbotPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* Fallback route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TopicDetail from "./pages/TopicDetail";
import Quiz from "./pages/Quiz";
import ChatbotPage from "./pages/ChatbotPage";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";

// ProtectedRoute ensures only logged-in users can access
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/topic/:id"
            element={
              <ProtectedRoute>
                <TopicDetail />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />

          {/* Chatbot general page */}
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <ChatbotPage />
              </ProtectedRoute>
            }
          />

          {/* Chatbot topic-specific page */}
          <Route
            path="/chatbot/:topicId"
            element={
              <ProtectedRoute>
                <ChatbotPage />
              </ProtectedRoute>
            }
          />

          {/* Progress Page */}
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
