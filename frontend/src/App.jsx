import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ApiProvider } from "./context/GlobalContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <>
      <ApiProvider>
          <ProductProvider>
            <CartProvider>
              <Outlet />
            </CartProvider>
          </ProductProvider>
      </ApiProvider>
    </>
  );
};

export default App;
