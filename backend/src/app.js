const express = require('express');
const authRoute = require("./routes/auth-routes.js");//import router from auth-route (users)
const adminRoute = require("./routes/admin-routes.js");
const productRoute = require("./routes/product-routes.js");
const uploadRoute = require("./routes/upload-route.js")
const cartRoute = require("./routes/cart-routes.js");
const userRoute = require("./routes/user-routes.js");
const wishlistRoute = require("./routes/wishlist-route.js");

const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb" ,extended:true}));//using extended keyword you can ensure that nested object can be created 
app.use(express.static("public"));//for images or videos

//for secure cookie (only read by the server) to be saved in the browser of users
app.use(cookieParser());
app.use(cors({
    origin:["http://192.168.1.109:5173"],
    credentials:true,
}))
app.use('/api/auth', authRoute);//route for users
app.use('/api',adminRoute);//for admin handling user
app.use('/api',userRoute);//for managing user profile
app.use('/api',productRoute);//for products
app.use("/api/cart",cartRoute);
app.use('/api/wishlist',wishlistRoute);//routes for wishlist
//app.use('/api/protected', authRoute);

app.use('/api', uploadRoute);//route to upload files (cloudinary setup)
app.use('/uploads', express.static('src/uploads'));//public url for uploaded images

module.exports = app