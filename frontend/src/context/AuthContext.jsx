import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Simulated user for demo purposes
const DEMO_USER = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@eventpulse.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  role: "user",
  joinDate: "January 2024",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (credentials) => {
    setUser(DEMO_USER);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
