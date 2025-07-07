import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";
const Login = ({ setFormType, setAlert }) => {
  const {verifyUser,loginUser} = useAuth();
  const [ShowPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const togglePassword = () => {
    setShowPassword(!ShowPassword);
  };
  const navigate = useNavigate();
  /*
  ^	Start of the string
  [A-Za-z]	Match any letter (A-Z or a-z)
  +	Must have at least one letter (repeats if more letters are entered)
  $	End of the string
  */
  const checkValidation = () => {
    if (form.email === "" || form.password === "") {
      //<div className="alert"><h3></h3></div>
      setAlert({
        alert: true,
        message: "Please enter required credentials.",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({ alert: false, message: "", type: "" });
      }, 2500);
    } else {
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
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&=])[A-Za-z\d@$!%*?&=]{8,}$/;
      if (!passwordRegex.test(form.password)) {
        setError({
          ...error,
          password:
            "Password should contain uppercase,lowercase,special character and number",
        });
        setTimeout(() => {
          setError({ ...error, password: "" });
        }, 3000);
        return false;
      }
      //setError("");
      return true;
    }
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (checkValidation()) {
      try {
        const result = await loginUser(form);
        setAlert({
          alert: true,
          message: result.message,
          type: result.success ? "success" : "danger",
        });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
        }, 2500);
        if (result.success) {
          await verifyUser();
          const role = result?.role;
          role === "admin"
            ? navigate("/admin")
            : role === "user"
            ? navigate("/")
            : navigate("/form");
        }
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
      email: "",
      password: "",
    });
  };
  const HandleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div id="login-main" className="login-main">
        <div className="heading1">
          <h1>LOGIN</h1>
        </div>
        <div id="login-form" className="login-form">
          <form onSubmit={HandleSubmit}>
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
              <p>Don't have an account? </p>
              <a
                onClick={() => {
                  setFormType("signup");
                }}
                className="redirect-btn"
              >
                Signup
              </a>
            </div>
            <div className="login-btn-back">
              <button className="login-btn" type="submit">
                Submit
              </button>
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

export default Login;
