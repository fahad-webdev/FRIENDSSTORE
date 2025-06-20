import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useApi } from "../../context/ApiContext";
import { useUser } from "../../context/UserContext";

const Signup = ({  setFormType }) => {
  const { createUser } = useUser();
  const { setAlert} = useApi();
  const [ShowPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      form.firstName === "" ||
      form.lastName === "" ||
      form.email === "" ||
      form.password === ""
    ) {
      setAlert({
        alert: true,
        message: "Please provide required credentials",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({ alert: false, message: "", type: "" });
      }, 2500);
      return false;
    } else {
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(form.firstName) || !nameRegex.test(form.lastName)) {
        setError({ ...error, name: "Name should contain letters only" });
        setTimeout(() => {
          setError({ ...error, name: "" });
        }, 3000);
        return false;
      }

      const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(form.email)) {
        setError({
          ...error,
          email: "E-mail should be in '@gmail.com' format",
        });
        setTimeout(() => {
          setError({ ...error, email: "" });
        }, 3000);
        return false;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

      if (!passwordRegex.test(form.password)) {
        setError({
          ...error,
          password:
            "Password should contain uppercase, lowercase, special character, and number",
        });
        setTimeout(() => {
          setError({ ...error, password: "" });
        }, 3000);
        return false;
      }
      return true;
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (checkValidation()) {
      try {
        const result = await createUser(form);
        setAlert({ alert: true, message: result.message, type: result.success?"success":"danger" });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
         result.success &&  setFormType("login");
        }, 2500);
      } catch (error) {
        // Display error from the response
        const message = error.response?.data?.message || "Something went wrong";
        setAlert({ alert: true, message: message, type: "danger" });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
        }, 2500);
      }
    }
  };

  const resetBtn = () => {
    setform({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const HandleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" }); // Reset error when user starts typing
  };
  return (
    <>
      <div className="login-main">
        <div className="heading1">
          <h1>SIGNUP</h1>
        </div>
        <div className="login-form">
          <form onSubmit={HandleSubmit}>
            <div className="name-back">
              <input
                name="firstName"
                value={form.firstName}
                onChange={HandleChange}
                type="text"
                className="name"
                placeholder="First name"
              />
              {error.name && <p className="error1">{error.name}</p>}
              <input
                name="lastName"
                value={form.lastName}
                onChange={HandleChange}
                type="text"
                className="name"
                placeholder="Last name"
              />
            </div>
            <div className="email-back">
              <input
                name="email"
                value={form.email}
                onChange={HandleChange}
                type="text"
                className="email"
                placeholder="example@gmail.com"
              />
              {error.email && <p className="error2">{error.email}</p>}
            </div>
            <div className="password-back">
              <input
                name="password"
                value={form.password}
                onChange={HandleChange}
                type={ShowPassword ? "text" : "password"}
                className="email"
                placeholder="Password"
              />
              {ShowPassword ? (
                <VisibilityIcon className="icon" onClick={togglePassword} />
              ) : (
                <VisibilityOffIcon className="icon" onClick={togglePassword} />
              )}
              {error.password && <p className="error3">{error.password}</p>}
            </div>
            <div className="form-redirect">
              <p>Already have an account? </p>
              <a
                onClick={() => {
                  setFormType("login");
                }}
                className="redirect-btn"
              >
                Login
              </a>
            </div>
            <div className="login-btn-back">
              <button className="login-btn">Submit</button>
              <button onClick={resetBtn} className="login-btn" id="login-reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
