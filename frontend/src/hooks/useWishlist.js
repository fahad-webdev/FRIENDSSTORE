import { useState, useEffect } from "react";
import axios from "axios";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const url = `http://192.168.1.109:5000/api/wishlist/`;
      const response = await axios.get(url, { withCredentials: true });
      setWishlist(response.data.wishlist.items || []);
    } catch (error) {
      console.log("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product, size) => {
    try {
      const url = `http://192.168.1.109:5000/api/wishlist/add`;
      const response = await axios.post(
        url,
        { productId: product._id, size },
        { withCredentials: true }
      );
      alert(response.data.message);
      await fetchWishlist(); 
    } catch (error) {
      console.log("Error adding product to wishlist:", error);
    }
  };

  const removeWishlist = async (productId, size) => {
    try {
      const url = `http://192.168.1.109:5000/api/wishlist/remove`;
      const response = await axios.post(
        url,
        { productId, size },
        { withCredentials: true }
      );
      alert(response.data.message);
      await fetchWishlist(); 
    } catch (error) {
      console.log("Error removing product from wishlist:", error);
    }
  };

  const clearWishlist = async () => {
    try {
      const url = `http://192.168.1.109:5000/api/wishlist/clear`;
      const response = await axios.delete(url, { withCredentials: true });
      alert(response.data.message);
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
    fetchWishlist
  };
};
