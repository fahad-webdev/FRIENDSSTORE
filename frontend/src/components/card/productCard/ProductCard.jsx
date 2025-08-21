import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import useRippleEffect from "../../../hooks/UseRippleEffect.js";
import { useLocation, useNavigate } from "react-router-dom";
import HeadAnimation from "../../../hooks/HeadAnimation.js";
import { useCart } from "../../../context/CartContext.jsx";
import { useWishlist } from "../../../hooks/useWishlist.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const {user } = useAuth();  
  const { addToWishlist, removeWishlist, wishlist, fetchWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [productSize, setProductSize] = useState(product.size[0]);
  const [MouseOn, setMouseOn] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const HandleClick = useRippleEffect();
  const Navigate = useNavigate();

  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Check if current product with selected size is in wishlist
  useEffect(()=>{
    const isProductInWishlist = wishlist.some((item) => 
    item.productId._id === product._id && item.size === productSize);
    setIsInWishlist(isProductInWishlist);
  },[wishlist , product._id , productSize]);

  const onMouseOver = () => {
    setMouseOn(true);
  };

  const onMouseOut = () => {
    setMouseOn(false);
  };

  const OpenProductDetails = (product) => {
    Navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e, product, productSize) => {
    HandleClick(e);
    setTimeout(async () => {
      await addToCart(product, productSize);
    }, 200);
  };

  const handleWishlistToggle = async () => {

    if(!user){
      toast.error("Please login to add to wishlist");
    }else{
      if (isInWishlist) {
      // Remove from wishlist
      await removeWishlist(product._id, productSize);
    } else {
      // Add to wishlist
      await addToWishlist(product, productSize);
    }
    // Fetch updated wishlist to refresh the state
    await fetchWishlist();
    }
  };

  const location = useLocation();
  const { heading } = location.state || {};

  let discount = heading === "FINALE SALES 50%" ? 0.5 : 1;

  HeadAnimation();

  return (
    <>
      <div className="products-card unselectable head">
        <div
          className="product-image-back"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          <span className="fav-product-icon">
            <FavoriteIcon
              onClick={handleWishlistToggle}
              className="fav-icon"
              style={{
                color: isInWishlist ? "#dcbd83" : "#ccc", // Gold if in wishlist, gray if not
                cursor: "pointer"
              }}
            />
          </span>
          <img src={product.thumbnail} alt="" className="product-image" />

          <div
            className="image-hover"
            style={{
              transform:
                MouseOn === true ? "translateX(-0%)" : "translateX(-100%)",
            }}
          >
            <span
              onClick={() => addToCart(product, productSize)}
              className="add-product-icon"
              style={{
                transform:
                  MouseOn === true ? "translateX(0%)" : "translateX(100%)",
              }}
            >
              <AddShoppingCartIcon
                sx={{ color: "white" }}
                style={{ fontSize: "1.5rem", fontWeight: "normal" }}
              />
            </span>
          </div>
        </div>
        <div className="product-info-back">
          <div className="product-info">
            <div className="product-info-head">
              <h5>{product.category}</h5>
              <div className="rating">
                <StarIcon
                  style={{ fontSize: "15px", color: "#cfa749" }}
                ></StarIcon>
                <label>{product.rating}</label>
              </div>
            </div>
            <h3 onClick={() => OpenProductDetails(product)}>
              {product.title}
            </h3>
            <div className="size-back">
              <div className="size-no">
                {product?.size?.length > 0
                  ? product?.size?.map((size, index) => (
                      <span
                        key={index}
                        className={`size-item ${
                          productSize === size ? "size-item-active" : ""
                        }`}
                        onClick={() => {
                          setProductSize(size);
                        }}
                      >
                        {size}
                      </span>
                    ))
                  : "N/A"}
              </div>
            </div>
            <div className="card-price-back">
              <h3>PRICE</h3>
              <div className="card-price">
                <label>$ {product.price * discount}</label>
                {discount === 0.5 ? (
                  <p className="discount-price">50% off</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <button
            className={`card-btn`}
            onClick={(e) => handleAddToCart(e, product, productSize)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;