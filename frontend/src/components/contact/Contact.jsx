import React from "react";
import "./Contact.css";
import InstaIcon from "../../assets/instagram.png";
import FaceBookIcon from "../../assets/facebook.png";
import YoutubeIcon from "../../assets/play.png";
import HeadAnimation from "../../hooks/HeadAnimation";
const Contact = () => {
  HeadAnimation();
  return (
    <>
      <div className="contact-main-back">
        <div className="contact-main">
          <div className="heading1">
            <h1 className="head">  FRIENDSSTORE</h1>
          </div>
          <div className="contact-content head">
            <div className="content ">
              <h2>ABOUT</h2>
              <p>
                We offer a premium collection of shoes, hoodies, and dresses,
                designed for those who value fashion, comfort, and durability.
                From everyday essentials to statement pieces, our products are
                crafted to elevate your style with quality you can trust.
              </p>{" "}
            </div>
            <div className="content">
              <h2>USEFUL INFORMATION</h2>
              <div className="ul-back">
                <ul>
                  <a>
                    <li>WARRANTY</li>
                  </a>
                  <a>
                    <li>TERMS & CONDITIONS</li>
                  </a>
                  <a>
                    <li>PRIVACY POLICY</li>
                  </a>
                  <a>
                    <li>COOKIES POLICY</li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="content">
              <h2>ASSISSTANCE</h2>
              <div className="ul-back">
                <ul>
                  <a>
                    <li>FAQS</li>
                  </a>
                  <a>
                    <li>SIZE GUIDE</li>
                  </a>
                  <a>
                    <li>EUROPE DELIVERY</li>
                  </a>
                  <a>
                    <li>DELIVERY</li>
                  </a>
                  <a>
                    <li>DELIVERY & RETURN</li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="content">
              <h2>CONTACT</h2>
              <div className="ul-back">
                <ul>
                  <a>
                    <li>MONDAY - FRIDAY 8:00 - 16:00</li>
                  </a>
                  <a>
                    <li>+92 311 7769209</li>
                  </a>
                  <a>
                    <li>+92 332 7531590</li>
                  </a>
                  <a>
                    <li>CONTACT@FRIENDSSTORE.COM</li>
                  </a>
                </ul>{" "}
              </div>
            </div>
          </div>
          <div className="contact-social-link-back">
            <div className="contact-social-link">
            <img src={InstaIcon} className="link-icons" alt="" />
            <img src={YoutubeIcon} className="link-icons" alt="" />
            <img src={FaceBookIcon} className="link-icons" alt="" />
            </div>
          </div>
          <div className="contact-social-link-back">
            <p>
            Copyright © 2025 FRIENDSSTORE - A Brand Built on Quality & Style. All Rights Reserved.           
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
