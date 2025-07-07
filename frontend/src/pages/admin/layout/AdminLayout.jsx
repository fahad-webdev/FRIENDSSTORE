import React, { useState } from "react";
import "./AdminLayout.css";
import Navbar from "../header/Navbar";
import AdminSidebar from "../sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import Alerts from "../../../components/alert/Alerts";
import { useGlobal } from "../../../context/GlobalContext";
import Search from "../../../components/search/Search";
import AlertBox from "../../../components/alertBox/AlertBox";
const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const { searchOpen, setSearchOpen } = useGlobal();
  return (
    <>
      <Search setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
      <div className="adminlayout-back">
        <Alerts />
        <AlertBox/>
        <div className="adminlayout-main">
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="adminlayout">
            <AdminSidebar sidebar={sidebar} />
            <div className="admin-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
