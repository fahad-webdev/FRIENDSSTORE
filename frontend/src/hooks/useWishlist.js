import { useState, useEffect } from "react";
import axios from "axios";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const fetchWishlist = async () => {
    try {
      const url = `http://192.168.1.109:5000/api/wishlist/`;
      const response = await axios.get(url, { withCredentials: true });
      setWishlist(response.data.wishlist.items);
    } catch (error) {
      console.log("error fetching wishlist ", error);
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
      setWishlist(response.data.wishlist.items);
      alert(response.data.message);
    } catch (error) {
      console.log("error adding product in wishlist ", error);
    }
  };
  return {
    fetchWishlist,
    addToWishlist,
    wishlist
  };
};
