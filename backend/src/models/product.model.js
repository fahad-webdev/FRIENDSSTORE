const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewerName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      max: 5,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    status: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Discontinued"],
      default: "In Stock",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "delivered", "shipped", "cancelled"],
      default: "pending",
    },
    size: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "Size list can't be empty",
      },
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    rating: {
      type: Number,
      max: 5,
      min: 0,
      default: 0,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return (
            /^(http|https):\/\/.*\.(jpeg|jpg|gif|png)$/.test(v) ||
            /^src[\\/].*\.(jpeg|jpg|gif|png)$/.test(v)
          );
        },
        message: "Please provide a valid image URL",
      },
    },
    images: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return (
              /^(http|https):\/\/.*\.(jpeg|jpg|gif|png)$/.test(v) ||
              /^src[\\/].*\.(jpeg|jpg|gif|png)$/.test(v)
            );
          },
          message: "Please provide a valid image URL",
        },
      },
    ],
    reviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
