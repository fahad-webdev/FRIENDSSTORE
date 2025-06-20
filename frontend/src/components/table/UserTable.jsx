import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/fs-logo.png";
import "./Table.css";
import { useUser } from "../../context/UserContext";
const UserTable = ({ filteredUsers }) => {
  const { fetchUsers, users, deleteUser, loading } = useUser();
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await deleteUser(id);
      alert("User Deleted Successfully");
    }
    fetchUsers();
  };

  const Navigate = useNavigate();
  return (
    <>
      <table className="top-product-table user-table">
        <thead>
          <tr>
            <th className="profile-th1">Profile Pic</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6"></td>
            </tr>
          ) : filteredUsers.length > 0 ? (
            [...filteredUsers].reverse().map((user) => (
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
