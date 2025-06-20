import React, { useEffect,useState } from "react";
import "./Inventory.css";
import InventoryTable from "../../../components/table/InventoryTable";
import { useNavigate } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import useRippleEffect from "../../../hooks/UseRippleEffect";
import { useApi } from "../../../context/ApiContext";
import { useProduct } from "../../../context/ProductContext";
const Inventory = () => {
  const HandleClick = useRippleEffect();
  const { fetchProducts, products } = useProduct();
  const {setSearchOpen , SearchQuery} = useApi();
  useEffect(() => {
    fetchProducts();
  }, []);

   const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(SearchQuery.toLowerCase())
  );


  const Navigate = useNavigate();

  const addProductNavigate = () => {
    HandleClick;
    Navigate("/admin/add-product");
  };
  return (
    <>
      <div className="dashboard-back inventory-back">
        <div className="dashboard-main inventory-main">
          <div className="admin-head-back inventory-head-back">
            <h1 className="admin-heading">
              <InventoryIcon /> Inventory
            </h1>
            <label className="no-of-products" htmlFor="">
              (no of products {filteredProducts.length})
            </label>
            <div className="inventory-btn-back">
              <button
              onClick={()=>setSearchOpen("open")}
              className="inventory-add-btn">
                SEARCH
              </button>
              <button
                onClick={addProductNavigate}
                className="inventory-add-btn"
              >
                ADD 
              </button>
            </div>
          </div>
          <div className="inventory-table-back">
            <InventoryTable filteredProducts={filteredProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
