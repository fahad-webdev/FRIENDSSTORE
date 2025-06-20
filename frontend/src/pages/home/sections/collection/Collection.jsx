import React, { useState } from "react";
import "./Collection.css";
import { useNavigate } from "react-router-dom";
import HeadAnimation from "../../../../hooks/HeadAnimation";

const Collection = () => {
  const [MouseHover, setMouseHover] = useState({
    image1: false,
    image2: false,
    image3: false,
  });

  const mouseOverOn1 = () => {
    setMouseHover((prevState) => ({ ...prevState, image1: true }));
  };
  const mouseOverOff1 = () => {
    setMouseHover((prevState) => ({ ...prevState, image1: false }));
  };
  const mouseOverOn2 = () => {
    setMouseHover((prevState) => ({ ...prevState, image2: true }));
  };
  const mouseOverOff2 = () => {
    setMouseHover((prevState) => ({ ...prevState, image2: false }));
  };
  const mouseOverOn3 = () => {
    setMouseHover((prevState) => ({ ...prevState, image3: true }));
  };
  const mouseOverOff3 = () => {
    setMouseHover((prevState) => ({ ...prevState, image3: false }));
  };
  const Navigate = useNavigate();
  const categoryFilterArray = []; //"mens-shirts", "mens-shoes", "mens-jeans", "mens-watches" Add all men's categories
  const ShoesPara = `Step into style with our premium shoe collection! From elegant formal shoes to versatile loafers and rugged boots, we offer the perfect blend of fashion, comfort, and durability. Designed for every occasion, our shoes are crafted with precision to keep you looking sharp and feeling confident all day long. Discover the perfect pair and walk with confidence!`;
  const HoodiePara = `Wrap yourself in style and comfort with our premium hoodie collection! Designed for trendsetters who refuse to compromise on quality, our hoodies blend effortless fashion with unbeatable coziness. Whether you're layering up for a chilly day or making a bold statement, each piece is crafted for warmth, durability, and everyday versatility. Stay ahead of the trend—shop now and upgrade your wardrobe!`;
  const DressPara = `Grace meets elegance in our stunning women's dress collection! Designed for every occasion, our dresses blend timeless charm with modern sophistication. From chic casual wear to statement-making ensembles, each piece is crafted with premium fabrics for the perfect fit and effortless style. Discover the beauty of fashion—shop now and elevate your look!`;
  
    HeadAnimation();

  return (
    <>
      <div className="collection-main-back " id="collection-main-back">
        <div className="collection-main">
          <div className="heading1">
            <h1 className="head">OUR COLLECTION</h1>
          </div>
          <div className="collection-content head">
            <div
              className="collection-image-back"
              onClick={() =>
                Navigate("/collections", {
                  state: {
                    heading: "HOODIES COLLECTION",
                    para: HoodiePara,
                    categoryFilterArray: ["unisex hoodie", "women's hoodie"],
                  },
                })
              }
            >
              <div
                className="collection-image"
                id="image1"
                onMouseOver={mouseOverOn1}
                onMouseOut={mouseOverOff1}
              >
                <div
                  className="image-hover"
                  style={{
                    transform:
                      MouseHover.image1 === true ? "scale(1)" : "scale(0.001)",
                  }}
                >
                  <p>
                    Stay warm, stay stylish! Our latest hoodies blend premium
                    comfort with effortless fashion, perfect for any occasion.
                    Upgrade your look today!{" "}
                  </p>
                  <button className="img-btn">SHOP NOW</button>
                </div>
              </div>
              <h1>HOODIE COLLECTION</h1>
            </div>
            <div
              className="collection-image-back"
              onMouseOver={mouseOverOn2}
              onMouseOut={mouseOverOff2}
            >
              <div
                className="collection-image"
                id="image2"
                onClick={() => {
                  Navigate("/collections", {
                    state: {
                      heading: "SHOES COLLECTION",
                      para: ShoesPara,
                      categoryFilterArray: [
                        "shoes",
                        "men's shoes",
                        "women's shoes",
                      ],
                    },
                  });
                }}
              >
                <div
                  className="image-hover"
                  style={{
                    transform:
                      MouseHover.image2 === true ? "scale(1)" : "scale(0.001)",
                  }}
                >
                  <p>
                    Step into elegance with our finely crafted formal, loafers,
                    and boots—designed for confidence, comfort, and durability.
                    Find your perfect pair now!
                  </p>
                  <button className="img-btn">SHOP NOW</button>
                </div>
              </div>
              <h1>SHOES COLLECTION</h1>
            </div>
            <div className="collection-image-back">
              <div
                onClick={() =>
                  Navigate("/collections", {
                    state: {
                      heading: "DRESSES COLLECTION",
                      para: DressPara,
                      categoryFilterArray: [
                        "womens-dresses",
                        "women's clothing",
                        "tops",
                      ],
                    },
                  })
                }
                className="collection-image"
                id="image3"
                onMouseOver={mouseOverOn3}
                onMouseOut={mouseOverOff3}
              >
                <div
                  className="image-hover"
                  style={{
                    transform:
                      MouseHover.image3 === true ? "scale(1)" : "scale(0.001)",
                  }}
                >
                  <p>
                    Elevate your style with our stunning dress collection, where
                    elegance meets modern sophistication. Turn heads and make
                    every moment unforgettable!
                  </p>
                  <button className="img-btn">SHOP NOW</button>
                </div>
              </div>
              <h1>DRESS COLLECTION</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
