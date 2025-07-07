import React from 'react'
import "./AddToCartLayout.css";
import AddToCard from './sections/addtocard/AddToCard';
import Navbar from '../../components/navbar/Navbar';
import Search from "../../components/search/Search";
import Sidebar from '../../components/sidebar/Sidebar';
import AlertBox from '../../components/alertBox/AlertBox';
import Alerts from '../../components/alert/Alerts';
import UserProfile from '../../components/dropDown/UserProfile';
const AddToCartLayout = () => {
  return (
    <>
    <AlertBox/>
    <Navbar/>
    <Alerts/>
    <UserProfile/>
    <Search/>
    <Sidebar/>
    
       <div className="addtocartlayout-main-back ">
      <div className="addtocartlayout-main ourteam-main">
        <div className="addtocartlayout ourteam">
          <div className="addtocartlayout-content-back">
            <AddToCard/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddToCartLayout
