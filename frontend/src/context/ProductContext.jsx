import React, { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = `${BASE_URL}/products`;
  const { getRequestConfig } = useAuth();
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      const products = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];
      setProducts(products);
      //console.log("Products fetched from API:", products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  //fetch product by ID
  const getProductById = async (productId) => {
    try {
      const url = `${BASE_URL}/products/${productId}`;
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      const singleProduct = Array.isArray(data) ? data : data.products;
      setProduct(singleProduct);
      console.log("Product Found :: ", singleProduct);
      return singleProduct;
    } catch (error) {
      console.log("error fetching single product", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const url = `${BASE_URL}/add-product`;
      const response = await axios.post(
        url,
        productData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newProduct = response.data.product || response.data;

      // Update localStorage
      /*const currentProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      const updatedProducts = [newProduct, ...currentProducts];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Update state if needed
      setProducts(updatedProducts);*/

      //console.log("Product added and localStorage updated:", newProduct);

      const message = response.data.message;
      return { success: true, message: message };
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      //console.log("Error! User cannot be created ", error);
      return { success: false, message: msg };
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const url = `${BASE_URL}/products/${productId}`;
      const response = await axios.put(
        url,
        productData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedProduct = response.data.product || response.data;
      // Update localStorage
      const currentProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = currentProducts.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);

      const message = response.data.message;
      return { success: true, message: message };
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      return { success: false, message: message };
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const url = `${BASE_URL}/delete-product/${productId}`;
      const response = await axios.delete(url, getRequestConfig());

      /*const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));*/

      const message = response.data.message;
      return { success: true, message: message };
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      return { success: false, message: message };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getProductById,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
        products, //for product list
        product, //for single product
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
