import React from "react";
import "./AdminProductCard.css";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const AdminProductCard = ({ product }) => {
  const Navigate = useNavigate();
  return (
    <>
      <div className="adminproductcard-main">
        <div className="adminproductcard-image-back">
          <img
            src={product.thumbnail}
            alt=""
            className="adminproductcard-image"
          />
        </div>
        <div className="adminproductcard-info-back">
          <div className="adminproductcard-info">
            <h5>{product.category}</h5>
            <div className="product-title-back">
              <h3>{product.title} </h3>
            </div>
            <div className="rating-reviews-back">
              <div className="rating-back">
                <label htmlFor="" className="rating">
                  {product.rating}
                </label>
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      className="rating-star"
                      style={{ fontSize: "16px" }}
                    />
                  ))}
              </div>
              <label htmlFor="" className="reviews">
                ({product.reviews.length} )
              </label>
            </div>
            <h1 className="adminproductcard-price">${product.price}</h1>
          </div>
          <button
            onClick={() => Navigate(`/admin/products/${product._id}`)}
            className="readmore-btn"
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
