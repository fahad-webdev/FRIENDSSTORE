require('dotenv').config({path:"./.env"});
const connectDB = require("./DB/connectDB.js");
const app = require("./app.js");

connectDB().then(
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running on PORT ${process.env.PORT}`);
    })
).catch(
    (error)=>{
     console.log("error running server",error);
    }
);
