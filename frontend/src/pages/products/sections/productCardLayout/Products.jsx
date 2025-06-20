import React, { useEffect, useState } from "react";
import "./Products.css";
import { useApi } from "../../../../context/ApiContext.jsx";
import ProductCard from "../../../../components/productCard/ProductCard.jsx";
import Logo from "../../../../assets/fs-logo.png";
import HeadAnimation from "../../../../hooks/HeadAnimation.js";
import { useProduct } from "../../../../context/ProductContext.jsx";
const Products = () => {
  const { loading, fetchProducts, products } = useProduct();
  const { SearchQuery } = useApi();
  const [productDetails, setProductDetails] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(SearchQuery.toLowerCase())
  );

  HeadAnimation();
  return (
    <div className="products-main-back ourteam-main-back">
      <div className="products-main ourteam-main">
        <div className="products ourteam">
          <div className="heading1">
            <h1 className="head">OUR PRODUCTS</h1>
          </div>
          <div className="products-content-back ">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  selectedProductId={selectedProductId}
                  setSelectedProductId={setSelectedProductId}
                  setProductDetails={setProductDetails}
                  productDetails={productDetails}
                />
              ))
            ) : loading === true ? (
              <div className="loading">
                <span></span>
                <img src={Logo} alt="" className="loader-image" />
              </div>
            ) : (
              <p className="no-product-message">No Product Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
