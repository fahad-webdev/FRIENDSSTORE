import React, { useState , useEffect} from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    //emailjs.init("KrogCT7wko7xYYYI8"); // Your Public Key
  }, []);
  const Validation = () => {};
  const HandleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    /*emailjs
    .send(
      "service_zrjm5ga", // Your Service ID
      "template_3znj5b7", // Your Template ID
      {
        to_email: "friendsstorecontactus@gmail.com", // Add recipient email here
        user_name: FormData.name,
        user_email: FormData.email,
        user_phone: FormData.phone,
        user_message: FormData.message,
      },
      "KrogCT7wko7xYYYI8" // Your Public Key
    ).then(
      () => {
        alert("Message sent successfully to friendsstorecontactus@gmail.com!");
        setFormData({ name: "", phone: "", email: "", message: "" }); // Reset form
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Failed to send message.");
      }
    );*/
  };
  const ResetBtn = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  return (
    <>
      <div className="aboutmission-main-back ">
        <div className="aboutmission-main">
          <div className="aboutmission contactpage">
            <div className="heading1">
              <h1>CONTACT US</h1>
            </div>
            <div className="contactpage-detail-back">
              <div className="contactpage-heading">
                <h1>Get In Touch</h1>
                <h1>We Would Love From You</h1>
              </div>
              <div className="contact-page-detail">
                <form onSubmit={HandleSubmit}>
                  <div className="contactpage-input-back">
                    <label htmlFor="">Address</label>
                    <input
                      value={FormData.name}
                      onChange={HandleChange}
                      name="name"
                      type="text"
                      className="contact-input"
                      placeholder="Name"
                     
                    />
                  </div>
                  <div className="contactpage-input-back">
                    <label className="contact-label" htmlFor="">
                      Clifton Boulevard, Block 4, Near Marine Promenade,
                      Karachi, Pakistan
                    </label>
                    <input
                      value={FormData.email}
                      onChange={HandleChange}
                      name="email"
                      type="email"
                      className="contact-input"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="contactpage-input-back">
                    <label htmlFor="">
                      Phone Number
                      <br />
                      <label htmlFor="" className="contact-label">
                        0332-2990040
                      </label>
                    </label>
                    <input
                      value={FormData.phone}
                      onChange={HandleChange}
                      name="phone"
                      type="tel"
                      className="contact-input"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="contactpage-input-back">
                    <label htmlFor="">
                      E-mail
                      <br />
                      <label htmlFor="" className="contact-label">
                        friendsstore@gmail.com
                      </label>
                    </label>
                    <textarea
                      value={FormData.message}
                      onChange={HandleChange}
                      placeholder="Your Message"
                      name="message"
                      className="contact-input"
                      id="text-area"
                    ></textarea>
                  </div>
                  <div className="contact-page-btn-back">
                    <button className="contact-page-btn" onClick={ResetBtn}>
                      CLEAR
                    </button>
                    <button type="submit" className="contact-page-btn">
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
