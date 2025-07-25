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
            onClick={() => handleProductToggle(cartItem.productID._id,cartItem.size, cartItem.productID.price)}
          >
            {isSelected && <img src={Check} alt="" className="check-icon" />}
          </div>
        </div>
        <div className="cart-image-back">
          <img src={cartItem.productID.thumbnail} alt="" className="cart-image" />
        </div>
        <div className="cart-details-back">
          <h2>{cartItem.productID.title}</h2>
          <div className="quantity-back">
            <h3>Quantity: </h3>
            <AddIcon
              onClick={() => {
                const newQty = quantity + 1;
                setQuantity(newQty);
                updateCart(cartItem.productID._id, newQty,productSize);
              }}
              style={{ fontSize: "1rem", cursor: "pointer" }}
            />{" "}
            <label>{quantity}</label>
            <RemoveIcon
              onClick={() => {
                if (quantity > 1) {
                  const newQty = quantity - 1;
                  setQuantity(newQty);
                  updateCart(cartItem.productID._id, newQty,productSize);
                }
              }}
              style={{ fontSize: "1rem", cursor: "pointer" }}
            />

            <h3>Size: </h3>
            <p htmlFor="">{productSize}</p>
          </div>
        </div>
        <div className="cart-price-back">
          <img
            onClick={() => removeCart(cartItem.productID._id,productSize)}
            src={Cross}
            alt=""
            className="cross"
          />
          <h3>Price: ${cartItem.productID.price}</h3>
        </div>
      </div>
    </>
  );
};

export default CartCard;
