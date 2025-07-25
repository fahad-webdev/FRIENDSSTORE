import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthentic, verifyUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasMounted = useRef(false); // Prevents early sync on load

  useEffect(() => {
    verifyUser();
  }, []);
  const normalizeCartItems = (items) =>
    items.map((item) => ({
      ...item.productID, // pull title, price, etc.
      quantity: item.quantity,
      size: item.size,
    }));
  const getCart = async () => {
     setLoading(true);
    try {
      const url = `http://192.168.1.109:5000/api/cart`;
      const response = await axios.get(url, { withCredentials: true });
      //console.log("cart fetched successfully (database) :: ", cart);
      setCartItems(response.data.cart.items);
    } catch (error) {
      console.log("error! fetching cart failed (database) :: ", error);
    }
    finally{
      setLoading(false);
    }
  };
  //function to add product to cart
  const addToCart = async (product, size) => {
    if (product.stock >= 5) {
      if (!user) {
        const exist = cartItems.find(
          (cartItem) => cartItem._id === product._id && cartItem.size === size
        );

        if (exist) {
          setCartItems(
            cartItems.map((cartItem) =>
              cartItem._id === product._id
                ? { ...cartItem, quantity: cartItem.quantity + 1, size }
                : cartItem
            )
          );
          //console.log("Product added to cart (localstorage)");
          alert("Product Added to Cart");
          getCart(); //to refresh the list
        } else {
          alert("Product Added to Cart");
          return setCartItems([
            ...cartItems,
            { ...product, quantity: 1, size },
          ]);
        }
      } else {
        const url = `http://192.168.1.109:5000/api/cart/add`;
        const response = await axios.post(
          url,
          {
            productID: product._id,
            quantity: 1,
            size,
          },
          { withCredentials: true }
        );
        //console.log("cart added (database):: ", response.data.cart);
        alert("Product Added to Cart");
        getCart(); //to refresh the list
      }
    } else {
      alert("This product is in low stock");
    }
  };

  const updateCart = async (productId, quantity, size) => {
    if (!user) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === productId && cartItem.size === size
            ? { ...cartItem, quantity: quantity }
            : cartItem
        )
      );
    } else {
      try {
        const url = `http://192.168.1.109:5000/api/cart/update`;
        const response = await axios.put(
          url,
          { productID: productId, quantity, size },
          { withCredentials: true }
        );
        //alert("Cart updated successfully");
        //console.log("Cart updated successfully (database) :: ",response.data.cart);
        getCart();
      } catch (error) {
        console.log("Error! updating cart ", error);
      }
    }
  };

  const removeCart = async (productId, size) => {
    if (!user) {
      setCartItems(
        cartItems.filter(
          (cartItem) => !(cartItem._id === productId && cartItem.size === size)
        )
      );
    } else {
      try {
        const url = `http://192.168.1.109:5000/api/cart/remove`;
        const response = await axios.delete(url, {
          withCredentials: true,
          data: { productID: productId, size }, // Important: Send body this way with axios.delete
        });
        console.log(
          "cart deleted successfully (database) :: ",
          response.data.cart
        );
        await getCart(); //to refresh the list
      } catch (error) {
        console.log("error deleting cart (database) : ", error);
      }
    }
  };

  const clearCart = async () => {
    if (!user) {
      localStorage.removeItem("GuestCart");
      setCartItems([]);
    } else {
      try {
        const url = `http://192.168.1.109:5000/api/cart/clear`;
        const response = await axios.put(url, {}, { withCredentials: true });
        await getCart();
      } catch (error) {
        console.log("Error! clearning cart :: ", error);
      }
    }
  };

  // Load from localStorage on first mount
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("GuestCart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCartItems(parsed);
          console.log("Initial Load:", parsed);
        } catch (error) {
          console.error("Error parsing stored cart:", error);
        }
      }
    } else {
      getCart();
    }
  }, [user]);

  // Only sync to localStorage after initial load
  useEffect(() => {
    if (!user && hasMounted.current) {
      console.log("Syncing to localStorage:", cartItems);
      localStorage.setItem("GuestCart", JSON.stringify(cartItems));
    } else {
      hasMounted.current = true; // set true after first render
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        loading,
        getCart,
        addToCart,
        clearCart,
        updateCart,
        removeCart,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  //hook so i can use context anywhere i want
  return useContext(CartContext);
};
