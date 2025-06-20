import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/search/Search";
import Contact from "../../components/contact/Contact.jsx";
import "./Layout.css";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useApi } from "../../context/ApiContext.jsx";

const Layout = () => {
  //hooks
  const {searchOpen, setSearchOpen} = useApi();

  const ScrollIntoView = (id) => {
    let sectionId = document.getElementById(id);
    if (sectionId) {
      sectionId.scrollIntoView({ behavior: "smooth" });
    }
  };
  const isActiveLink = (link, id) => {
    setActiveLink(link);
    ScrollIntoView(id);
  };
  //useEffect hook to scroll to the top of the page when the page reload
  const location = useLocation(); //useLocation hook to get the current pathname of route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Search setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
      <Navbar
      />
      <Sidebar
        
      />
      <Outlet isActiveLink={isActiveLink} />
      <Contact />
    </>
  );
};
export default Layout;
