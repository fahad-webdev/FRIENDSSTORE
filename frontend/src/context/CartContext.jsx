import { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const hasMounted = useRef(false); // Prevents early sync on load

  // Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("GuestCart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCartItems(parsed);
        console.log("Initial Load:", parsed);
      } catch (e) {
        console.error("Error parsing stored cart:", e);
      }
    }
  }, []);

  // Only sync to localStorage after initial load
  useEffect(() => {
    if (hasMounted.current) {
      console.log("Syncing to localStorage:", cartItems);
      localStorage.setItem("GuestCart", JSON.stringify(cartItems));
    } else {
      hasMounted.current = true; // set true after first render
    }
  }, [cartItems]);

  const addToCart = (product) => {
    const exist = cartItems.find((cartItem) => cartItem._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      alert("Product Added to Cart");
    } else {
      if (product.stock >= 5) {
        alert("Product Added to Cart");
        return setCartItems([...cartItems, { ...product, quantity: 1 }]);
      } else {
        return alert("Product is in low stock");
      }
    }
  };

  const updateCart = (productId, quantity) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === productId
          ? { ...cartItem, quantity: quantity }
          : cartItem
      )
    );
  };

  const removeCart = (productId) => {
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== productId));
  };

  const clearCart = () => {
    localStorage.removeItem("GuestCart");
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
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
