import React, { useState, useEffect, useRef } from "react";
import "./ProductForm.css";
import { useParams , useNavigate} from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import DoneIcon from "@mui/icons-material/Done";
import { useApi } from "../../../context/ApiContext";
import { useProduct } from "../../../context/ProductContext";

const UpdateProduct = () => {
  const { updateProduct, getProductById } = useProduct();
  const {setAlert} = useApi();
  const { id } = useParams(); // <-- Get product ID from route
  const [thumbnail, setThumbnail] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    rating: 0.0,
    size: [],
    stock: "",
    tags: [],
    brand: "FRIENDSSTORE",
    sku: "",
    weight: "",
    status: "",
    thumbnail: "",
    images: [],
  });
  const Navigate = useNavigate();
  const ThumbnailInputRef = useRef();
  const imagersInputRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id); // Fetch product from API/local
      if (data) {
        setFormData({
          ...data,
          size: data.size || [],
          tags: data.tags || [],
          thumbnail: "",
          images: [],
        });
        if (data.thumbnail) setThumbnail(data.thumbnail);
        if (data.images) setImagesPreview(data.images);
      }
    };
    fetchProduct();
  }, [id]);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "size" || name === "tags") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      const file = files[0];
      if (file instanceof Blob) {
        setFormData((prev) => ({ ...prev, thumbnail: file }));
        setThumbnail(URL.createObjectURL(file));
      }
    } else if (name === "images") {
      const imageArray = Array.from(files).filter(
        (file) => file instanceof Blob
      );
      setFormData((prev) => ({ ...prev, images: imageArray }));
      setImagesPreview(imageArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("sku", formData.sku);
      data.append("brand", formData.brand);
      data.append("weight", parseFloat(formData.weight));
      data.append("status", formData.stock > 0 ? "In Stock" : "Out Of Stock");
      data.append("size", JSON.stringify(formData.size));
      data.append("tags", JSON.stringify(formData.tags));
      if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);
      formData.images.forEach((file) => data.append("images", file));

      console.log(data);
      const updated = await updateProduct(id, data);
     
        //alert("Product updated successfully!");
       setAlert({
        alert: true,
        message: updated.message ,
        type: updated.success?"success":"danger",
      });
       setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
          updated.success;
        }, 2500);

        // Set new server thumbnail and images
        if (updated.thumbnail) setThumbnail(updated.thumbnail);
        if (updated.images) setImagesPreview(updated.images);
        // Also update formData in case the user edits again
        setFormData((prev) => ({
          ...prev,
          thumbnail: "",
          images: [],
        }));
        Navigate(-1);
 
    } catch (error) {
       const message = error.response?.data?.message || "Something went wrong";
        setAlert({
          alert: true,
          message: message,
          type: "danger",
        });
        setTimeout(() => {
          setAlert({ alert: false, message: "", type: "" });
        }, 2500);
    }
  };

  return (
    <>
      <div className="dashboard-back">
        <div className="dashboard-main">
          <div className="admin-head-back">
            <h1 className="admin-heading">
              {" "}
              <InventoryIcon /> Update Product
            </h1>
          </div>
          <div className="productform-main">
            <form action="" onSubmit={handleSubmit}>
              <div className="productform-half1">
                <div className="productform-input-back">
                  <label htmlFor="">Title:</label>
                  <input
                    placeholder="name of product...."
                    onChange={HandleChange}
                    name="title"
                    value={formData.title}
                    type="text"
                    className="productform-input"
                  />
                </div>
                <div className="productform-input-back">
                  <label htmlFor="">Description:</label>
                  <textarea
                    onChange={HandleChange}
                    placeholder="about the product...."
                    name="description"
                    value={formData.description}
                    type="text"
                    className="productform-area"
                  />
                </div>
                <div className="productform-input-back">
                  <label htmlFor="">Category:</label>
                  <input
                    placeholder="e.g (women's shoes)"
                    onChange={HandleChange}
                    name="category"
                    value={formData.category}
                    type="text"
                    className="productform-input"
                  />
                </div>
                <div className="productform-input-back">
                  <label htmlFor="">Size:</label>
                  <input
                    placeholder="e.g (6,7,8,9,10)"
                    onChange={HandleChange}
                    name="size"
                    value={formData.size.join(", ")}
                    type="text"
                    className="productform-input"
                  />
                </div>
              </div>
              <div className="productform-half2">
                <div className="productform-input-back">
                  <label htmlFor="">Price:</label>
                  <input
                    placeholder="e.g (99.99)"
                    onChange={HandleChange}
                    name="price"
                    value={formData.price}
                    type="text"
                    className="productform-input"
                  />
                </div>
                <div className="productform-input-back">
                  <label htmlFor="">Stock:</label>
                  <input
                    placeholder="e.g (100)"
                    onChange={HandleChange}
                    name="stock"
                    value={formData.stock}
                    type="text"
                    className="productform-input"
                  />
                </div>
                <div className="productform-input-back">
                  <label htmlFor="">SKU:</label>
                  <input
                    placeholder="e.g (UH123867)"
                    onChange={HandleChange}
                    name="sku"
                    value={formData.sku}
                    type="text"
                    className="productform-input"
                  />
                </div>
                <div className="productform-input-back">
                  <label htmlFor="">Tags:</label>
                  <input
                    placeholder="e.g (heels,women shoes,high heels)"
                    onChange={HandleChange}
                    name="tags"
                    value={formData.tags.join(", ")}
                    type="text"
                    className="productform-input"
                  />
                </div>
                <div className="productform-input-back">
                  <label htmlFor="">Weight:</label>
                  <input
                    placeholder="e.g (1.7 in kg)"
                    onChange={HandleChange}
                    name="weight"
                    value={formData.weight}
                    type="text"
                    className="productform-input"
                  />
                </div>
              </div>
              <div className="productform-half3">
                <div className="file-upload-back">
                  <label htmlFor="">Thumbnail:</label>
                  <div
                    className="preview-image-back"
                    onClick={() => ThumbnailInputRef.current.click()}
                  >
                    {thumbnail ? (
                      <img src={thumbnail} alt="" className="preview-image" />
                    ) : (
                      <span className="plus-sign">+</span>
                    )}
                  </div>

                  <input
                    ref={ThumbnailInputRef}
                    onChange={handleFileChange}
                    name="thumbnail"
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="file-upload-back">
                  <label htmlFor="">Images:</label>

                  <div
                    className="preview-small-image-back"
                    onClick={() => imagersInputRef.current.click()}
                  >
                    {[...Array(5)].map((_, i) => (
                      <div key={i}>
                        {imagesPreview[i] ? (
                          <img
                            src={imagesPreview[i]}
                            alt=""
                            className="preview-small-image"
                          />
                        ) : (
                          <span className="plus-sign-small">+</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <input
                    ref={imagersInputRef}
                    onChange={handleFileChange}
                    name="images"
                    type="file"
                    multiple
                    style={{ display: "none" }}
                  />
                </div>
                <div className="addProduct-btn-back">
                  <button
                    type="submit"
                    className="inventory-add-btn productform-btn"
                  >
                    <DoneIcon sx={{ fontSize: "15px" }} /> UPDATE
                  </button>
                  <button
                   type="button"
                    className="inventory-add-btn productform-btn"
                    onClick={()=>Navigate("/admin/inventory")}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
