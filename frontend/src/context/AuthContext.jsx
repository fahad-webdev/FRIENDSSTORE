import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthentic, setIsAuthentic] = useState(false);
  const verifyCalledRef = useRef(false);

  // Consistent base URL
  const BASE_URL = "http://localhost:5000/api";

  const verifyUser = async () => {
    // Prevent multiple calls using ref
    if (verifyCalledRef.current) return;
    verifyCalledRef.current = true;
    
    const url = `${BASE_URL}/auth/verify`;
    setLoading(true);
    try {
      const response = await axios.get(url, { withCredentials: true });
      setUser(response.data.user);
      console.log("Authorized User :: ", response.data.user);
      setIsAuthentic(true);
    } catch (error) {
      console.log("Unauthorized user", error);
      setIsAuthentic(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Call verifyUser only once when the component mounts
  useEffect(() => {
    verifyUser();
  }, []); // Empty dependency array

  const fetchUserProfile = async () => {
    try {
      const url = `${BASE_URL}/user/profile`;
      const response = await axios.get(url, { withCredentials: true });
      console.log("User profile :: ", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log("Error fetching user profile information ", error);
    }
  };

  const register = async (userData) => {
    try {
      const url = `${BASE_URL}/auth/signup`;
      const response = await axios.post(url, userData, {
        withCredentials: true,
      });
      const newUser = response.data.user || response.data;
      const msg = newUser.message || "User created successfully";
      return { success: true, message: msg };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      return { success: false, message: msg };
    }
  };

  const loginUser = async (form) => {
    try {
      const url = `${BASE_URL}/auth/login`;
      const response = await axios.post(url, form, {
        withCredentials: true,
      });
      const existUser = response.data.user || response.data;
      const msg = existUser.message || "Login Successful";
      const role = existUser?.role;
      console.log("login successful ", existUser);
      setUser(existUser);
      setIsAuthentic(true); // Set authentication status
      return { success: true, message: msg, role };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      console.log("Error! Login Failed ", error);
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      const url = `${BASE_URL}/auth/logout`;
      const response = await axios.post(url, {}, { withCredentials: true });
      setUser(null);
      setIsAuthentic(false);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.log("error logging out :: ", error);
      return { success: false, message: "Logout failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthentic,
        fetchUserProfile,
        verifyUser,
        register,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};