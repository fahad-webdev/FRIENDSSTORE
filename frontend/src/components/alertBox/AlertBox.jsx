import React from "react";
import "./AlertBox.css";
import { useGlobal } from "../../context/GlobalContext";
const AlertBox = () => {
  const { alertBox, setAlertBox } = useGlobal();
  return (
    <>
      <div
        className={`alert-box-back ${
          alertBox.alert ? "alert-box-back-active" : ""
        }`}
      >
        <div>
          <h1>{alertBox.head}</h1>
          <p>{alertBox.message}</p>
        </div>
        <div className={`alert-box-btn-back `}>
          <button
            className="alert-box-btn card-btn"
            type="button"
            onClick={() => {
              if (alertBox.onConfirm) 
              alertBox.onConfirm();
              setAlertBox({ alert: false });
            }}
          >
            YES
          </button>
          <button
            className="alert-box-btn"
            type="button"
            onClick={() => setAlertBox({ alert: false })}
          >
            NO
          </button>
        </div>
      </div>
    </>
  );
};

export default AlertBox;
