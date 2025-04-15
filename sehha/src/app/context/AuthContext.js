"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Poll every second to update the logged-in state based on the token's existence.
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof document !== "undefined") {
        const tokenExists = document.cookie.includes("token=");
        setIsLoggedIn(tokenExists);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // You could also provide manual login/logout functions to update the state.
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
