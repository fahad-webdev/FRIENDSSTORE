import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/fs-logo.png";
import "./Table.css";
import { useGlobal } from "../../context/GlobalContext";
import { useProduct } from "../../context/ProductContext";
const InventoryTable = ({ filteredProducts }) => {
  const { setAlert, setAlertBox } = useGlobal();
  const { fetchProducts, deleteProduct, products, loading } = useProduct();


  const handleDeleteProduct = async (id) => {
    setAlertBox({
      alert: true,
      head: "Delete This Product",
      message: "Are you sure you want to delete this product?",
      onConfirm: async () => {
        const result = await deleteProduct(id);
        //alert("Product Deleted Successfully");
        await fetchProducts();
        setAlert({
          alert: true,
          type: "success",
          message: result.message,
        });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
          result.success;
        }, 2500);
      },
    });
    
  };

  const Navigate = useNavigate();
  return (
    <>
      <table className="top-product-table">
        <thead>
          <tr>
            <th className="th1">Product</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}></td>
            </tr>
          ) : filteredProducts.length > 0 ? (
            [...filteredProducts].map((product) => (
              <tr key={product._id} className="table-row">
                <td>
                  <div className="td1">
                    <div className="admin-product-image-back">
                      <img
                        src={product.thumbnail}
                        className="top-product-image"
                        alt=""
                      />
                    </div>
                    <p>{product.title}</p>
                  </div>
                </td>
                <td className="td2">{product.description}</td>
                <td>{product.category}</td>
                <td>$ {product.price}</td>
                <td>{product.stock}</td>
                <td className="td6">
                  <label
                    className={product.stock > 0 ? "in-stock" : "out-stock"}
                  >
                    {product.status}
                  </label>
                </td>
                <td className="td7">
                  <div className="options-btn-back">
                    <button
                      className="options-btn edit-options-btn"
                      onClick={() =>
                        Navigate(`/admin/update-product/${product._id}`)
                      }
                    >
                      EDIT
                    </button>
                    <button
                      className="options-btn"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                <p className="not-found-message">No Product Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading ? (
        <div className="loading">
          <span></span>
          <img src={Logo} alt="" className="loader-image" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default InventoryTable;
