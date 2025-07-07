import React, { useEffect } from "react";
import profileImage from "../../assets/mine-image1.jpg";
import "./DropDown.css";
import useRippleEffect from "../../hooks/UseRippleEffect";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGlobal } from "../../context/GlobalContext";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from '@mui/icons-material/Person';

const UserProfile = () => {
  const { logout, fetchUserProfile, user } = useAuth();
  const { setAlert, useProfileDrop, setUserProfileDrop } = useGlobal();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleClick = useRippleEffect();
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    handleClick(e);
    setTimeout(() => {
      navigate();
    }, 200);
  };
  const handleLogout = (e) => {
    handleClick(e);

    setTimeout(async () => {
      const result = await logout();
      setUserProfileDrop(false);
      if (result) {
        setAlert({
          alert: true,
          message: result.message,
          type: "success",
        });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
        }, 2500);
      }
    }, 200);
  };

  return (
    <>
      <div
        className={`user-profile-back ${
          useProfileDrop ? "user-profile-back-active" : ""
        }`}
      >
        <div className="user-profile-image-back">
          <img src={user?.profilePic} alt="" className="user-profile-image" />
        </div>
        <div className="user-profile-main">
          <h1>{user?.firstName}</h1>
          <p htmlFor="">{user?.email}</p>
        </div>
        <div className="user-profile-btn-back">
          <button
            className="user-profile-btn "
            type="button"
            onClick={handleNavigate}
          >
            <PersonIcon className="icons" style={{fontSize:"18px"}}/>
             Profile
          </button>
          <button
            className="user-profile-btn"
            type="button"
            onClick={handleLogout}
          >
            <LogoutIcon className="icons" style={{fontSize:"18px"}} /> Logout 
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
