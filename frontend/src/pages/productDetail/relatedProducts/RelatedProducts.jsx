import React, { useState, useEffect, useMemo } from 'react';
import "./RelatedProducts.css";
import { useGlobal } from '../../../context/GlobalContext';
import { useProduct } from '../../../context/ProductContext';
import ProductCard from '../../../components/card/productCard/ProductCard';
import Logo from '../../../assets/logo.png'; // Add your logo import

const RelatedProducts = ({ product }) => {
  const { loading, fetchProducts, products } = useProduct();
  const [productDetails, setProductDetails] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetch all products when component mounts (only once)
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []); // Remove fetchProducts from dependencies to prevent infinite calls

  // Memoized filtered products - only recalculates when product or products change
  const filteredProducts = useMemo(() => {
    if (!product?.category || products.length === 0) {
      return [];
    }
    
    return products.filter((prod) => 
      prod._id !== product._id && // Exclude current product
      prod.category.toLowerCase() === product.category.toLowerCase()
    );
  }, [product, products]);

  // Early return if product is not loaded yet
  if (!product) {
    return (
      <div className="products-main-back ourteam-main-back">
        <div className="products-main ourteam-main">
          <div className="products ourteam">
            <div className="heading1">
              <h1 className="head">RELATED PRODUCTS</h1>
            </div>
            <div className="products-content-back">
              <div className="loading">
                <span></span>
                <img src={Logo} alt="" className="loader-image" /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
   filteredProducts.length<1?""
    : <div className="products-main-back ourteam-main-back">
      <div className="products-main ourteam-main">
        <div className="products ourteam">
          <div className="heading1">
            <h1 className="head">RELATED PRODUCTS</h1>
          </div>
          <div className="products-content-back">
            {loading ? (
              <div className="loading">
                <span></span>
                {/* <img src={Logo} alt="" className="loader-image" /> */}
                <p>Loading related products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                  selectedProductId={selectedProductId}
                  setSelectedProductId={setSelectedProductId}
                  setProductDetails={setProductDetails}
                  productDetails={productDetails}
                />
              ))
            ) : (
              <p className="no-product-message">
                No related products available in {product.category} category
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default RelatedProducts;