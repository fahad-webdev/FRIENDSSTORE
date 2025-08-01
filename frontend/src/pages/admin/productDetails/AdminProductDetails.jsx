import React,{useState,useEffect} from "react";
import "../../productDetail/ProductDetails.css";
import "./AdminProductDetails.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import { useParams, useNavigate } from "react-router-dom";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import { useProduct } from "../../../context/ProductContext";

const AdminProductDetails = () => {
    const { getProductById, product, loading } = useProduct();
  const [selectedImage, setSelectedImage] = useState("");
  const [viewReview, setViewReview] = useState(false);
  const [isActive, setIsActive] = useState("reviews");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Product ID :: ", id);
  // Function to find product by ID
  const toggleViewReview = () => setViewReview(!viewReview);
  const ToggleOption = () =>
    setIsActive(isActive === "reviews" ? "details" : "reviews");

  useEffect(() => {
    if (getProductById(id)) {
      console.log("product found :: ", product);
    }
  }, [id]);
  useEffect(() => {
    if (product?.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  if (loading) return <div className="loading"></div>; // Loading state*/
  
  return (
    <>
      <div className="dashboard-back addproduct-back">
        <div className="dashboard-main addproduct-main">
          <div className="admin-head-back">
            <h1 className="admin-heading"> <DisplaySettingsIcon/> Product Details</h1>
          </div>
          <div className="adminproductdetail-main productdetails-main">
                     <div className="productdetails-half1 adminproductdetails-half1">
            {/* Main Product Image */}
            <div className="productdetails-image-back adminproductdetails-image-back">
              <img src={selectedImage} alt="" className="product-image" />
            </div>
            {/* Thumbnails */}
            <div className="productdetails-small-images adminproductdetails-small-images">
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  className={`images `}
                  src={img}
                  alt="Thumbnail"
                  onClick={() => setSelectedImage(img)} // Change main image on click
                />
              ))}
            </div>
          </div>
          <div className="productdetails-half2 adminproductdetails-half2 unselectable">
            <div className="close-btn-back">
              <span onClick={() => navigate(-1)}>
                <ArrowBackIcon
                  style={{ fontSize: "18px", color: "#696a6d" }}
                  sx={{ strokeWidth: 2 }}
                />
                <p>back to products</p>
              </span>
              <button className="review-btn" onClick={toggleViewReview}>
                View Reviews
              </button>
            </div>
            <div
              className="productdetails-info-back"
              style={{ display: viewReview ? "none" : "block" }}
            >
              <h5>{product.category}</h5>
              <div className="product-heading">
                <div className="heading-back">
                  <h2>{product.title} </h2>
                </div>
                <h2 id="price">price ${product.price}</h2>
              </div>
              <div className="rating">
                <div className="icon-back">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      style={{ fontSize: "12px", color: "#cfa749" }}
                    />
                  ))}
                </div>
                <label>
                  {product.rating} ({product?.reviews?.length} Reviews )
                </label>
              </div>
              <div className="size-back adminproductdetail-size-back">
                <div className="size">
                  <h4>SIZE</h4>
                  <div className="size-no">
                    {product?.size?.length > 0
                      ? product?.size?.map((size, index) => (
                          <span key={index} className="size-item">
                            {size}
                          </span>
                        ))
                      : "N/A"}
                  </div>
                </div>
              </div>
              <div className="reviews-back">
                <div className="review-heading">
                  <div className="option-heading-back">
                    <h3
                      className={
                        isActive === "reviews"
                          ? "detail-option-active"
                          : "detail-option"
                      }
                      onClick={ToggleOption}
                    >
                      DETAILS
                    </h3>
                    <h3
                      className={
                        isActive === "details"
                          ? "detail-option-active"
                          : "detail-option"
                      }
                      onClick={ToggleOption}
                    >
                      REVIEWS
                    </h3>
                  </div>
                  <h5>
                    instock <label>{product.stock}</label>
                  </h5>
                </div>
                <div className="reviews-scroll-back">
                  <div
                    className="details-scroll"
                    style={{
                      display: isActive === "details" ? "none" : "block",
                    }}
                  >
                    <h4>DESCRIPTION</h4>
                    <p>{product.description}</p>
                    <h4>WEIGHT</h4>
                    <p>{product.weight>0?product.weight:0} kg</p>
                  </div>
                  <div
                    className="reviews-scroll"
                    style={{
                      display: isActive === "reviews" ? "none" : "block",
                    }}
                  >
                    {product?.reviews?.map((review, index) => (
                      <div key={index} className="reviews">
                        <div className="review-head">
                          <h3>{review.reviewerName}</h3>
                          <div className="rating">
                            <StarIcon
                              style={{ fontSize: "14px", color: "#cfa749" }}
                            />
                            <label>{review.rating}</label>
                          </div>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductDetails;
