import React,{useEffect, useState} from "react";
import "./Dashboard.css";
import AdminCard from "../../../components/adminCard/AdminCard";
import TopProducts from "../../../components/table/TopProducts";
import LineChart from "../../../components/graphs/lineChart.jsx";
import PieChartOrder from "../../../components/graphs/PieChartOrder.jsx"
import DashboardIcon from "@mui/icons-material/Dashboard";

const Dashboard = () => {
  const [toggleOption , setToggleOption] = useState("earning");
 
  return (
    <>
      <div className="dashboard-back">
        <div className="dashboard-main">
          <div className="admin-head-back">
            <h1 className="admin-heading"> <DashboardIcon/> Overview</h1>
          </div>
          <div className="admin-insights-back">
            <div className="admin-half1">
              {/* code for Card back */}
              <div className="admin-card-back">
                <AdminCard />
              </div>
              {/* code for  */}
              <div className="admin-graph-back">
                <div className="admin-graph-head-back">
                  <div className="admin-analytics-option">
                  <span className={toggleOption==="earning"?"active-option":"inactive-option"} onClick={()=>setToggleOption("earning")}>Earning Analytics</span>/
                  <span className={toggleOption==="products"?"active-option":"inactive-option"} onClick={()=>setToggleOption("products")}>Top Selling Products</span>
                  </div>
                  {toggleOption==="earning"?<label htmlFor="" className="earning-label"><span></span>Earning</label> :""}
                </div>
                {toggleOption==="earning"?<LineChart/>:(toggleOption==="products"?<div className="admin-product-table-back">
                  <TopProducts/>
                </div>:"")}

                
              </div>
            </div>
            <div className="admin-half2">
             <div className="pie-chart-back">
              <div className="pie-chart-head-back">
                <h3 className="pie-chart-head">Mode Of Orders</h3>
              </div>
              <PieChartOrder/>
             </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
