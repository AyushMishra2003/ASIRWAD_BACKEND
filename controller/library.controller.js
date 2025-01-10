import Library from "../models/library.model.js"
import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs";


const addLibrary=async(req,res,next)=>{
    try{
           
        const {name,writerName}=req.body

        if(!name || !writerName){
            return next(new AppError("All fields are required",400))
        }

        const newLibrary=new Library({
            name,
            writerName,
            pdf:{
                public_id:"",
                secure_url:""
            }
        })

            if (req.file) {
              const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'coa',
                resource_type: 'auto',
              });
            
              if (result) {
                newLibrary.pdf.public_id = result.public_id;
                newLibrary.pdf.secure_url = result.secure_url; // Corrected: Assign secure_url to secure_url
              }
            
              // Corrected the syntax for fs.rm
              fs.rm(`uploads/${req.file.filename}`, { force: true }, (err) => {
                if (err) {
                  console.error("Error deleting the file:", err);
                }
              });
            }

            await newLibrary.save()

            res.status(200).json({
                success:true,
                message:"Library added successfully",
                data:newLibrary
            })


    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const getLibrary=async(req,res,next)=>{
    try{
        const allLibrary=await Library.find()

        if(!allLibrary){
            return next(new AppError("Library not Found",400))
        }

        res.status(200).json({
            success:true,
            message:"All Library are:-",
            data:allLibrary
        })
    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const updateLibrary=async(req,res,next)=>{
    try{
        const {id}=req.params
        const {name,writerName}=req.body

        const exitLibrary=await Library.findById(id)

        if(!exitLibrary){
            return next(new AppError("Library not Found",400))
        }

        if(name){
            exitLibrary.name=name
        }
       
        if(writerName){
            exitLibrary.writerName=writerName
        }

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: 'coa',
              resource_type: 'auto',
            });
          
            if (result) {
              exitLibrary.pdf.public_id = result.public_id;
              exitLibrary.pdf.secure_url = result.secure_url; // Corrected: Assign secure_url to secure_url
            }
          
            // Corrected the syntax for fs.rm
            fs.rm(`uploads/${req.file.filename}`, { force: true }, (err) => {
              if (err) {
                console.error("Error deleting the file:", err);
              }
            });
          }

        await exitLibrary.save()

        res.status(200).json({
            success:true,
            message:"Library updated successfully",
            data:exitLibrary
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const deleteLibrary=async(req,res,next)=>{
    try{
        const {id}=req.params

        const exitLibrary=await Library.findById(id)

        if(!exitLibrary){
            return next(new AppError("Library not Found",400))
        }

        await Library.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"Library deleted successfully"
        })
    }catch(error){
        return next(new AppError(error.message,500))
    }
}


export {addLibrary,getLibrary,updateLibrary,deleteLibrary}