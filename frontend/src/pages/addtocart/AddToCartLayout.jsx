import React from 'react'
import "./AddToCartLayout.css";
import AddToCard from './sections/addtocard/AddToCard';
import Navbar from '../../components/navbar/Navbar';
import Search from "../../components/search/Search";
import Sidebar from '../../components/sidebar/Sidebar';
const AddToCartLayout = () => {
  return (
    <>
    <Navbar/>
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
