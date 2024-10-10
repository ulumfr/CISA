import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("token", null);
  const [expirationTime, setExpirationTime] = useLocalStorage(
    "tokenExpiration",
    null
  );
  const [sekolahId, setSekolahId] = useState(null);
  const [role, setRole] = useState(null);
  const [namaSekolah, setNamaSekolah] = useState(null);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  };

  const initializeAuth = () => {
    if (user && expirationTime) {
      if (isTokenExpired()) {
        logout();
      } else {
        const decodedToken = parseJwt(user);
        if (decodedToken) {
          setSekolahId(decodedToken.sekolahId);
          setRole(decodedToken.role);
          setNamaSekolah(decodedToken.namaSekolah);
          axios.defaults.headers.common["Authorization"] = `Bearer ${user}`;
        }
      }
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const login = (data) => {
    if (!data.token) {
      console.error("No token provided");
      return;
    }

    const expirationTime = new Date().getTime() + 6 * 3600 * 1000;
    setUser(data.token);
    setExpirationTime(expirationTime);

    const decodedToken = parseJwt(data.token);

    setSekolahId(decodedToken?.sekolahId);
    setRole(decodedToken?.role);
    setNamaSekolah(decodedToken?.namaSekolah);

    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    navigate("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setUser(null);
    setExpirationTime(null);
    setSekolahId(null);
    setRole(null);
    setNamaSekolah(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/auth/login", { replace: true });
  };

  const isTokenExpired = () => {
    const currentTime = new Date().getTime();
    return currentTime > expirationTime;
  };

  useEffect(() => {
    if (user && expirationTime) {
      const interval = setInterval(() => {
        if (isTokenExpired()) {
          logout();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user, expirationTime]);

  return (
    <AuthContext.Provider
      value={{ user, sekolahId, login, logout, role, namaSekolah }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
