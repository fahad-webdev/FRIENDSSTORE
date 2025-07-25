import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AboutUs from "./pages/about/AboutUs.jsx";
import PageNotFound from "./pages/pagenotfound/PageNotFound.jsx";
import Layout from "./layout/mainLayout/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import MensLayout from "./pages/mens/MensLayout.jsx";
import WomensLayout from "./pages/womens/WomensLayout.jsx";
import ProductLayout from "./pages/products/ProductLayout.jsx";
import CollectionLayout from "./pages/collections/CollectionLayout.jsx";
import Form from "./components/form/Form.jsx";
import ContactLayout from "./pages/contact/ContactLayout.jsx";
import AddToCartLayout from "./pages/addtocart/AddToCartLayout.jsx";
import AdminLayout from "./pages/admin/layout/AdminLayout.jsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import ProductDetails from "./pages/productDetail/ProductDetails.jsx";
import AdminProductDetails from "./pages/admin/productDetails/AdminProductDetails.jsx";
import Inventory from "./pages/admin/inventory/Inventory.jsx";
import AdminProduct from "./pages/admin/products/AdminProduct.jsx";
import AddProduct from "./pages/admin/form/AddProduct.jsx";
import UpdateProduct from "./pages/admin/form/UpdateProduct.jsx";
import User from "./pages/admin/user/User.jsx";
import AddUser from "./pages/admin/form/AddUser.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProfileLayout from "./pages/profile/Layout.jsx";
import ProfileInfo from "./components/profileInfo/ProfileInfo.jsx";
import Wishlist from "./components/wishlist/Layout.jsx"

const Route = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        path: "/",
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <AboutUs />,
            path: "/aboutus",
          },
          {
            element: <MensLayout />,
            path: "/mens",
          },
          {
            element: <WomensLayout />,
            path: "/womens",
          },
          {
            element: <ProductLayout />,
            path: "/products",
          },
          {
            element: <ProductDetails />,
            path: "/products/:id",
          },
          {
            element: <CollectionLayout />,
            path: "/Collections",
          },
          {
            element: <ContactLayout />,
            path: "/contact",
          },
          {
            element: <ProfileLayout />,
            path: "/profile",
            children: [
              {
                element: <ProfileInfo />,
                path: "",
              },
              {
                element:<Wishlist/>,
                path:"wishlist"
              }
            ],
          },
        ],
      },
      {
        element: <Form />,
        path: "/form",
      },
      {
        element: <AddToCartLayout />,
        path: "/shopping-cart",
      },
      {
        element: (
          <ProtectedRoute allowedRoles="admin">
            <AdminLayout />
          </ProtectedRoute>
        ),
        path: "/admin",
        children: [
          {
            element: <Dashboard />,
            path: "",
          },
          {
            element: <AdminProduct />,
            path: "products",
          },
          {
            element: <AdminProductDetails />,
            path: "products/:id",
          },
          {
            element: <Inventory />,
            path: "inventory",
          },
          {
            element: <AddProduct />,
            path: "add-product",
          },
          {
            element: <UpdateProduct />,
            path: "update-product/:id",
          },
          {
            element: <User />,
            path: "user",
          },
          {
            element: <AddUser />,
            path: "add-user",
          },
        ],
      },
      {
        element: <PageNotFound />,
        path: "*",
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Route} />
    </AuthProvider>
  </StrictMode>
);
