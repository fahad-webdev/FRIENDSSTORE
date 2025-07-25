import React, { useEffect } from "react";
import "./Layout.css";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../context/CartContext";
import AlertBox from "../../components/alertBox/AlertBox";
const Layout = () => {

  const { fetchWishlist , wishlist } = useWishlist();
  const { getCart, cartItems } = useCart();
  const { user, fetchUserProfile } = useAuth();

  useEffect(() => {
    fetchUserProfile();
    fetchWishlist();
     getCart();
  }, []);

  return (
    <>
      {user ? (
        <>
        <AlertBox/>
        <div className="profile-layout-back">
          <div className="profile-layout-half1">
            <div className="profile-layout-image-back">
              <img
                src={user?.profilePic}
                alt=""
                className="profile-layout-image"
              />
            </div>
          </div>

          <div className="profile-layout-half2">
            <div className="profile-head-back">
              <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
            </div>
            <div className="profile-content-back">
              <div className="profile-content-head-back">
                
                <div className="profile-navigate-options-back">
                  <ul>
                    <li>
                      <NavLink
                        to=""
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "profile-info-link profile-info-link-active"
                            : "profile-info-link"
                        }
                      >
                        PROFILE
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="wishlist"
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "profile-info-link profile-info-link-active"
                            : "profile-info-link"
                        }
                      >
                        WISHLIST
                      </NavLink>
                      <span className="notif-no-of-products">
                        {wishlist?.length}
                      </span>
                    </li>
                    <li>
                      <NavLink
                       to="/shopping-cart"
                        end
                       className={({ isActive }) =>
                          isActive
                            ? "profile-info-link profile-info-link-active"
                            : "profile-info-link"
                        }
                        >CART</NavLink>
                      <span className="notif-no-of-products">{cartItems.length}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="profile-content-main">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        </>
      ) : (
        <div className="profile-login-back">
          <h1 className="no-product-message">
            <SentimentVeryDissatisfiedIcon style={{ fontSize: "100px" }} />
            Please! login to access this page
          </h1>
        </div>
      )}
    </>
  );
};

export default Layout;
