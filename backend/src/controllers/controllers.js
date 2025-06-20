const products = require("../data/products.js");
//defining first controller for home page
const homeController = async (req,res)=>{
    res.send("this is my home page from controllers");
}
const productsController = async (req,res) =>{
    try {
        res.status(200).json(products);
        //console.log("product fetch successfully...");
    } catch (error) {
        console.log("error fetching product ",error);
    }
}

module.exports ={homeController,productsController }
