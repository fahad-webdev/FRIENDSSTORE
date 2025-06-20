import React, { useEffect , useState } from "react";
import CountUp from 'react-countup';
import "./AdminCard.css";
import SellIcon from '@mui/icons-material/Sell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

const AdminCard = () => {
  const {products,fetchProducts} =useProduct();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(()=>{
     fetchProducts();
  },[fetchProducts]);

   useEffect(()=>{
    const price = products.reduce((acc, curr) => acc + curr.price, 0);
    setTotalPrice(price);
  },[products]);

  const Navigate = useNavigate();
  return (
    <>
      <div className="admin-card">
        <div className="card-head-back">
          <SellIcon className="card-icon"/>
          <h3>Total Sales</h3>
        </div>
        <div className="card-values">
          <h1>
            {/*<AttachMoneyIcon className="dollar" />*/}
            <CountUp end={totalPrice} duration={3} prefix="$" separator="," />
          </h1>
        </div>
      </div>

      <div className="admin-card" onClick={()=>Navigate("/admin/products")}>
        <div className="card-head-back">
          <ProductionQuantityLimitsIcon />
          <h3>Total Products</h3>
        </div>
        <div className="card-values">
          <h1>
            <CountUp end={products.length} duration={3} />
          </h1>
        </div>
      </div>

      <div className="admin-card">
        <div className="card-head-back">
          <ShoppingBasketIcon />
          <h3>Total Orders</h3>
        </div>
        <div className="card-values">
          <h1>
           <CountUp end="90" duration={3} />
          </h1>
        </div>
      </div>
    </>
  );
};

export default AdminCard;
