import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const Navigate =useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const url = `http://192.168.1.109:5000/api/users`;
      const response = await axios.get(url,{withCredentials:true});
      const data = response.data;

      const users = Array.isArray(data) ? data : data.users;

      setUsers(users);
      //console.log("Users fetch successfully ", users);
    } catch (error) {
      console.log("Error Fetching Users ", error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
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
      const role = existUser.role;
      console.log("login successfull ", existUser);
      
      return { success: true, message: msg , role };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      console.log("Error! User cannot be created ", error);
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      const url = "http://192.168.1.109:5000/api/auth/logout";
      const response = await axios.post(url, {},{ withCredentials: true });
      alert(response.data.message);
      Navigate("/form");
    } catch (error) {
      console.log("error logging out :: ", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const url = `http://192.168.1.109:5000/api/delete-user/${userId}`;
      await axios.delete(url, { withCredentials: true });
      console.log("User deleted successfully");
    } catch (error) {
      console.log("Error deleting User :: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        fetchUsers,
        users,
        deleteUser,
        loading,
        loginUser,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
