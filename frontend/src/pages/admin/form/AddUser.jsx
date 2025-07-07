import React, { useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useGlobal } from "../../../context/GlobalContext";
import { useUsers } from "../../../hooks/useUsers";
const AddUser = () => {
  const { createUser } = useUsers();
  const { setAlert } = useGlobal();
  const Navigate = useNavigate();
  const [ShowPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const togglePassword = () => {
    setShowPassword(!ShowPassword);
  };

  const checkValidation = () => {
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      setAlert({
        alert: true,
        message: "Please Provide Required Credentials",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({ alert: false, message: "", type: "" });
      }, 2500);
      return false;
    } else {
      const nameRegex = /^[A-Za-z]+$/;
      if (
        !nameRegex.test(formData.firstName) ||
        !nameRegex.test(formData.lastName)
      ) {
        setError((prev) => ({
          ...prev,
          name: "Name should contain letters only",
        }));
        setTimeout(() => {
          setError((prev) => ({ ...prev, name: "" }));
        }, 3000);
        return false;
      }

const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/i;
      if (!emailRegex.test(formData.email)) {
        setError((prev) => ({
          ...prev,
          email: "E-mail should be in '@gmail.com' format",
        }));
        setTimeout(() => {
          setError((prev) => ({ ...prev, email: "" }));
        }, 3000);
        return false;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

      if (!passwordRegex.test(formData.password)) {
        setError((prev) => ({
          ...prev,
          password:
            "Password should contain uppercase, lowercase, special character, and number",
        }));
        setTimeout(() => {
          setError((prev) => ({ ...prev, password: "" }));
        }, 3000);
        return false;
      }
      return true;
    }
  };
  const resetBtn = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "admin",
    });
  };
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (checkValidation()) {
      try {
        const result = await createUser(formData);
        //alert(result.message);
        setAlert({
          alert: true,
          message: result.message,
          type: result.success ? "success" : "danger",
        });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
          result.success;
        }, 2500);
      } catch (error) {
        //console.log("Error adding user", error);
        const message = error.response?.data?.message || "Something went wrong";
        setAlert({
          alert: true,
          message: message,
          type: "danger",
        });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
        }, 2500);
      }
    }
  };
  return (
    <>
      <div className="dashboard-back">
        <div className="dashboard-main adduser-main">
          <div className="admin-head-back">
            <h1 className="admin-heading">
              <GroupAddIcon /> Create User
            </h1>
          </div>
          <div className="adduser-form-back">
            <form onSubmit={HandleSubmit} className="adduser-form">
              <div className="productform-input-back adduserform-input-back">
                <label htmlFor="">First Name:</label>
                <input
                  placeholder="Fahad "
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={HandleChange}
                  className="productform-input"
                />
                {error.name && <p className="error1 ">{error.name}</p>}
              </div>
              <div className="productform-input-back adduserform-input-back">
                <label htmlFor="">Last Name:</label>
                <input
                  placeholder="Pervaiz"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={HandleChange}
                  className="productform-input"
                />
                {error.name && <p className="error1 ">{error.name}</p>}
              </div>
              <div className="productform-input-back adduserform-input-back">
                <label htmlFor="">E-mail:</label>
                <input
                  placeholder="example@gmail.com"
                  name="email"
                  value={formData.email}
                  type="text"
                  onChange={HandleChange}
                  className="productform-input"
                />
                {error.email && (
                  <p className="error2 user-email-error">{error.email}</p>
                )}
              </div>
              <div className="productform-input-back adduserform-input-back">
                <label htmlFor="">Password:</label>
                <input
                  placeholder="*********"
                  name="password"
                  value={formData.password}
                  type={ShowPassword ? "text" : "password"}
                  onChange={HandleChange}
                  className="productform-input"
                />
                {ShowPassword ? (
                  <VisibilityIcon
                    className="icon pass-icon"
                    onClick={togglePassword}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="icon pass-icon"
                    onClick={togglePassword}
                  />
                )}
                {error.password && (
                  <p className="error3 user-error-message">{error.password}</p>
                )}
              </div>
              <div className="productform-input-back adduserform-input-back">
                <label htmlFor="">Role:</label>
                <div className="user-role-back">
                  <span
                    onClick={() => setFormData(prev => ({ ...prev, role: "admin" }))}
                    className={
                      formData.role === "admin"
                        ? "user-role-active"
                        : "user-role"
                    }
                  >
                    Admin
                  </span>
                  <span
                    onClick={() => setFormData(prev => ({ ...prev, role: "user" }))}
                    className={
                      formData.role === "user"
                        ? "user-role-active"
                        : "user-role"
                    }
                  >
                    User
                  </span>
                </div>
              </div>
              <div className="addProduct-btn-back adduser-btn-back">
                <button
                  type="submit"
                  className="inventory-add-btn productform-btn"
                >
                  CREATE
                </button>
                <button
                  type="button"
                  onClick={() => Navigate(-1)}
                  className="inventory-add-btn productform-btn"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
