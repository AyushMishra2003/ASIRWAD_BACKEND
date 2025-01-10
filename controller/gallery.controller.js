import Gallery from "../models/galley.model.js"
import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs/promises";


const addGallery=async(req,res,next)=>{
 try{

    const {name}=req.body

    if(!name){
        return next(new AppError("All field are Required",400))
    }

    const addGallery=new Gallery({
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
            
        if (result) {
             addGallery.photo.public_id = result.public_id;
             addGallery.photo.secure_url = result.secure_url;
        }
            
         fs.rm(`uploads/${req.file.filename}`);
    }

    await addGallery.save()

    res.status(200).json({
        success:true,
        message:"Gallery Added Succesfully",
        data:addGallery
    })



 }catch(error){
    return next(new AppError(error.message,500))
 }
}

const getGallery=async(req,res,next)=>{
    try{

        const allGallery=await Gallery.find({})

        if(!allGallery){
            return next(new AppError("Gallery not Found",400))
        }

         res.status(200).json({
            success:true,
            message:"All Gallery",
            data:allGallery
         })

    }catch(error){
        return next(new  AppError(error.message,500))
    }
}


const deleteGallery=async(req,res,next)=>{
    try{

        const {id}=req.params

        const validGallery=await Gallery.findById(id)

        if(!validGallery){
            return next(new AppError("Gallery not Found"))
        }

        await Gallery.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"Gallery Delete Succesfully"
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

export {
    addGallery,
    getGallery,
    deleteGallery
}