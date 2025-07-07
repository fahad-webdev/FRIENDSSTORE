import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthentic, setIsAuthentic] = useState(false);

  const verifyUser = async () => {
    const url = `http://192.168.1.109:5000/api/auth/verify`;
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

  const fetchUserProfile =async ()=>{
    try {
      const url=`http://192.168.1.109:5000/api/user/profile`;
      const response = await axios.get(url,{withCredentials:true});
      console.log("User profile :: ", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log("Error fetching user profile information ",error);
    }
  }

  const register = async (userData) => {
    try {
      const url = `http://192.168.1.109:5000/api/auth/signup`;
      const response = await axios.post(url, userData, {
        withCredentials: true,
      });
      const newUser = response.data.user || response.data;
      const msg = newUser.message || "User created successfully";
      return { success: true, message: msg };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      //console.log("Error! User cannot be created ", error);
      return { success: false, message: msg };
    }
  };

  const loginUser = async (form) => {
    try {
      const url = `http://192.168.1.109:5000/api/auth/login`;
      const response = await axios.post(url, form, {
        withCredentials: true, // Ensuring cookies are sent with cross-origin requests
      });
      const existUser = response.data.user || response.data;
      const msg = existUser.message || "Login Successfull";
      const role = existUser?.role;
      console.log("login successfull ", existUser);
      setUser(existUser);
      return { success: true, message: msg, role };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      console.log("Error! Login Failed ", error);
      return { success: false, message: msg };
    }
    s;
  };

  const logout = async () => {
    try {
      const url = "http://192.168.1.109:5000/api/auth/logout";
      const response = await axios.post(url, {}, { withCredentials: true });
      //alert(response.data.message);
      setUser(null);
      setIsAuthentic(false);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.log("error logging out :: ", error);
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
