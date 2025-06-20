import React, { useState } from "react";
import "./Form.css";
import ThinArrow from "../../assets/thin-arrow.png";
import Login from "../../pages/login/Login.jsx";
import { useNavigate } from "react-router-dom";
import Signup from "../../pages/signup/Signup.jsx";
import danger from "../../assets/danger.png";
import close from "../../assets/close-alert.png";
import closeSuccess from "../../assets/close-success.png";
import success from "../../assets/success.png";
import { useApi } from "../../context/ApiContext.jsx";
const Form = () => {
  const Navigate = useNavigate();
  const {setAlert,alert} =useApi();
  const [formType, setFormType] = useState("login");
   
  return (
    <>
      <div className="form-main-back">
        <div className="form-main">

        <div className={alert.alert?`alert-back alert-back-active ${alert.type}`:"alert-back"} >
            <img src={alert.type==="danger" ? danger : success} alt="alert-icon" className="alert-icon" />
            <div className="alert-message">
              <p className={`${alert.type}`} style={{backgroundColor:"transparent"}}>{alert.message}</p>
            </div>
            <img src={alert.type==="danger"?close:closeSuccess} alt="" className="alert-icon close" onClick={()=>setAlert({alert:false,message:"",type:""})}/>
          </div>
        
          <div className="form-half1">
            <div className="form-half1-content-back">
              <div className="form-half1-content">
                <img
                  src={ThinArrow}
                  alt=""
                  className="arrow"
                  onClick={() => Navigate(-1)}
                />
                <h1>
                  welcome to
                  <br /> FRIENDSSTORE
                </h1>
                <p>
                  Where Quality Meets Style! At FRIENDSSTORE, we are committed
                  to delivering premium fashion with unmatched craftsmanship.
                  Every product is designed with precision, using high-quality
                  materials to ensure durability, comfort, and timeless style.
                  Join us and experience fashion that’s made to last!{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="form-half2">
            <button className="form-back-btn" onClick={()=>Navigate("/")}>
              Back
            </button>
            {formType === "login" ? (
              <Login setFormType={setFormType} setAlert={setAlert} />
            ) : (
            formType==="signup" ? (
              <Signup setFormType={setFormType} setAlert={setAlert}/>
            ) : ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
