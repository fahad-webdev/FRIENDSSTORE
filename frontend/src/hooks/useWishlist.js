import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/wishlist/`;
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      setWishlist(response.data.wishlist.items || []);
    } catch (error) {
      console.log("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product, size) => {
    try {
      const url = `${BASE_URL}/wishlist/add`;
      const response = await axios.post(
        url,
        { productId: product._id, size },
        {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      }
      );
      console.log("Wishlist added :: ", response.data.message);
      toast.success(response.data.message || "Added Successfully");
      await fetchWishlist();
    } catch (error) {
      console.log("Error adding product to wishlist:", error);
    }
  };

  const removeWishlist = async (productId, size) => {
    try {
      const url = `${BASE_URL}/wishlist/remove`;
      const response = await axios.post(
        url,
        { productId, size },
        {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      }
      );
      toast.success(response.data.message);
      await fetchWishlist();
    } catch (error) {
      console.log("Error removing product from wishlist:", error);
    }
  };

  const clearWishlist = async () => {
    try {
      const url = `${BASE_URL}/wishlist/clear`;
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message);
      await fetchWishlist();
    } catch (error) {
      console.log("Error clearing wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return {
    loading,
    wishlist,
    addToWishlist,
    removeWishlist,
    clearWishlist,
    fetchWishlist,
  };
};
