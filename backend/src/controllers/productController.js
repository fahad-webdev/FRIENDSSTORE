const Products = require("../models/product.model");
const productsData = require("../data/products.js"); //for products in products.js

const products = async (req, res) => {
  try {
    res.status(200).json(productsData);
  } catch (error) {
    console.log("Error displaying products :: ", error);
    res.status(400), json({ message: "No Product Available" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ message: "Products fetch successfully", products });
  } catch (error) {
    res.status(400).json({ message: "No Product Found" });
    console.log("error fetching products :: ", error);
  }
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Products.findById(id);
    if (!products) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found ", products });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error! Product not found", error: error.message });
    console.log("Error fetching product by id :: ", error);
  }
};
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      tags,
      brand,
      category,
      status,
      deliveryStatus,
      size,
      weight,
      sku,
      rating,
      reviews, // optional
    } = req.body;

    // Construct base URL (change as per production environment)
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Convert local paths to accessible URLs
    const thumbnailPath = req.files["thumbnail"]?.[0]?.path || "";
    const thumbnail = thumbnailPath
      ? `${baseUrl}/${thumbnailPath.replace(/\\/g, "/").replace("src/", "")}`
      : "";

    const images =
      req.files["images"]?.map(
        (file) =>
          `${baseUrl}/${file.path.replace(/\\/g, "/").replace("src/", "")}`
      ) || [];

    // Check for required fields
    if (!title) {
      return res
        .status(400)
        .json({success:false, message: "Please provide title required fields" });
    } else if (!description) {
      return res
        .status(400)
        .json({success:false, message: "Please provide description required fields" });
    } else if (!price) {
      return res
        .status(400)
        .json({success:false, message: "Please provide price required fields" });
    } else if (!stock) {
      return res
        .status(400)
        .json({success:false, message: "Please provide stock required fields" });
    } else if (!tags) {
      return res
        .status(400)
        .json({success:false, message: "Please provide tags required fields" });
    } else if (!brand) {
      return res
        .status(400)
        .json({success:false, message: "Please provide brand required fields" });
    } else if (!category) {
      return res
        .status(400)
        .json({success:false, message: "Please provide category required fields" });
    } else if (!status) {
      return res
        .status(400)
        .json({success:false, message: "Please provide status required fields" });
    } else if (!size) {
      /*else if(!deliveryStatus){
    return res
        .status(400)
        .json({ message: "Please provide deliveryStatus required fields" });
   }*/
      return res
        .status(400)
        .json({success:false, message: "Please provide size required fields" });
    } else if (!weight) {
      return res
        .status(400)
        .json({success:false, message: "Please provide weight required fields" });
    } else if (!sku) {
      return res
        .status(400)
        .json({success:false, message: "Please provide sku required fields" });
    } else if (!thumbnail) {
      return res
        .status(400)
        .json({success:false, message: "Please provide thumbnail required fields" });
    } else if (!images) {
      return res
        .status(400)
        .json({success:false, message: "Please provide images required fields" });
    }
    // Handle optional reviews
    let parsedReviews = [];
    if (reviews) {
      try {
        parsedReviews = JSON.parse(reviews);
      } catch (err) {
        return res.status(400).json({ message: "Invalid reviews JSON format" });
      }
    }
    const newProduct = new Products({
      title,
      description,
      price,
      stock,
      tags: JSON.parse(tags),
      brand,
      category,
      status,
      deliveryStatus,
      size: JSON.parse(size),
      weight,
      sku,
      rating,
      reviews: parsedReviews,
      thumbnail,
      images,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Error Adding Product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      size,
      tags,
      price,
      sku,
      stock,
      weight,
      thumbnail,
      images,
      brand,
      status,
      deliveryStatus,
    } = req.body;

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update basic fields
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.status = status ?? product.status;
    product.deliveryStatus = deliveryStatus ?? product.deliveryStatus;
    product.price = price ?? product.price;
    product.sku = sku ?? product.sku;
    product.stock = stock ?? product.stock;
    product.weight = weight ?? product.weight;

    // Handle uploaded thumbnail
    if (req.files?.thumbnail?.[0]) {
      const thumbPath = req.files.thumbnail[0].path.replace(/\\/g, "/").replace(/^src\//, "");
      product.thumbnail = `http://${req.hostname}:/${thumbPath}`;
    } else if (thumbnail) {
      product.thumbnail = thumbnail;
    }

    // Handle uploaded images
    if (req.files?.images?.length > 0) {
      product.images = req.files.images.map((file) =>
        `http://${req.hostname}:/${file.path.replace(/\\/g, "/").replace(/^src\//, "")}`
      );
    } else if (images) {
      product.images = Array.isArray(images) ? images : [images];
    }

    // Handle arrays: size
    if (typeof size === "string") {
      try {
        product.size = JSON.parse(size);
      } catch {
        product.size = size.split(",").map((s) => s.trim());
      }
    } else if (Array.isArray(size)) {
      product.size = size;
    }

    // Handle arrays: tags
    if (typeof tags === "string") {
      try {
        product.tags = JSON.parse(tags);
      } catch {
        product.tags = tags.split(",").map((t) => t.trim());
      }
    } else if (Array.isArray(tags)) {
      product.tags = tags;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate SKU detected" });
    }
    res.status(500).json({ message: "Server error while updating product" });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Products.findByIdAndDelete({ _id: id });

    if (!deleteProduct) {
      res.status(404).json({ success: false, message: "Product Not Found" });
    }
    res
      .status(400)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Error deleting product :: ", error);
    res.status(500).json({
      success: false,
      message: "Error Deleting Product",
      error: error.message,
    });
  }
};

module.exports = {
  products,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
