import React from "react";
import { useApi } from "../../context/ApiContext";
import success from "../../assets/success.png";
import danger from "../../assets/danger.png";
import close from "../../assets/close-alert.png";
import closeSuccess from "../../assets/close-success.png";

import "./Alerts.css";
const Alerts = () => {
  const { setAlert, alert } = useApi();
  return (
    <>
      <div
        className={
          alert.alert
            ? `adminAlert-back alert-back-active ${alert.type}`
            : "adminAlert-back"
        }
      >
        <div className={`adminAlert-icon-back `}>
          <img
            src={alert.type === "success" ? success : danger}
            alt=""
            className="adminAlert-icon"
          />
        </div>
        <div className="adminAlert-message">
          <label htmlFor="">{alert.type}!</label>
          <p
            className={`${alert.type}`}
            style={{ backgroundColor: "transparent" }}
          >
            {alert.message}
          </p>
        </div>
        <div className="admin-alert-icon-back">
          <img
            src={alert.type === "success" ? closeSuccess : close}
            alt=""
            className="adminAlert-icon"
          />
        </div>
      </div>
    </>
  );
};

export default Alerts;
