const Cart = require("../models/cart.model");

const getCart = async (req, res) => {
  try {
    const {userId} = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productID");
    
    if (!cart) {
      return res.status(404).json({success:false, message: "Cart not found" });
    }

    res.status(200).json({success:true, message:"Cart Fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

const addToCart = async (req, res) => {
  const { userId, productID, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productID, quantity }],
      });
    } else {
      // Check if item exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productID.toString() === productID
      );

      if (itemIndex > -1) {
        // Item exists in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ productID, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Product Added to the Cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeItemFromCart = async (req, res) => {
  const { userId, productID } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productID.toString() !== productID
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};

const clearCart = async (req, res) => {
  try {
    const {userId} = req.params;
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );
    res.status(200).json({success:true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success:false, message: "Failed to clear cart" });
  }
};


module.exports ={getCart,addToCart ,removeItemFromCart,clearCart};