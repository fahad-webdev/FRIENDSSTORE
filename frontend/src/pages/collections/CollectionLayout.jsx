import React from 'react'
import { useLocation } from 'react-router-dom';
import ProductsCollection from './sections/collectionCardLayout/ProductsCollection';
import StoreWall0 from "../../assets/store-wall0.jpg";
import StoreWall1 from "../../assets/home-background3.jpg";
import StoreWall2 from "../../assets/dress-collection-wall.jpg";
import StoreWall3 from "../../assets/store-wall8.jpg";
import StoreWall4 from "../../assets/home-background2.jpg";

const CollectionLayout = () => {
    const location =useLocation();
    const {heading , para} = location.state || [];
    return (
      <>
  <div className=" productlayout-main-back about-main-back" id="sales">
          <div className="collectionlayout-content-back about-content-back "
          style={{backgroundImage:heading==="SHOES COLLECTION"?`linear-gradient(to right,rgba(0, 0, 0, 0.964) 10%,rgba(3, 3, 3, 0.709) 80%,rgba(0, 0, 0, 0.964)), url(${StoreWall1})`:
          (heading==="HOODIES COLLECTION"?`linear-gradient(to right,rgba(0, 0, 0, 0.964) 10%,rgba(3, 3, 3, 0.709) 80%,rgba(0, 0, 0, 0.964)), url(${StoreWall0})`:
          (heading==="DRESSES COLLECTION"?`linear-gradient(to right,rgba(0, 0, 0, 0.964) 10%,rgba(3, 3, 3, 0.709) 80%,rgba(0, 0, 0, 0.964)), url(${StoreWall2})`:
          (heading==="NEW ARRIVALS"?`linear-gradient(to right,rgba(0, 0, 0, 0.94) 10%,rgba(3, 3, 3, 0.55) 80%,rgba(0, 0, 0, 0.964)), url(${StoreWall3})`:
            (heading==="FINALE SALES 50%"?`linear-gradient(to right,rgba(0, 0, 0, 0.94) 10%,rgba(3, 3, 3, 0.55) 80%,rgba(0, 0, 0, 0.964)), url(${StoreWall4})`:``)
          )
          )
          )}}>
            <div className=" productlayout-content about-content">
              <h1 id="main-heading">{heading}</h1>
              <p>
                {para}
              </p>
            </div>
          </div>
          <ProductsCollection/>
        </div>
      </>
    )
}

export default CollectionLayout
