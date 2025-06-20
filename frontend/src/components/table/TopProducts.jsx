import React ,{useEffect} from "react";
import Image from "../../assets/dress-collection-thumbnail2.jpg";
import "./Table.css";
import { useProduct } from "../../context/ProductContext";
const TopProducts = () => {
   const {fetchProducts ,products} = useProduct();
    useEffect(()=>{
      fetchProducts();
    },[])
  return (
    <>
      <table className="top-product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Orders</th>
            <th>Stock</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product)=>(
              <tr key={product._id}>
            <td>
              <div className="td1">
                <div className="admin-product-image-back">
                  <img src={product.thumbnail} className="top-product-image" alt="" />
                </div>
                <p>
                {product.title}
                </p>
              </div>
            </td>
            <td>$ {product.price}</td>
            <td>50</td>
            <td>{product.stock}</td>
            <td className="td5">$ {product.price}</td>
          </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default TopProducts;
