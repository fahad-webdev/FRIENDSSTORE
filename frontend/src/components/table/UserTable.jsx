import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/fs-logo.png";
import "./Table.css";
import { useGlobal } from "../../context/GlobalContext";
import { useUsers } from "../../hooks/useUsers";
const UserTable = ({ filteredUsers }) => {
  const { fetchUsers, deleteUser, loading } = useUsers();
  const {setAlert ,setAlertBox} = useGlobal();

  const handleDeleteProduct = async (id) => {
   
    setAlertBox({
      alert:true,
      head:"Delete This User",
      message:"Are you sure you want to delete this user?",
      onConfirm:async ()=>{
      const result = await deleteUser(id);
      await fetchUsers();
      //alert("User Deleted Successfully");
      setAlert({
          alert: true,
          type: "success",
          message: result.message,
        });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
          result.success;
        }, 2500);
      }
    })
  };

  const formatDate =(createdDate)=>{
   const date = new Date(createdDate);
   return date.toLocaleDateString("en-gb")
  }

  const Navigate = useNavigate();
  return (
    <>
      <table className="top-product-table user-table">
        <thead>
          <tr>
            <th className="profile-th1">Profile </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th className="email-th">E-mail</th>
            <th>Role</th>
            <th>Date Created</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6"></td>
            </tr>
          ) : filteredUsers.length > 0 ? (
            [...filteredUsers].map((user) => (
              <tr key={user._id} className="table-row">
                <td>
                  <div className="profile-pic-back">
                    <img src={user.profilePic} className="profile-pic" alt="" />
                  </div>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td className="td7">
                  <div className="options-btn-back">
                    <button
                      className="options-btn"
                      onClick={() => handleDeleteProduct(user._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                <p className="not-found-message">No Users Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading ? (
        <div className="loading">
          <span></span>
          <img src={Logo} alt="" className="loader-image" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserTable;
