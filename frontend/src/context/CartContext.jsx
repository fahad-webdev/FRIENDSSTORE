import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthentic, verifyUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasMounted = useRef(false);
  const isInitialized = useRef(false);

  // Use environment variable for API URL
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Generate or get guest ID
  const getGuestId = useCallback(() => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId =
        "guest_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  }, []);

  // Verify user on mount
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // Initialize cart when user status changes
  useEffect(() => {
    if (!isInitialized.current) {
      initializeCart();
      isInitialized.current = true;
    }
  }, [user, isAuthentic]);

  // Initialize cart based on authentication status
  const initializeCart = async () => {
    setLoading(true);
    try {
      if (user && isAuthentic) {
        // Check if there's a guest cart to migrate
        const guestId = localStorage.getItem("guestId");
        const guestCart = localStorage.getItem(`GuestCart_${guestId}`);

        if (guestCart && guestCart !== "[]") {
          await migrateGuestCartToUser(guestId);
        } else {
          await getCart();
        }
      } else {
        loadGuestCart();
      }
    } catch (error) {
      console.error("Error initializing cart:", error);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Load guest cart from localStorage
  const loadGuestCart = () => {
    try {
      const guestId = getGuestId();
      const stored = localStorage.getItem(`GuestCart_${guestId}`);

      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate cart items and filter out invalid ones
        const validItems = parsed.filter(
          (item) => item && item._id && item.title && item.price
        );
        setCartItems(validItems);

        // Update localStorage if we filtered out invalid items
        if (validItems.length !== parsed.length) {
          localStorage.setItem(
            `GuestCart_${guestId}`,
            JSON.stringify(validItems)
          );
        }
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error loading guest cart:", error);
      setCartItems([]);
    }
  };

  // Save guest cart to localStorage
  const saveGuestCart = useCallback(
    (items) => {
      try {
        const guestId = getGuestId();
        localStorage.setItem(`GuestCart_${guestId}`, JSON.stringify(items));
      } catch (error) {
        console.error("Error saving guest cart:", error);
      }
    },
    [getGuestId]
  );

  // Normalize cart items from API response
  const normalizeCartItems = (items) => {
    return items.map((item) => ({
      ...item.productID, // pull title, price, etc.
      quantity: item.quantity,
      size: item.size,
      cartItemId: item._id, // Keep track of cart item ID for updates
    }));
  };

  // Get cart from server (authenticated users)
  const getCart = async () => {
    if (!user || !isAuthentic) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      const normalizedItems = response.data.cart?.items
        ? normalizeCartItems(response.data.cart.items)
        : [];

      setCartItems(normalizedItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load cart");

      // Fallback to empty cart on error
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Add product to cart
  const addToCart = async (product, size) => {
    if (!product || !product._id) {
      toast.error("Invalid product");
      return;
    }

    // Check stock
    if (product.stock < 5) {
      toast.error("Low Stock", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        className: "custom-error-toast",
      });
      return;
    }

    setError(null);

    if (!user || !isAuthentic) {
      // Guest user - handle locally
      addToGuestCart(product, size);
    } else {
      // Authenticated user - handle via API
      await addToUserCart(product, size);
    }
  };

  // Add to guest cart (localStorage)
  const addToGuestCart = (product, size) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id && item.size === size
    );

    let updatedItems;
    if (existingItemIndex >= 0) {
      // Update existing item
      updatedItems = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item
      updatedItems = [...cartItems, { ...product, quantity: 1, size }];
    }

    setCartItems(updatedItems);
    saveGuestCart(updatedItems);

    toast.success("Added to Cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
      className: "custom-toast",
    });
  };

  // Add to user cart (API)
  const addToUserCart = async (product, size) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${BASE_URL}/cart/add`,
        {
          productID: product._id,
          quantity: 1,
          size,
        },
        {
          withCredentials: true,
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Added to Cart", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        className: "custom-toast",
      });

      // Refresh cart from server
      await getCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add item to cart");
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCart = async (productId, quantity, size) => {
    if (quantity <= 0) {
      return removeCart(productId, size);
    }

    setError(null);

    if (!user || !isAuthentic) {
      // Guest user
      const updatedItems = cartItems.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: quantity }
          : item
      );
      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
    } else {
      // Authenticated user
      try {
        setLoading(true);

        await axios.put(
          `${BASE_URL}/cart/update`,
          { productID: productId, quantity, size },
          {
            withCredentials: true,
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        );

        await getCart();
      } catch (error) {
        console.error("Error updating cart:", error);
        setError("Failed to update cart");
      } finally {
        setLoading(false);
      }
    }
  };

  // Remove item from cart
  const removeCart = async (productId, size) => {
    setError(null);

    if (!user || !isAuthentic) {
      // Guest user
      const updatedItems = cartItems.filter(
        (item) => !(item._id === productId && item.size === size)
      );
      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
    } else {
      // Authenticated user
      try {
        setLoading(true);

        await axios.delete(
          `${BASE_URL}/cart/remove`,
          {
            withCredentials: true,
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          },
          {
            data: { productID: productId, size },
          }
        );

        await getCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
        setError("Failed to remove item from cart");
      } finally {
        setLoading(false);
      }
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    setError(null);

    if (!user || !isAuthentic) {
      // Guest user
      const guestId = getGuestId();
      localStorage.removeItem(`GuestCart_${guestId}`);
      setCartItems([]);
    } else {
      // Authenticated user
      try {
        setLoading(true);

        await axios.put(
          `${BASE_URL}/cart/clear`,
          {},
          {
            withCredentials: true,
          }
        );

        setCartItems([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
        setError("Failed to clear cart");
      } finally {
        setLoading(false);
      }
    }
  };

  // Migrate guest cart to user account (when user logs in)
  const migrateGuestCartToUser = async (guestId) => {
    try {
      const guestCartKey = `GuestCart_${guestId}`;
      const guestCartData = localStorage.getItem(guestCartKey);

      if (!guestCartData || guestCartData === "[]") {
        await getCart();
        return;
      }

      const guestItems = JSON.parse(guestCartData);

      if (guestItems.length === 0) {
        await getCart();
        return;
      }

      setLoading(true);

      // Send guest items to server for migration
      const response = await axios.post(
        `${BASE_URL}/cart/migrate`,
        { guestItems },
        {
          withCredentials: true,
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );

      // Update cart with merged items
      const normalizedItems = response.data.cart?.items
        ? normalizeCartItems(response.data.cart.items)
        : [];

      setCartItems(normalizedItems);

      // Clear guest cart
      localStorage.removeItem(guestCartKey);
      localStorage.removeItem("guestId");

      toast.success("Cart items merged successfully!");
    } catch (error) {
      console.error("Error migrating guest cart:", error);
      // If migration fails, just load user cart
      await getCart();
    } finally {
      setLoading(false);
    }
  };

  // Calculate cart totals
  const getCartTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Check if item is in cart
  const isInCart = useCallback(
    (productId, size = null) => {
      return cartItems.some(
        (item) =>
          item._id === productId && (size === null || item.size === size)
      );
    },
    [cartItems]
  );

  // Get specific cart item
  const getCartItem = useCallback(
    (productId, size = null) => {
      return cartItems.find(
        (item) =>
          item._id === productId && (size === null || item.size === size)
      );
    },
    [cartItems]
  );

  // Clear error
  const clearError = () => setError(null);

  // Sync guest cart to localStorage when cartItems change (but not on initial load)
  useEffect(() => {
    if (!user && !isAuthentic && hasMounted.current && cartItems.length >= 0) {
      saveGuestCart(cartItems);
    } else if (!hasMounted.current) {
      hasMounted.current = true;
    }
  }, [cartItems, user, isAuthentic, saveGuestCart]);

  const contextValue = {
    // State
    cartItems,
    loading,
    error,

    // Cart operations
    addToCart,
    updateCart,
    removeCart,
    clearCart,
    getCart,

    // Migration
    migrateGuestCartToUser,

    // Utilities
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getCartItem,

    // Error handling
    clearError,

    // Legacy support (if needed)
    setCartItems,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
