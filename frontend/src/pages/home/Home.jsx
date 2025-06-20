import React, { useState, useEffect } from "react";
import "./Home.css";
import RedHoodie from "../../assets/red-hoodie.png";
import Promotion from "./sections/promotion/Promotion.jsx";
import Collection from "./sections/collection/Collection.jsx";
import AboutOption from "./sections/aboutOption/AboutOption.jsx";
import { useNavigate } from "react-router-dom";
const Home = () => {
  //hooks
  const [activeLink, setActiveLink] = useState("home");

  const Navigate = useNavigate();
  const ScrollIntoView = (id) => {
    let sectionId = document.getElementById(id);
    if (sectionId) {
      sectionId.scrollIntoView({ behavior: "smooth" });
    }
  };
  const isActiveLink = (link, id) => {
    setActiveLink(link);
    ScrollIntoView(id);
  };


  return (
    <>
      <div id="home" className="home-main-back ">
        <div className="home-content-back">
          <div className="home-content">
            <h2>NEW ARRIVAL</h2>
            <h1 >
              UNLEASH YOUR STYLE <br />
              ELEVATE YOUR GAME
            </h1>
            <div className="content-detail">
              <p>
                Fashion is more than just clothing—it's a way to express
                yourself and connect with others. At FRIENDSSTORE, we bring you
                the trendiest styles, premium quality, and effortless fashion to
                keep you looking your best. Whether it's streetwear, casual
                fits, or statement pieces, we've got you covered. Shop now and
                upgrade your wardrobe—because great style is even better when
                shared!
              </p>
            </div>
            <div className="btn-back">
              <button
                className="content-btn"
                onClick={() => {
                    Navigate("/products");
                }}
              >
                SHOP NOW
              </button>
              <button className="content-btn" id="home-cart-btn"
               onClick={()=>{Navigate("/shopping-cart");}}>
                GO TO CART
              </button>
            </div>
          </div>
          <img className="bg-img" src={RedHoodie} alt="" />
          <div className="profile-sidebar-back"></div>
        </div>
        <div className="home-main-content">
          <Promotion />
          <Collection />
          <AboutOption />
        </div>
      </div>
    </>
  );
};
export default Home;
