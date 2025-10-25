import { createContext, useState, useEffect } from "react";
import { login, signup } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleLogin = async (data) => {
    const res = await login(data);
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  };

  const handleSignup = async (data) => {
    const res = await signup(data);
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// import React, { createContext, useState, useEffect } from "react";

// // Create context
// export const AuthContext = createContext();

// // Provider component
// export const AuthProvider = ({ children }) => {
//   // Initialize user state safely from localStorage
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (err) {
//       console.error("Failed to parse stored user:", err);
//       return null;
//     }
//   });

//   // Keep localStorage in sync when user changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   // Login function
//   const login = (userData) => {
//     setUser(userData);
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
