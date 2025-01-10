import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs/promises";
import MainHomeModel from "../models/mainHome.model.js";


const addMainHome=async(req,res,next)=>{
    try{
        
        const {name}=req.body

        if(!name){
            return next(new AppError("Name is required",400))
        }
          
        const newMainHome=new MainHomeModel({
            name,
            photo:{
                public_id:"",
                secure_url:""
            }
        })

          if (req.file) {
              const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lms",
              });
        
              console.log(result);
        
              if (result) {
                newMainHome.photo.public_id = result.public_id;
                newMainHome.photo.secure_url = result.secure_url;
              }
        
              fs.rm(`uploads/${req.file.filename}`);
        }

        await newMainHome.save()

        res.status(200).json({
            success:true,
            message:"MainHome added successfully",
            data:newMainHome
        })



    }catch(error){
        return next(new AppError())
    }
}


const getMainHome=async(req,res,next)=>{
    try{
        const allMainHome=await MainHomeModel.find()

        if(!allMainHome){
            return next(new AppError("MainHome not Found",400))
        }

        res.status(200).json({
            success:true,
            message:"All MainHome are:-",
            data:allMainHome
        })
    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const updateMainHome=async(req,res,next)=>{
    try{

        const {name}=req.body

        const {id}=req.params  

        const exitMainHome=await MainHomeModel.findById(id)

        if(!exitMainHome){
            return next(new AppError("MainHome not Found",400))
        }

        if(name){
            exitMainHome.name=name
        }

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: "lms",
            });
      
            if (result) {
              exitMainHome.photo.public_id = result.public_id;
              exitMainHome.photo.secure_url = result.secure_url;
            }
      
            fs.rm(`uploads/${req.file.filename}`);
        }

        await exitMainHome.save()

        res.status(200).json({
            success:true,
            message:"MainHome updated successfully",
            data:exitMainHome
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const deleteMainHome=async(req,res,next)=>{
    try{

        const {id}=req.params

        const exitMainHome=await MainHomeModel.find({})

        if(!exitMainHome){
            return next(new AppError("Main Home Not Found",400))
        }

        await MainHomeModel.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"Main Delete Succesfully"
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}


export {addMainHome,getMainHome,updateMainHome,deleteMainHome}