import { React, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useApi } from "../../context/ApiContext";
const Navbar = () => {
  const {searchOpen, setSearchOpen,sidebar, setSidebar} = useApi();
  const toggleSearch = () => {
    setSearchOpen(searchOpen === "close" ? "open" : "close");
  };
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  const categoryFilterArray = [];
  const mensHeading = `MEN'S`;
  const mensPara = `Elevate your style with our premium men's collection! From sleek formal shoes to rugged boots, trendy loafers, and ultra-comfortable hoodies, we bring you fashion that blends sophistication with everyday ease. Designed for the modern man who values both style and quality, our collection ensures you look sharp and feel confident no matter the occasion. Shop now and upgrade your wardrobe with timeless essentials!`;
  const womensHeading = `WOMEN'S`;
  const womensPara = `Elevate your style with our premium men's collection! From sleek formal shoes to rugged boots, trendy loafers, and ultra-comfortable hoodies, we bring you fashion that blends sophistication with everyday ease. Designed for the modern man who values both style and quality, our collection ensures you look sharp and feel confident no matter the occasion. Shop now and upgrade your wardrobe with timeless essentials!`;
  const salesPara =
    "Our most awaited Finale Sale is here — and it's bigger than ever! Enjoy a massive 50% OFF on our top-selling shoes, hoodies, and dresses. This is your last chance to grab premium quality and trendsetting styles at unbeatable prices. Stocks are limited and the clock is ticking — shop now and upgrade your wardrobe without breaking the bank!";

  return (
    <>
      <nav className="navbar-main-back unselectable">
        <div className="navbar-upper">
          <ul>
            <li>
              <NavLink to="/contact">CONTACT</NavLink>
            </li>
            <li>
              <NavLink to="/form">LOGIN</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-main">
          <div className="menu-back" onClick={toggleSidebar}>
            <div className="menu">
              <span className={sidebar ? "span1" : ""}></span>
              <span className={sidebar ? "span2" : ""}></span>
              <span className={sidebar ? "span3" : ""}></span>
            </div>
          </div>

          <li className="head-back">
            <NavLink
              to="/"
              className="h1"
            >
              FRIENDSSTORE
            </NavLink>
          </li>
          <ul>
            <li>
              <NavLink
                className={({isActive})=>
                isActive?"active-link" : "link"}
                to="/mens"
                end
                state={{
                  heading: mensHeading,
                  para: mensPara,
                  categoryFilterArray: [
                    "men's shoes",
                    "mens-shirts",
                    "unisex hoodie",
                  ],
                }}
              >
                MEN'S
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/womens"
                end
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                state={{
                  heading: womensHeading,
                  para: womensPara,
                  categoryFilterArray: [
                    "womens-dresses",
                    "women's clothing",
                    "women's hoodie",
                    "women's shoes",
                    "tops",
                    "womens-jewellery",
                    "unisex hoodie",
                  ],
                }}
              >
                WOMEN'S
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                end
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                SHOP ALL
              </NavLink>
            </li>
            <li>
              {/*
             <NavLink className={activeLink==="sales"?"active-link":"link" }
            to="/collections"
            state={{heading:"FINALE SALES 50%",para:salesPara ,categoryFilterArray:["shoes","men's shoes","women's shoes"]}}
            onClick={()=>isActiveLink("sales","sales")}
            >
             SALES
            </NavLink>
            */}
              <NavLink
                to="/shopping-cart"
                end
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                MY CART
              </NavLink>
            </li>
            <li>
              <a className="link" onClick={toggleSearch}>
                SEARCH
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
