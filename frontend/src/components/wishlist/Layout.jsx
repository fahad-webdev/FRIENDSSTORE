import React, { useState, useEffect } from "react";
import "./Layout.css";
import Check from "../../assets/check.png";
import DeleteIcon from "../../assets/bin.png";
import WishlistCard from "../card/wishlistCard/WishlistCard";
import Logo from "../../assets/fs-logo.png";
import { useWishlist } from "../../hooks/useWishlist";
import { useGlobal } from "../../context/GlobalContext";
const Layout = () => {
  const { setAlertBox } = useGlobal();
  const { fetchWishlist, clearWishlist,removeWishlist, wishlist, loading } = useWishlist();
  useEffect(() => {
    fetchWishlist();
  }, []);

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Recalculate when wishlist or selectAll changes
  useEffect(() => {
    if (selectAll) {
      const allKeys = wishlist.map((p) => `${p.productId._id}-${p.size}`);
      setSelectedProductIds(allKeys);
    } else {
      setSelectedProductIds([]);
    }
  }, [selectAll]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleProductToggle = (id, size) => {
    const key = `${id}-${size}`;
    const isSelected = selectedProductIds.includes(key);

    if (isSelected) {
      setSelectedProductIds((prev) => prev.filter((pid) => pid !== key));
    } else {
      setSelectedProductIds((prev) => [...prev, key]);
    }
  };

  const handleClearCart = () => {
    wishlist.length > 0
      ? setAlertBox({
          alert: true,
          head: "Clear Your Wishlist",
          message: "Are you sure you want to clear your wishlist?",
          onConfirm: () => {
            clearWishlist();
            setSelectedProductIds([]);
            setSelectAll(false);
          },
        })
      : "";
  };

  return (
    <>
      <div className="wishlist-layout-back">
        <div className="addtocard-main-back">
          <div className="heading1 cart-heading">
            <div className="cartcard-checkbox" id="cartcard-checkbox">
              <div className="checkbox" onClick={toggleSelectAll}>
                {selectAll && (
                  <img src={Check} alt="Checked" className="check-icon" />
                )}
              </div>
            </div>
            <h1>WISHLIST</h1>
            <img
              src={DeleteIcon}
              alt="Clear Cart"
              className="delete-icon"
              onClick={handleClearCart}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="addtocard-main-scroll wishlist-layout-scroll">
            {wishlist.length > 0 ? (
              wishlist.map((wishItem) => (
                <WishlistCard
                  key={`${wishItem.productId._id}-${wishItem.size}`}
                  wishItem={wishItem}
                  isSelected={selectedProductIds.includes(
                    `${wishItem.productId._id}-${wishItem.size}`
                  )}
                  handleProductToggle={handleProductToggle}
                  removeWishlist={removeWishlist}
                />
              ))
            ) : loading === true ? (
              <div className="loading">
                <span></span>
                <img src={Logo} alt="" className="loader-image" />
              </div>
            ) : (
              <p className="not-found-message">Your wishlist is empty.</p>
            )}
          </div>

          <div className="addtocard-btn-back">
            <h4 style={{ color: "grey" }} className="no-of-products">
              Selected: {selectedProductIds.length}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
