import { allowedNodeEnvironmentFlags, exit } from "process";
import TeamModel from "../models/team.model.js"
import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs/promises";


const addTeam=async(req,res,next)=>{
    try{
         const {name,destination,position}=req.body

         if(!name || !destination || !position){
            return next(new AppError("All Field are Required",400))
         }

         const addTeam=new TeamModel({
            name,
            destination,
            position,
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
                    (addTeam.photo.public_id = result.public_id),
                    (addTeam.photo.secure_url = result.secure_url);
                 }
                     fs.rm(`uploads/${req.file.filename}`);
        }

        await addTeam.save()

        res.status(200).json({
            success:true,
            message:"Team Member Added Successfully",
            data:addTeam
        })

    }catch(error){
        return next(new AppError)
    }
}

const getTeam=async(req,res,next)=>{
    try{

        const allTeam=await TeamModel.find({})

        if(!allTeam){
            return next(new AppError("No Team Member Found",404))
        }

        res.status(200).json({
            success:true,
            message:"All Team Member",
            data:allTeam
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const updateTeam=async(req,res,next)=>{
    try{
         const {name,destination,position}=req.body

         const {id}=req.params

         const exitTeam=await TeamModel.findById(id)

         if(!exitTeam){
            return next(new AppError("Team Member Not Found",404))
         }


         if(name){
            exitTeam.name=name
         }

         if(destination){
            exitTeam.destination=destination
         }

         if(position){
            exitTeam.position=position
         }

 

        if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                       folder: "lms",
                });
                     
                if (result) {
                    (exitTeam.photo.public_id = result.public_id),
                    (exitTeam.photo.secure_url = result.secure_url);
                 }
                fs.rm(`uploads/${req.file.filename}`);
        }

        await exitTeam.save()

        res.status(200).json({
            success:true,
            message:"Team Member Updated Successfully",
            data:exitTeam
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const deleteTeam=async(req,res,next)=>{
    try{

        const {id}=req.params

        const exitTeam=await TeamModel.findById(id)

        if(!exitTeam){
            return next(new AppError("No Team Member Found",404))
        }

        await TeamModel.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"Team Member Deleted Successfully"
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}



export {
    addTeam,
    getTeam,
    deleteTeam,
    updateTeam
}