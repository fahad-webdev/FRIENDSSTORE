import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/search/Search";
import Contact from "../../components/contact/Contact.jsx";
import "./Layout.css";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useGlobal } from "../../context/GlobalContext.jsx";
import UserProfile from "../../components/dropDown/UserProfile.jsx";
import Alerts from "../../components/alert/Alerts.jsx"
const Layout = () => {
  //hooks
  const {searchOpen, setSearchOpen} = useGlobal();

  const ScrollIntoView = (id) => {
    let sectionId = document.getElementById(id);
    if (sectionId) {
      sectionId.scrollIntoView({ behavior: "smooth" });
    }
  };

  //useEffect hook to scroll to the top of the page when the page reload
  const location = useLocation(); //useLocation hook to get the current pathname of route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Search setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
      <Navbar/>
      <Alerts />
      <UserProfile/>
      <Sidebar/>
      <Outlet  />
      <Contact />
    </>
  );
};
export default Layout;
