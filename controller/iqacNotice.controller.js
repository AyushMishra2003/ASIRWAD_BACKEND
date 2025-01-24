import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs";
import iqacNoticeModel from "../models/iqac.notice.model.js";


const addNotice=async(req,res,next)=>{
    try{

        const {heading,date}=req.body
        console.log("add notice is",req.body);
        

        if(!heading || !date){
            return next(new AppError("All fields are Required",400))
        }

        console.log(heading,date);
        

        const newNotice=new iqacNoticeModel({
            heading,
            date,
            pdf:{
                public_id:"",
                secure_url:""
            }
        })

        if(!newNotice){
            return next(new AppError("Notice not Added",402))
        }

        if (req.file) {
              const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'coa',
                resource_type: 'auto',
              });
            
              if (result) {
                newNotice.pdf.public_id = result.public_id;
                newNotice.pdf.secure_url = result.secure_url; // Corrected: Assign secure_url to secure_url
              }
            
              // Corrected the syntax for fs.rm
              fs.rm(`uploads/${req.file.filename}`, { force: true }, (err) => {
                if (err) {
                  console.error("Error deleting the file:", err);
                }
              });
        }

        await newNotice.save()


        res.status(200).json({
            success:true,
            message:"Adding Notice Detail",
            data:newNotice
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const getNotice=async(req,res,next)=>{
    try{

        const allNotice=await iqacNoticeModel.find()

        if(!allNotice){
            return next(new AppError("Notice not Found",400))
        }

        res.status(200).json({
            success:true,
            message:"All Notice are:-",
            data:allNotice
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const updateNotice=async(req,res,next)=>{
    try{

        const {heading,date}=req.body

        const {id}=req.params
         

        const exitNotice=await iqacNoticeModel.findById(id)

        if(!exitNotice){
            return next(new AppError("Notice not Found",400))
        }

        if(heading){
            exitNotice.heading=heading
        }

        if(date){
            exitNotice.date=date
        }

  
        if (req.file) {
              const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'coa',
                resource_type: 'auto',
              });
            
              if (result) {
                exitNotice.pdf.public_id = result.public_id;
                exitNotice.pdf.secure_url = result.secure_url; // Corrected: Assign secure_url to secure_url
              }
            
              // Corrected the syntax for fs.rm
              fs.rm(`uploads/${req.file.filename}`, { force: true }, (err) => {
                if (err) {
                  console.error("Error deleting the file:", err);
                }
              });
        }

        await exitNotice.save()


        res.status(200).json({
            success:true,
            message:"Notice Update Succesfulyly",
            data:updateNotice
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const deleteNotice=async(req,res,next)=>{
    try{
     const {id}=req.params

     const validNotice=await iqacNoticeModel.findById(id)
      
     if(!validNotice){
         return next(new AppError("Notice not Found",400))
     }

     console.log(validNotice);
     


     await iqacNoticeModel.findByIdAndDelete(id)

     res.status(200).json({
            success:true,
            message:"Notice Deleted Successfully"
     })


    }catch(error){
        return next(new AppError(error.message,500))
    }
}



export {
    addNotice,
    getNotice,
    updateNotice,
    deleteNotice
}