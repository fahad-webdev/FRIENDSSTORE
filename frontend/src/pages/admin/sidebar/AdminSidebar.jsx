import React, { useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import "./AdminSidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from '@mui/icons-material/People';
import { useGlobal } from "../../../context/GlobalContext";
import { useAuth } from "../../../context/AuthContext";

const AdminSidebar = ({ sidebar}) => {
  const {logout } = useAuth();
  const {setAlert} = useGlobal();

  const Navigate = useNavigate();
  const handleLogout =async ()=>{
    const result = await logout();
    if(result){
      setAlert({
        alert: true,
        message: result.message,
        type: "success",
      });
      setTimeout(() => {
        setAlert({ alert: false, message: "", type: "" });
        Navigate("/form");
      }, 2500);
    }
  }
  return (
    <>
      <div
        className={sidebar ? "adminsidebar-back-active" : "adminsidebar-back"}
      >
        <ul className="adminsider-ul">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? "side-active-link" : "side-link-active"
              }
            >
              {({ isActive }) => (
                <>
                  <DashboardIcon
                    className="icons"
                    sx={{ color: isActive ? "black" : "white" }}
                  />
                  <label
                    htmlFor="product"
                    style={{ visibility: sidebar ? "visible" : "hidden" }}
                    className="dash-label"
                  >
                    Dashboard
                  </label>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              end //for accurate match the path
              className={({ isActive }) =>
                isActive ? "side-active-link" : "side-link-active"
              }
            >
              {({ isActive }) => (
                <>
                  <ProductionQuantityLimitsIcon
                    className={"icons"}
                    sx={{ color: isActive ? "black" : "white" }}
                  />
                  <label
                    htmlFor="product"
                    style={{ visibility: sidebar ? "visible" : "hidden" }}
                    className="dash-label"
                  >
                    Products
                  </label>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/inventory"
              end
              className={({ isActive }) =>
                isActive ? "side-active-link" : "side-link-active"
              }
            >
              {({ isActive }) => (
                <>
                  <InventoryIcon
                    className={"icons"}
                    sx={{ color: isActive ? "black" : "white" }}
                  />{" "}
                  <label
                    htmlFor="product"
                    style={{ visibility: sidebar ? "visible" : "hidden" }}
                    className="dash-label"
                  >
                    Inventory
                  </label>
                </>
              )}
            </NavLink>
          </li>
             <li>
            <NavLink
              to="/admin/user"
              end
              className={({ isActive }) =>
                isActive ? "side-active-link" : "side-link-active"
              }
            >
              {({ isActive }) => (
                <>
                  <PeopleIcon
                    className={"icons"}
                    sx={{ color: isActive ? "black" : "white" }}
                  />
                  <label
                    htmlFor="product"
                    style={{ visibility: sidebar ? "visible" : "hidden" }}
                    className="dash-label"
                  >
                    Users
                  </label>
                </>
              )}
            </NavLink>
          </li>
        </ul>
        <div className="logout-back"
        onClick={handleLogout}
        >
          <li className={sidebar ? "side-link-active" : "side-link"}>
            <LogoutIcon className="icons" /> Logout
          </li>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
