const express = require('express');
const authRoute = require("./routes/auth-route.js");//import router from auth-route (users)
const productRoute = require("./routes/product-routes.js");
const uploadRoute = require("./routes/upload-route.js")
const cartRoute = require("./routes/cart-routes.js");

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
app.use('/api', uploadRoute);//route to upload files (cloudinary setup)
app.use('/api/auth', authRoute);//route for users
app.use('/api',authRoute);
app.use('/api',productRoute);//for products
app.use('/api/protected', authRoute);
app.use("/api/cart",cartRoute);


app.use('/uploads', express.static('src/uploads'));//public url for uploaded images

module.exports = app