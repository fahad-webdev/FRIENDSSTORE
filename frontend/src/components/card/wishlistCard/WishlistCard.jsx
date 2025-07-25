import React from "react";
import Cross from "../../../assets/cancel.png";
import Check from "../../../assets/check.png";
import { useWishlist } from "../../../hooks/useWishlist";

const WishlistCard = ({ wishItem, isSelected, handleProductToggle,removeWishlist }) => {
  return (
    <div className="cartcard-main-back">
      <div className="cartcard-checkbox">
        <div
          className="checkbox"
          onClick={() => handleProductToggle(wishItem.productId._id, wishItem.size)}
        >
          {isSelected && <img src={Check} alt="" className="check-icon" />}
        </div>
      </div>
      <div className="cart-image-back">
        <img
          src={wishItem.productId.thumbnail}
          alt=""
          className="cart-image"
        />
      </div>
      <div className="cart-details-back">
        <h2>{wishItem.productId.title}</h2>
        <div className="quantity-back">
          <h3>Size: </h3>
          <p>{wishItem.size}</p>
        </div>
      </div>
      <div className="cart-price-back">
        <img src={Cross} alt="" className="cross" onClick={()=>removeWishlist(wishItem.productId._id,wishItem.size)}/>
        <h3>Price: ${wishItem.productId.price}</h3>
      </div>
    </div>
  );
};

export default WishlistCard;
