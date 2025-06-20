const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
    },
    items:[
        {
            productID:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity:{
                type:Number,
                default:1,
                min: [1, "Quantity must be at least 1"],
            }
        }
    ]
},
    {timestamps:true,}
);


module.exports = mongoose.model("Cart",cartSchema);