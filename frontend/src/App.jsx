import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ApiProvider } from "./context/ApiContext";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <>
      <ApiProvider>
        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <Outlet />
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </ApiProvider>
    </>
  );
};

export default App;
