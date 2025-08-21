import axios from "axios";
import { useState } from "react";
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const url = `${BASE_URL}/users`;
      const response = await axios.get(url,  {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
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
      const url = `${BASE_URL}/users`;
      const response = await axios.post(url, userData,  {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
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

  const deleteUser = async (userId) => {
    try {
      const url = `${BASE_URL}/users/${userId}`;
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      console.log("User deleted successfully");
      return { success: true, message: response.data.message };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      return { success: false, message: msg };
    }
  };
  return { fetchUsers, createUser, deleteUser, users, loading };
};
