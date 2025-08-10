import axios from "axios";
import { useState } from "react";
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/users`;
      const response = await axios.get(url, { withCredentials: true });
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
      const url = `http://localhost:5000/api/users`;
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

  const deleteUser = async (userId) => {
    try {
      const url = `http://localhost:5000/api/users/${userId}`;
      const response = await axios.delete(url, { withCredentials: true });
      console.log("User deleted successfully");
      return { success: true, message: response.data.message };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      return { success: false, message: msg };
    }
  };
  return { fetchUsers, createUser, deleteUser, users, loading };
};
