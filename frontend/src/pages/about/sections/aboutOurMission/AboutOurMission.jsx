import React, { useState, useEffect } from "react";
import StoreWall1 from "../../../../assets/store-wall4.jpg";
import StoreWall2 from "../../../../assets/store-wall5.jpg";
import StoreWall3 from "../../../../assets/store-wall6.jpg";
import HeadAnimation from "../../../../hooks/HeadAnimation.js";
import "./AboutOurMission.css";
const AboutOurMission = () => {
  const [index ,setIndex ] = useState(0);

  const images=[
    StoreWall1,
    StoreWall2,
    StoreWall3,
  ];

  useEffect(()=>{
    const interval = setInterval(()=>{
      setIndex((prevIndex)=>((prevIndex+1) % images.length));
    },2000);

    return ()=>clearInterval(interval);
  },[]);

  HeadAnimation();
  return (
    <>
      <div className="aboutmission-main-back ">
        <div className="aboutmission-main">
          <div className="aboutmission ">
            <div className="aboutmission-half1">
              <div className="heading1">
                <h1 className="head">OUR MISSION - REDEFINING STYLE & COMFORT OUR MISSION</h1>
              </div>
              <div className=" para">
                At FRIENDSSTORE, we believe that fashion is more than just
                clothing—it's a statement of confidence, personality, and
                ambition. Our mission is to bring high-quality, stylish, and
                affordable fashion to those who dare to stand out. Every piece
                we create blends modern trends with superior craftsmanship,
                ensuring that you not only look good but feel incredible.
                Whether it’s the perfect pair of shoes, a cozy hoodie, or a
                stunning dress, we’re here to elevate your wardrobe and redefine
                everyday fashion.
              </div>
              <div className=" para">
                <h3> What We Offer – Elevate Your Style with FRIENDSSTORE</h3>
                Discover a collection designed for trendsetters, go-getters, and
                fashion lovers. We bring you:
                <ul>
                  <li>
                    <strong>Shoes That Make a Statement – </strong> From sleek formals to
                    effortless loafers and rugged boots, our footwear collection
                    is crafted for every occasion. Comfort meets style in every
                    step.
                  </li>
                  <li>
                    Hoodies for Every Mood – Soft, stylish, and built for
                    versatility, our hoodies keep you warm while making a bold
                    statement. Whether you’re dressing up or keeping it casual,
                    we’ve got the perfect fit.
                  </li>
                  <li>
                    Dresses That Define Elegance – Designed for the modern
                    woman, our dress collection offers a blend of chic, classy,
                    and contemporary styles, ensuring you turn heads wherever
                    you go.
                  </li>
                </ul>
                Every product at FRIENDSSTORE is a reflection of our
                journey—from humble beginnings to a brand that stands for
                quality, innovation, and fashion-forward thinking.
              </div>
            </div>
            <div className="aboutmission-half2">
              <div className="image-back" 
              style={{backgroundImage:`url(${images[index]})`}}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutOurMission;
