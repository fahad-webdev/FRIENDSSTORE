import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";
const Sidebar = () => {
  const {sidebar, setSidebar , setSearchOpen ,searchOpen} = useGlobal();
  const categoryFilterArray = [];
  const mensHeading = `MEN'S`;
  const mensPara = `Elevate your style with our premium men's collection! From sleek formal shoes to rugged boots, trendy loafers, and ultra-comfortable hoodies, we bring you fashion that blends sophistication with everyday ease. Designed for the modern man who values both style and quality, our collection ensures you look sharp and feel confident no matter the occasion. Shop now and upgrade your wardrobe with timeless essentials!`;
  const womensHeading = `WOMEN'S`;
  const womensPara = `Elevate your style with our premium men's collection! From sleek formal shoes to rugged boots, trendy loafers, and ultra-comfortable hoodies, we bring you fashion that blends sophistication with everyday ease. Designed for the modern man who values both style and quality, our collection ensures you look sharp and feel confident no matter the occasion. Shop now and upgrade your wardrobe with timeless essentials!`;
  const salesPara =
    "Our most awaited Finale Sale is here — and it's bigger than ever! Enjoy a massive 50% OFF on our top-selling shoes, hoodies, and dresses. This is your last chance to grab premium quality and trendsetting styles at unbeatable prices. Stocks are limited and the clock is ticking — shop now and upgrade your wardrobe without breaking the bank!";
  const toggleSearch = () => {
    setSidebar(false);
    setSearchOpen(searchOpen === "close" ? "open" : "close");
  };
  return (
    <div
      className="sidebar-back"
      style={{
        transform: sidebar === true ? "translateX(-0%)" : "translateX(-100%",
      }}
    >
      <ul>
       <li>
         <NavLink
          to="/mens"
          end
          className={({ isActive }) =>
            isActive ? "active-sidebar-link" : " sidebar-link"
          }
          state={{
            heading: mensHeading,
            para: mensPara,
            categoryFilterArray: [
              "men's shoes",
              "mens-shirts",
              "unisex hoodie",
            ],
          }}
          onClick={()=>setSidebar(false)}
        >
          MEN'S
        </NavLink>
       </li>
        <NavLink
          to="/womens"
          end
          className={({ isActive }) =>
            isActive ? "active-sidebar-link" : " sidebar-link"
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
           onClick={()=>setSidebar(false)}
        >
          <li>WOMEN'S</li>
        </NavLink>
        <li>
          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              isActive ? "active-sidebar-link" : " sidebar-link"
            }
             onClick={()=>setSidebar(false)}
          >
            SHOP
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shopping-cart"
            end
            className={({ isActive }) =>
              isActive ? "active-sidebar-link" : " sidebar-link"
            }
            state={{
              heading: "FINALE SALES 50%",
              para: salesPara,
              categoryFilterArray: ["shoes", "men's shoes", "women's shoes"],
            }}
             onClick={()=>setSidebar(false)}
          >
            MY CART
          </NavLink>
        </li>
        <a className=" sidebar-link" onClick={toggleSearch}>
          <li>SEARCH</li>
        </a>
      </ul>
    </div>
  );
};

export default Sidebar;
