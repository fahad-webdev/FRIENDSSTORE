import React, { useEffect, useState } from 'react';
import "./AddToCard.css";
import CartCard from '../../../../components/cardCard/CartCard';
import Check from '../../../../assets/check.png';
import DeleteIcon from "../../../../assets/bin.png";
import { useCart } from '../../../../context/CartContext';
import { useGlobal } from '../../../../context/GlobalContext';

const AddToCard = () => {
  const {SearchQuery , setAlertBox} = useGlobal();
  const { cartItems, clearCart } = useCart(); // get from context
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  // Recalculate when cartItems or selectAll changes
  useEffect(() => {
    if (selectAll) {
      const allIds = cartItems.map((p) => p._id);
      setSelectedProductIds(allIds);

      const price = cartItems.reduce(
        (acc, curr) => acc + curr.price * (curr.quantity || 1),
        0
      );
      setTotalPrice(price);
    } else {
      setSelectedProductIds([]);
      setTotalPrice(0);
    }
  }, [selectAll, cartItems]);

  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

  const handleProductToggle = (id) => {
    const selected = selectedProductIds.includes(id);
    const product = cartItems.find((item) => item._id === id);
    const itemTotal = product.price * (product.quantity || 1);

    if (selected) {
      setSelectedProductIds((prev) => prev.filter((pid) => pid !== id));
      setTotalPrice((prev) => prev - itemTotal);
    } else {
      setSelectedProductIds((prev) => [...prev, id]);
      setTotalPrice((prev) => prev + itemTotal);
    }
  };

  const handleClearCart = () => {
    cartItems.length>0?
    setAlertBox({
      alert:true,
      head:"Clear Your Cart",
      message:"Are you sure you want to clear your cart?",
      onConfirm:()=>{
         clearCart();
    setSelectedProductIds([]);
    setTotalPrice(0);
    setSelectAll(false);
      },
    })
    :""
  };

  const FilterCart = cartItems.filter((cartItem)=>
    cartItem.title.toLowerCase().includes(SearchQuery.toLowerCase())
  )
  return (
    <div className="addtocard-main-back">
      <div className="heading1 cart-heading">
        <div className="cartcard-checkbox" id="cartcard-checkbox">
          <div className="checkbox" onClick={toggleSelectAll}>
            {selectAll && <img src={Check} alt="Checked" className="check-icon" />}
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
              key={`${cartItem._id}-${cartItem.size}`}//create unique id by adding size with _id so react won't get confuse 
              cartItem={cartItem}
              isSelected={selectedProductIds.includes(cartItem._id)}
              handleProductToggle={handleProductToggle}
            />
          ))
        ) : (
          <p className='not-found-message'>Your cart is empty.</p>
        )}
      </div>

      <div className="addtocard-btn-back">
        <h4 style={{ color: "grey" }} className='no-of-products'>
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
