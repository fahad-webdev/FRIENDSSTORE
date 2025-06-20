import React from 'react'
import WomensProducts from './section/womensCardLayout/WomensProducts';
import { useLocation } from 'react-router-dom';

const Womens = () => {
  const location =useLocation();
  const {heading , para} = location.state || [];
  return (
    <>
<div className="productlayout-main-back about-main-back">
        <div className="womenslayout-content-back about-content-back" id="womens" >
          <div className="productlayout-content about-content">
            <h1>{heading}</h1>
            <p>
              {para}
            </p>
          </div>
        </div>
        <WomensProducts />
      </div>
    </>
  )
}

export default Womens
