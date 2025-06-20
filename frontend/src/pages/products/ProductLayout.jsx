import React from "react";
import "./ProductLayout.css";
import Products from "./sections/productCardLayout/Products.jsx";

const ProductLayout = () => {
  return (
    <>
      <div className="productlayout-main-back about-main-back">
        <div className="productlayout-content-back about-content-back ">
          <div className="productlayout-content about-content">
            <h1 id="main-heading">SHOP</h1>
            <p>
              Step into a world of style and sophistication! Our carefully
              curated collection brings you premium-quality shoes, cozy yet
              stylish hoodies, and elegant dresses designed for every occasion.
              Whether you're looking for timeless classics or the latest trends,
              we have something for everyone. Shop now and redefine your
              wardrobe with effortless fashion!
            </p>
          </div>
        </div>
        <Products />
      </div>
    </>
  );
};

export default ProductLayout;
