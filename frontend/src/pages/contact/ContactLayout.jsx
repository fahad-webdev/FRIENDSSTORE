import React from "react";
import "./ContactLayout.css";
import ContactPage from "./sections/ContactPage.jsx";
const ContactLayout = () => {
  return (
    <>
      <div className="about-main-back contact-page-back">
        <div className="about-content-back contact-content-back">
          <div className="about-content">
            <h1>CONTACT US</h1>
            <p>
              Have a question or need assistance? We're here to help! Whether
              it’s about your order, product inquiries, or general support, our
              team is always ready to assist you. Reach out to us through our
              contact form, email, or social media, and we’ll get back to you as
              soon as possible. Your satisfaction is our priority!{" "}
            </p>
          </div>
        </div>
        <ContactPage/>
      </div>
    </>
  );
};

export default ContactLayout;
