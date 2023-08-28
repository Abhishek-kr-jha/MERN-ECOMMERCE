
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxlength:[8, "Price cannot exceed 8 chars"]
    },
    rating:{
        type:Number,
        default:0
    },
    Images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
    ],
    category:{
        type:String,
        required:[true, "please eneter Product category"],
    },
    stocks:{
        type:Number,
        required:[false,"please enter product stocks"],
        maxlength:[4, "stocks cannot exceed 4 characters"]
    },
    numberOfRevies:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            Comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("products", productSchema)