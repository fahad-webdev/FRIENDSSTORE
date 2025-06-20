import { React, useEffect, useState } from "react";
import "./Promotion.css";
import ParaAnimation from "../../../../hooks/ParaAnimation.js";
import { useLocation, useNavigate } from "react-router-dom";
import HeadAnimation from "../../../../hooks/HeadAnimation.js";

const Promotion = () => {
  //hooks
  const [mouseOver, setMouseOver] = useState({
    image1: false,
    image2: false,
  });

  const Navigate = useNavigate();
  ParaAnimation();//hook for animation for para
  HeadAnimation();//hook for animation for heading
  //functions
  const MouseHoverOn1 = () => {
    setMouseOver((prevState) => ({ ...prevState, image1: true }));
  };
  const MouseHoverOff1 = () => {
    setMouseOver((prevState) => ({ ...prevState, image1: false }));
  };
  const MouseHoverOn2 = () => {
    setMouseOver((prevState) => ({ ...prevState, image2: true }));
  };
  const MouseHoverOff2 = () => {
    setMouseOver((prevState) => ({ ...prevState, image2: false }));
  };  

  const categoryFilterArray=[];
  const newArrivalPara="Experience unmatched quality with our latest arrivals! Every piece in our new collection is crafted with precision, using premium materials to ensure superior comfort, durability, and style. From flawlessly stitched fabrics to expertly designed footwear, we prioritize excellence in every detail. Whether you're looking for trendsetting fashion or timeless essentials, our newest additions bring you the perfect blend of elegance and reliability. Shop now and indulge in quality you can see and feel!";
  const salesPara ="Our most awaited Finale Sale is here — and it's bigger than ever! Enjoy a massive 50% OFF on our top-selling shoes, hoodies, and dresses. This is your last chance to grab premium quality and trendsetting styles at unbeatable prices. Stocks are limited and the clock is ticking — shop now and upgrade your wardrobe without breaking the bank!";
  return (
    <>
      <div className="promotion-main-back">
        <div className="promotion-main">
          <div className="promotion-half1">
            <div className="heading1">
              <h1 className="head">NEW ARRIVAL</h1>
            </div>
            <div className="promotion-content head">
              <div
              onClick={()=>Navigate("/collections",{state:{heading:"NEW ARRIVALS",para:newArrivalPara}})}
                className="promotion-image-back"
                onMouseOut={MouseHoverOff1}
                onMouseOver={MouseHoverOn1}
              >
                <div
                  className="image-hover"
                  style={{
                    transform:
                      mouseOver.image1 === true
                        ? /*"scale(1)":"scale(0.001)"*/ "translateX(-0%)"
                        : "translateX(-100%)",
                  }}
                >
                  <p>
                    Elevate your wardrobe with our premium hoodie
                    collection—crafted for trendsetters who demand both style
                    and coziness. Soft, durable, and effortlessly cool, these
                    hoodies are perfect for any occasion. Stay warm, stay
                    stylish, stay ahead.
                  </p>
                  <button className="img-btn">EXPLORE</button>
                </div>
              </div>
              <p className="para">
                New Arrival - Premium Hoodie Collection Upgrade your wardrobe
                with our latest hoodies, designed for style, comfort, and
                durability. these hoodies offer the perfect blend of warmth,
                durability, and effortless style. Whether you're layering up for
                a chilly day, Made from ultra-soft, high-quality fabrics, they
                offer the perfect blend of warmth and effortless fashion.
              </p>
            </div>
          </div>
          <div className="promotion-half2">
            <div className="heading1">
              <h1 className="head">FINALE SALES</h1>
            </div>
            <div className="promotion-content head">
              <p className="para">
                Discover our premium Formal, Loafers, and Boots collection,
                designed for style, comfort, and durability. Whether you need
                polished formal shoes for business and special occasions,
                versatile loafers for effortless elegance, or rugged boots for
                bold adventures, we have the perfect pair for every occasion.
                Crafted from high-quality materials with a focus on superior
                comfort and timeless appeal, our collection ensures you step
                forward with confidence. Explore Now and find the perfect fit
                for your style!
              </p>
              <div
                className="promotion-image-back"
                onMouseOut={MouseHoverOff2}
                onMouseOver={MouseHoverOn2}
                onClick={()=>{Navigate("/collections",{state:{heading:"FINALE SALES 50%",para:salesPara ,categoryFilterArray:["shoes","men's shoes","women's shoes"]}})}}
              >
                <div className="sale-heading">
                  <h1>FINALE SALES</h1>
                  <h1>50% OFF</h1>
                </div>
                <div
                  className="image-hover"
                  style={{
                    transform:
                      mouseOver.image2 === true
                        ? /*"scale(1)":"scale(0.001)"*/ "translateX(-0%)"
                        : "translateX(-100%)",
                  }}
                >
                  <p>
                    Step Up Your Style! Elevate every step with our premium
                    Formal, Loafers, and Boots collection—crafted for
                    confidence, comfort, and class. Whether it's power dressing,
                    effortless charm, or bold adventures, the perfect pair
                    awaits you. Hover, Explore, and Walk in Style!
                  </p>
                  <button className="img-btn">EXPLORE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotion;
