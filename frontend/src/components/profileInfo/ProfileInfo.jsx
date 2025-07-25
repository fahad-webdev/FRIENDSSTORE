import React, { useEffect } from "react";
import "./ProfileInfo.css";
import PersonIcon from "@mui/icons-material/Person";
import useRippleEffect from "../../hooks/UseRippleEffect";
import { useAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
  const { user, fetchUserProfile } = useAuth();
  const handleClick = useRippleEffect();
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const handleEditProfileInfo = (e) => {
    handleClick(e);
  };
  return (
    <>
      <div className="profile-info-back">
        <div className="profile-info-half1">
          <div className="profile-info-head-back">
            <PersonIcon />
            <h1>Profile</h1>
          </div>
          <div className="profile-info-image-back">
            <img className="profile-info-image" src={user?.profilePic} alt="" />
          </div>
        </div>
        <div className="profile-info-half2">
          <div className="profile-info-content-back">
            <div className="profile-info-input-back ">
              <div className="profile-info-input productform-input-back">
                <label htmlFor="">First Name:</label>
                <input
                  disabled
                  value={user?.firstName}
                  type="text"
                  className="input"
                />
              </div>
              <div className="profile-info-input productform-input-back">
                <label htmlFor="">Last Name:</label>
                <input
                  disabled
                  value={user?.lastName}
                  type="text"
                  className="input"
                />
              </div>
            </div>
            <div className="profile-info-input-back ">
              <div className="profile-info-input productform-input-back">
                <label htmlFor="">E-mail:</label>
                <input
                  disabled
                  value={user?.email}
                  type="text"
                  className="input"
                />
              </div>
              <div className="profile-info-input productform-input-back">
                <label htmlFor="">Phone:</label>
                <input
                  disabled
                  value={user?.phone || "N/A"}
                  type="text"
                  className="input"
                />
              </div>
            </div>

            <div className="profile-info-input productform-input-back">
              <label htmlFor="">Address:</label>
              <input
                disabled
                value={user?.address || "N/A"}
                type="text"
                className="input"
              />
            </div>
          </div>

          <div className="profile-info-btn-back">
            <button
              onClick={handleEditProfileInfo}
              type="button"
              className="profile-info-btn card-btn"
            >
              EDIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
