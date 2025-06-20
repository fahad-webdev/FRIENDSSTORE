import React from 'react'
import "./Navbar.css";
const Navbar = ({setSidebar,sidebar}) => {
    const toggleSidebar = () => {
        setSidebar(!sidebar);
      };
  return (
    <>
      <nav className="adminnav-back">
      <div id="menu-icon" className="menu-back" onClick={toggleSidebar}>
            <div className="menu" >
              <span className={sidebar?"span1":""} ></span>
              <span className={sidebar?"span2":""} ></span>
              <span className={sidebar?"span3":""} ></span>
            </div>
          </div>
            <h1>ADMIN</h1>
      </nav>
    </>
  )
}

export default Navbar
