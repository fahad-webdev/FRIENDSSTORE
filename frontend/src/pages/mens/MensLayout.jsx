import React from 'react'
import MensProducts from './section/mensCardLayout/MensProducts';
import { useLocation } from 'react-router-dom';

const Mens = () => {
  const location =useLocation();
  const {heading , para} = location.state || [];
  return (
    <>
<div className=" productlayout-main-back about-main-back" id="mens">
        <div className="menslayout-content-back about-content-back ">
          <div className=" productlayout-content about-content">
            <h1 id="main-heading">{heading}</h1>
            <p>
              {para}
            </p>
          </div>
        </div>
        <MensProducts />
      </div>
    </>
  )
}

export default Mens
