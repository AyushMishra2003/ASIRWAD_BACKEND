import ProductModel from "../models/product.model.js"
import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs/promises";


const addProducts=async(req,res,next)=>{
    try{
         
        console.log("product add is 123");
        

        const {name,category,rate,discount,aboutProduct,keyFeature,productDetail}=req.body


        if(!name || !category || !rate || !discount || !aboutProduct || !keyFeature || !productDetail){
            return next(new AppError("All Field are Required",400))
        }

        const product=new ProductModel({
            name,
            category,
            rate,
            discount,
            aboutProduct,
            keyFeature,
            productDetail,
            photo:{
                public_id:"",
                secure_url:""
            }
        })

        if(!product){
            return next(new AppError("Product not Added",402))
        }

        console.log("product is ",product);
        

        console.log(req.file);
        

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: "lms",
            });
    
            console.log(result);
            
            if (result) {
              (product.photo.public_id = result.public_id),
                (product.photo.secure_url = result.secure_url);
            }
            fs.rm(`uploads/${req.file.filename}`);
        }

        await product.save()

        res.status(200).json({
            success:true,
            message:"Product Added Succesfully",
            data:product
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const getProducts=async(req,res,next)=>{
    try{

        const allProducts=await ProductModel.find({})

        if(!allProducts){
            return next(new AppError("Products not Found",400))
        }

        res.status(200).json({
            success:true,
            message:"All Products are:-",
            data:allProducts
        })


    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params; // Extract productId from URL parameters
      const { name, category, rate, discount, aboutProduct, keyFeature, productDetail } = req.body;
  
      // Prepare the updated data object
      const updatedData = {
        name,
        category,
        rate,
        discount,
        aboutProduct,
        keyFeature,
        productDetail,
      };
  
      // Handle the product image update if a new file is provided
      if (req.file) {
        // Upload the new image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });
  
        // Update the product image information
        updatedData.photo = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
  
        // Remove the temporary file after upload
        fs.rm(`uploads/${req.file.filename}`);
      }
  
      // Find and update the product by its ID
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: productId }, // The condition to find the product
        updatedData, // The fields to update
        { new: true, runValidators: true } // Options to return the updated product and run validation
      );
  
      if (!updatedProduct) {
        return next(new AppError("Product not found", 404));
      }
  
      // Send the response with the updated product
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
};

const specificProduct=async(req,res,next)=>{
    try{
        const {productId}=req.params

        const productValid=await ProductModel.findById(productId)

        if(!productValid){
            return next(new AppError("Product is not Valid",400))
        }

        res.status(200).json({
            success:true,
            message:"Product are:-",
            data:productValid
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const deleteProduct=async(req,res,next)=>{
    try{
        const {productId}=req.params
        
        const validProduct=await ProductModel.findById(productId)

        if(!validProduct){
            return next(new AppError("Product is not Valid",400))
        }

        await ProductModel.findByIdAndDelete(productId)

        res.status(200).json({
            success:true,
            message:"Product Delete Succesfully",
            data:validProduct
        })
 
    }catch(error){
        return next(new AppError(error.message,500))
    }
}
  



export  {
    addProducts,
    getProducts,
    updateProduct,
    specificProduct,
    deleteProduct
}