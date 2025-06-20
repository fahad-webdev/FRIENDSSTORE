import React, { useEffect, useState } from "react";
import { useApi } from "../../../../context/ApiContext.jsx";
import ProductCard from "../../../../components/productCard/ProductCard.jsx";
import { useLocation } from "react-router-dom";
import Logo from "../../../../assets/fs-logo.png";
import { useProduct } from "../../../../context/ProductContext.jsx";
const ProductsCollection = () => {
  const { SearchQuery } = useApi();
  const {products, fetchProducts, loading} = useProduct();
  const [productDetails, setProductDetails] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const location = useLocation();

  // Extract URLs and category filter from state
  const categoryFilterArray = location.state?.categoryFilterArray || [];
  const { heading } = location.state || {};

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to filter products based on new arrivals (last 7 days)
  const filterNewArrivals = (products, days = 7) => {
    const now = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(now.getDate() - days);

    return products.filter((product) => {
      if (!product.createdAt) return false; // Ensure createdAt exists
      const productDate = new Date(product.createdAt);
      return productDate >= thresholdDate;
    });
  };

  // Apply all filters (category, search query, and new arrivals)
  const filteredProducts =
    products
      ?.filter(
        (product) =>
          (!categoryFilterArray.length ||
            categoryFilterArray.some(
              (filter) =>
                product?.title?.toLowerCase().includes(filter.toLowerCase()) ||
                product?.category?.toLowerCase().includes(filter.toLowerCase())
            )) &&
          (product?.title?.toLowerCase().includes(SearchQuery?.toLowerCase()) ||
            product?.description
              ?.toLowerCase()
              .includes(SearchQuery?.toLowerCase()) ||
            product?.category
              ?.toLowerCase()
              .includes(SearchQuery?.toLowerCase()))
      )
      .filter((product) =>
        heading === "NEW ARRIVALS"
          ? filterNewArrivals([product]).length > 0
          : true
      ) || [];

  return (
    <>
      <div className="productscollection-main-back">
        <div className="products-main-back ourteam-main-back">
          <div className="products-main ourteam-main">
            <div className="products ourteam">
              <div className="heading1">
                <h1 id="collection-heading">{heading}</h1>
              </div>
              <div className="products-content-back ourteam-content-back">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      setSelectedProductId={setSelectedProductId}
                      setProductDetails={setProductDetails}
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
      </div>
    </>
  );
};

export default ProductsCollection;
