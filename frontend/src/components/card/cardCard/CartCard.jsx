import React, { useState } from "react";
import "./CartCard.css";
import Cross from "../../../assets/cancel.png";
import Check from "../../../assets/check.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartCard = ({ cartItem, isSelected, handleProductToggle,updateCart,removeCart }) => {

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [productSize ,setProductSize] = useState(cartItem.size);


  return (
    <>
      <div className="cartcard-main-back">
        <div className="cartcard-checkbox">
          <div
            className="checkbox"
            onClick={() => handleProductToggle(cartItem._id,cartItem.size, cartItem.price)}
          >
            {isSelected && <img src={Check} alt="" className="check-icon" />}
          </div>
        </div>
        <div className="cart-image-back">
          <img src={cartItem.thumbnail} alt="" className="cart-image" />
        </div>
        <div className="cart-details-back">
          <h2>{cartItem.title}</h2>
          <div className="quantity-back">
            <h3>Quantity: </h3>
            <AddIcon
              onClick={() => {
                const newQty = quantity + 1;
                setQuantity(newQty);
                updateCart(cartItem._id, newQty,productSize);
              }}
              style={{ fontSize: "1rem", cursor: "pointer" }}
            />{" "}
            <label>{quantity}</label>
            <RemoveIcon
              onClick={() => {
                if (quantity > 1) {
                  const newQty = quantity - 1;
                  setQuantity(newQty);
                  updateCart(cartItem._id, newQty,productSize);
                }
              }}
              style={{ fontSize: "1rem", cursor: "pointer" }}
            />

            <h3>Size: </h3>
            <p htmlFor="">{productSize}</p>
          </div>
        </div>
        <div className="cart-price-back">
          <label htmlFor="">Price:</label><h3> ${cartItem.price}</h3>
        </div>
          <img
            onClick={() => removeCart(cartItem._id,productSize)}
            src={Cross}
            alt=""
            className="cross"
          />
      </div>
    </>
  );
};

export default CartCard;
