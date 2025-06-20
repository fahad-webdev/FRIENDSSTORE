import React, { useEffect } from "react";
import "./AdminProduct.css";
import AdminProductCard from "../../../components/addProductCard/AdminProductCard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Logo from "../../../assets/fs-logo.png";
import { useApi } from "../../../context/ApiContext";
import { useProduct } from "../../../context/ProductContext";
const AdminProduct = () => {
  const { fetchProducts, products, loading } = useProduct();
  const { SearchQuery, setSearchOpen } = useApi();

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(SearchQuery.toLowerCase())
  );
  return (
    <>
      <div className="dashboard-back adminproduct-back">
        <div className="dashboard-main adminproduct-main">
          <div className="admin-head-back">
            <h1 className="admin-heading">
              <ProductionQuantityLimitsIcon /> Products
            </h1>
            <label className="no-of-products" htmlFor="">
              (no of products {filteredProducts.length})
            </label>
            <div className="inventory-btn-back">
              <button
                onClick={() => setSearchOpen("open")}
                className="inventory-add-btn"
              >
                SEARCH
              </button>
            </div>
          </div>
          <div className="admin-products-back">
            {filteredProducts.length > 0 ? (
              [...filteredProducts]
                .reverse()
                .map((product) => (
                  <AdminProductCard
                    key={product._id}
                    product={product}
                    filteredProducts={filteredProducts}
                  />
                ))
            ) : loading === true ? (
              <div className="loading">
                <span></span>
                <img src={Logo} alt="" className="loader-image" />
              </div>
            ) : (
              <p className="not-found-message">No Product Available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminProduct;
