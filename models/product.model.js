import { model, Schema } from "mongoose";


const productSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
    photo:{
          public_id:{
                type:String
          },
        secure_url:{
            type:String
        }    
    },
    rate:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    aboutProduct:{
        type:String,
        required:true
    },
    keyFeature:{
        type:String,
        required:true
    },
    productDetail:{
        type:String,
        required:true
    }
    },
    {
        timestamps:true
    }
)

const ProductModel=model("ProductSchema",productSchema)

export default ProductModel