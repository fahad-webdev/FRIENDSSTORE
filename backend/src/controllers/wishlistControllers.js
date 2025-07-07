const Wishlist = require("../models/wishlist.model");

const getAllWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ userId }).populate(
      "items.productId"
    ); //to get product data through productId

    if (!wishlist) {
      return res
        .status(404)
        .json({ status: false, message: "Wishlist is empty" });
    }
    res.status(200).json({ status: true, wishlist });
  } catch (error) {
    console.log("Error! Error fetching wishlist ", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      //if wishlist is empty then
      wishlist = new Wishlist({
        //create new document(wishlist) in your Wishlist collection
        userId,
        items: [
          {
            productId,
            size,
          },
        ],
      });
    } else {
      const exist = wishlist.items.some(
        //to check if any one of item is exists
        (item) => item.productId.toString() === productId && item.size === size
      );

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "Product Already Added In Wishlist",
        });
      }
      //if no same product then add it in wishlist
      wishlist.items.push({ productId: productId, size: size });
    }
    await wishlist.save();
    res
      .status(201)
      .json({ status: true, message: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
    console.log("error! adding product to wishList is failed", error);
  }
};

const removeWishlist = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res
        .status(404)
        .json({ status: false, message: "Wishlist is empty" });
    }
    //to update the items array in wishlist by removing the product
    wishlist.items = wishlist.items.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );
    await wishlist.save();
    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
    console.log("error! error removing product from wishlist", error);
  }
};

const clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res
        .status(404)
        .json({ status: false, message: "Wishlist not found" });
    }

    wishlist.items = []; //setting items array null
    await wishlist.save();
    res.status(200).json({
      success: true,
      message: "Wishlist cleared",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
    console.log("error! error removing product from wishlist", error);
  }
};

module.exports = {
  addToWishlist,
  getAllWishlist,
  removeWishlist,
  clearWishlist,
};
