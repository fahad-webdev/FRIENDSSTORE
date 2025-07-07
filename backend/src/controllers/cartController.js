const Cart = require("../models/cart.model");

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate("items.productID");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Cart Fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

const addToCart = async (req, res) => {
  const { productID, quantity, size } = req.body;
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productID, quantity, size }],
      });
    } else {
      // Check if item exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productID.toString() === productID && item.size === size
      );

      if (itemIndex > -1) {
        // Item exists in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ productID, quantity, size });
      }
    }

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Product Added to the Cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateToCart = async (req, res) => {
  try {
    const { productID, quantity, size } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productID.toString() === productID && item.size === size
    ); //for matching cart product

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity; //update the value of quanity in items array
      await cart.save();
      return res
        .status(200)
        .json({ success: true, message: "Cart Updated Successfully", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const removeItemFromCart = async (req, res) => {
  const { productID , size } = req.body;
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.productID.toString() === productID && item.size === size)
    );
    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeItemFromCart,
  clearCart,
  updateToCart,
};
