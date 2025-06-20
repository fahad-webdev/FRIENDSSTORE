import React, { useEffect, useState } from "react";
import "./AboutUsStory.css";
import StoreWall from "../../../../assets/store-wall1.jpg";
import StoreWall1 from "../../../../assets/store-wall2.jpg";
import StoreWall2 from "../../../../assets/store-wall3.jpg";
import ParaAnimation from "../../../../hooks/ParaAnimation.js";
import HeadAnimation from "../../../../hooks/HeadAnimation.js";
const AboutUsStory = () => {
  const [index, setIndex] = useState(0);

  const images = [StoreWall, StoreWall1, StoreWall2];

  useEffect(()=>{
    const interval = setInterval(() => {
      setIndex((prevIndex)=>((prevIndex + 1)%images.length));
    }, 2000);

    return ()=>clearInterval(interval);
  },[])

  ParaAnimation();
  HeadAnimation();
  return (
    <>
      <div className="aboutusstory-main-back  ">
        <div className="aboutusstory-main">
          <div className="aboutusstory ">
            <div className="aboutusstory-half1">
              <div className="heading1">
                <h1 className="head ">
                  About Us - The Journey of FRIENDSSTORE
                </h1>
              </div>
              <div className=" para">
                <h3>From a Dream to Reality</h3>
                FRIENDSSTORE was born out of ambition, passion, and
                determination. It all started when two university friends, Fahad
                and Hassan, envisioned creating a fashion brand that would offer
                stylish yet affordable footwear and apparel. While still
                students, they dreamed big but had limited resources. With
                nothing but their savings and pocket money, they took the bold
                step of starting their online store, initially selling shoes as
                resellers.
              </div>
              <div className=" para">
                <h3>The Road to Success</h3>
                Starting with minimal investment, they focused on curating the
                best designs, ensuring quality, and providing an exceptional
                shopping experience. Every profit they made was reinvested into
                their growing brand, with a bigger vision in mind—to manufacture
                their own products. For five years, they worked tirelessly,
                facing challenges, learning from experiences, and improving
                their brand. Finally, their perseverance paid off. They
                transitioned from being sellers to manufacturers, creating their
                own unique, high-quality products. This shift allowed them to
                introduce not only premium shoes but also hoodies and female
                dresses, expanding their collection and establishing
                FRIENDSSTORE as a complete fashion destination.
              </div>
            </div>
            <div className="aboutusstory-half2">
              <div className="image-back"
              style={{backgroundImage:`url(${images[index]})`}}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUsStory;
