import React, { useEffect, useState } from "react";
import "./AddToCard.css";
import CartCard from "../../../../components/card/cardCard/CartCard";
import Check from "../../../../assets/check.png";
import DeleteIcon from "../../../../assets/bin.png";
import Logo from "../../../../assets/fs-logo.png";
import { useCart } from "../../../../context/CartContext";
import { useGlobal } from "../../../../context/GlobalContext";

const AddToCard = () => {
  const { SearchQuery, setAlertBox } = useGlobal();
  const { cartItems, updateCart, clearCart, removeCart, loading } = useCart();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  // Update selectAll state when individual items are selected/deselected
  useEffect(() => {
    const filteredCart = cartItems.filter((cartItem) =>
      cartItem.productID.title.toLowerCase().includes(SearchQuery.toLowerCase())
    );
    
    if (filteredCart.length > 0) {
      const allKeys = filteredCart.map((item) => `${item.productID._id}-${item.size}`);
      const allSelected = allKeys.every((key) => selectedProductIds.includes(key));
      setSelectAll(allSelected);
    } else {
      setSelectAll(false);
    }
  }, [selectedProductIds, cartItems, SearchQuery]);

  // Calculate total price whenever selected items change
  useEffect(() => {
    let price = 0;
    selectedProductIds.forEach((key) => {
      const [id, size] = key.split('-');
      const product = cartItems.find(
        (item) => item.productID._id === id && item.size === size
      );
      if (product) {
        price += product.productID.price * (product.quantity || 1);
      }
    });
    setTotalPrice(price);
  }, [selectedProductIds, cartItems]);

  const toggleSelectAll = () => {
    const filteredCart = cartItems.filter((cartItem) =>
      cartItem.productID.title.toLowerCase().includes(SearchQuery.toLowerCase())
    );

    if (selectAll) {
      // Deselect all
      setSelectedProductIds([]);
    } else {
      // Select all filtered items
      const allKeys = filteredCart.map((item) => `${item.productID._id}-${item.size}`);
      setSelectedProductIds(allKeys);
    }
  };

  const handleProductToggle = (id, size, price) => {
    const key = `${id}-${size}`;
    const selected = selectedProductIds.includes(key);

    if (selected) {
      // Remove from selection
      setSelectedProductIds((prev) => prev.filter((pid) => pid !== key));
    } else {
      // Add to selection
      setSelectedProductIds((prev) => [...prev, key]);
    }
  };

  const handleClearCart = () => {
    cartItems.length > 0
      ? setAlertBox({
          alert: true,
          head: "Clear Your Cart",
          message: "Are you sure you want to clear your cart?",
          onConfirm: () => {
            clearCart();
            setSelectedProductIds([]);
            setTotalPrice(0);
            setSelectAll(false);
          },
        })
      : "";
  };

  const FilterCart = cartItems.filter((cartItem) =>
    cartItem.productID.title.toLowerCase().includes(SearchQuery.toLowerCase())
  );

  return (
    <div className="addtocard-main-back">
      <div className="heading1 cart-heading">
        <div className="cartcard-checkbox" id="cartcard-checkbox">
          <div className="checkbox" onClick={toggleSelectAll}>
            {selectAll && (
              <img src={Check} alt="Checked" className="check-icon" />
            )}
          </div>
        </div>
        <h1>ORDER SUMMARY</h1>
        <img
          src={DeleteIcon}
          alt="Clear Cart"
          className="delete-icon"
          onClick={handleClearCart}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="addtocard-main-scroll">
        {FilterCart.length > 0 ? (
          FilterCart.reverse().map((cartItem) => (
            <CartCard
              key={`${cartItem.productID._id}-${cartItem.size}`}
              cartItem={cartItem}
              isSelected={selectedProductIds.includes(`${cartItem.productID._id}-${cartItem.size}`)}
              handleProductToggle={handleProductToggle}
              updateCart={updateCart}
              removeCart={removeCart}
            />
          ))
        ) : loading === true ? (
          <div className="loading">
            <span></span>
            <img src={Logo} alt="" className="loader-image" />
          </div>
        ) : (
          <p className="not-found-message">Your cart is empty.</p>
        )}
      </div>

      <div className="addtocard-btn-back">
        <h4 style={{ color: "grey" }} className="no-of-products">
          No of Products: {selectedProductIds.length}
        </h4>
        <button
          className="continue-btn card-btn"
          disabled={selectedProductIds.length === 0}
        >
          PROCEED
        </button>
        <div className="order-detail-back">
          <div>
            <h4>Total Amount:</h4>
            <h2>${Math.round(totalPrice)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCard;