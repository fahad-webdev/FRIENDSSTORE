import React, { useState, useEffect } from "react";
import ProductCard from "../../../../components/productCard/ProductCard.jsx";
import { useLocation } from "react-router-dom";
import { useGlobal } from "../../../../context/GlobalContext";
import Logo from "../../../../assets/fs-logo.png";
import { useProduct } from "../../../../context/ProductContext.jsx";

const MensProducts = () => {
  const { SearchQuery } = useGlobal();
  const { products, fetchProducts, loading } = useProduct();
  const location = useLocation();

  // Extract URLs and category filter from state
  const categoryFilterArray = location.state?.categoryFilterArray || [];

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    products?.filter(
      (product) =>
        (!categoryFilterArray.length ||
          categoryFilterArray.includes(product?.category?.toLowerCase())) &&
        (product?.title?.toLowerCase().includes(SearchQuery?.toLowerCase()) ||
          product?.description
            ?.toLowerCase()
            .includes(SearchQuery?.toLowerCase()) ||
          product?.category?.toLowerCase().includes(SearchQuery?.toLowerCase()))
    ) || [];

  return (
    <div className="products-main-back ourteam-main-back">
      <div className="products-main ourteam-main">
        <div className="products ourteam">
          <div className="heading1">
            <h1>MEN'S PRODUCTS</h1>
          </div>
          <div className="products-content-back ourteam-content-back">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : loading ? (
              <div className="loading">
                <span></span>
                <img src={Logo} alt="" className="loader-image" />
              </div>
            ) : (
              <p className="no-product-message">No products found...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensProducts;
