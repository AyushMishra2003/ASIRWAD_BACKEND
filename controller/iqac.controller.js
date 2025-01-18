

import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs/promises";
import IQACModel from "../models/iqac.model.js";
import IqacGuidlineModel from "../models/iqac.guidline.model.js";
import IqacObjectiveModel from "../models/iqac.objective.model.js";


const addiqacTeam=async(req,res,next)=>{
    try{
         const {name,contactNumber,position}=req.body

         if(!name || !contactNumber || !position){
            return next(new AppError("All Field are Required",400))
         }

         const addiqacTeam=new IQACModel({
            name,
            contactNumber,
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
                    (addiqacTeam.photo.public_id = result.public_id),
                    (addiqacTeam.photo.secure_url = result.secure_url);
                 }
                     fs.rm(`uploads/${req.file.filename}`);
        }

        await addiqacTeam.save()

        res.status(200).json({
            success:true,
            message:"iqacTeam Member Added Successfully",
            data:addiqacTeam
        })

    }catch(error){
        return next(new AppError)
    }
}

const getiqacTeam=async(req,res,next)=>{
    try{

        const alliqacTeam=await IQACModel.find({})

        if(!alliqacTeam){
            return next(new AppError("No iqacTeam Member Found",404))
        }

        res.status(200).json({
            success:true,
            message:"All iqacTeam Member",
            data:alliqacTeam
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const updateiqacTeam=async(req,res,next)=>{
    try{
         const {name,contactNumber,position}=req.body

         const {id}=req.params

         const exitiqacTeam=await IQACModel.findById(id)

         if(!exitiqacTeam){
            return next(new AppError("iqacTeam Member Not Found",404))
         }


         if(name){
            exitiqacTeam.name=name
         }

         if(contactNumber){
            exitiqacTeam.contactNumber=contactNumber
         }

         if(position){
            exitiqacTeam.position=position
         }

 

        if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                       folder: "lms",
                });
                     
                if (result) {
                    (exitiqacTeam.photo.public_id = result.public_id),
                    (exitiqacTeam.photo.secure_url = result.secure_url);
                 }
                fs.rm(`uploads/${req.file.filename}`);
        }

        await exitiqacTeam.save()

        res.status(200).json({
            success:true,
            message:"iqacTeam Member Updated Successfully",
            data:exitiqacTeam
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const deleteiqacTeam=async(req,res,next)=>{
    try{

        const {id}=req.params

        const exitiqacTeam=await IQACModel.findById(id)

        if(!exitiqacTeam){
            return next(new AppError("No iqacTeam Member Found",404))
        }

        await IQACModel.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"iqacTeam Member Deleted Successfully"
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const addiqacGuidline=async(req,res,next)=>{
    try{

        const {guidline}=req.body

        if(!guidline){
            return next(new AppError("All field are Required",400))
        }

        const newGuidline=new IqacGuidlineModel({
            guidline
        })

        if(!newGuidline){
            return next(new AppError("Guidline not Added Succesfully",400))
        }

        await newGuidline.save()

        res.status(200).json({
            success:true,
            message:"New Guidline Added",
            data:newGuidline
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const getiqacGuidline=async(req,res,next)=>{
    try{

        const allGuidline=await IqacGuidlineModel.find({})

        if(!allGuidline){
            return next(new AppError("Iqac Guidline Not Found",400))
        }

        res.status(200).json({
            success:true,
            message:"All Iqac Guidline",
            data:allGuidline
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const updateiqacGuidline=async(req,res,next)=>{
    try{

        const {id}=req.params

        const {guidline}=req.body

        const validGuidline=await IqacGuidlineModel.findById(id)

        if(!validGuidline){
            return next(new AppError("Guidline not Found",404))
        }

        if(guidline){
            validGuidline.guidline=guidline
        }

        await validGuidline.save()

        res.status(200).json({
            success:true,
            message:"Guidline Updated Succesfully",
            data:validGuidline
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const deleteiqacGuidline=async(req,res,next)=>{
    try{
    
        const {id}=req.params
 
        const validGuidline=await IqacGuidlineModel.findById(id)

        if(!validGuidline){
            return next(new AppError("Guidline not Found",404))
        }
        

        await IqacGuidlineModel.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:"Guidline Delete Succesfully"
        })


    }catch(error){
        return next(new AppError(error.message,500))
    }
}


const addIqacObjective=async(req,res,next)=>{
    try{

        const {objective}=req.body

        if(!objective){
            return next(new AppError("Objective Not Found",400))
        }

        const newObjective=new IqacObjectiveModel({
            objective
        })

        if(!newObjective){
            return next(new AppError("Objective Not Found",400))
        }

        await newObjective.save()

        res.status(200).json({
            success:true,
            message:"Objective Added Succesfully",
            data:newObjective
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const getIqacObjective=async(req,res,next)=>{
    try{

        const allObjective=await IqacObjectiveModel.find({})

        if(!allObjective){
            return next(new AppError("Objective Not Found",400))
        }

        res.status(200).json({
            success:true,
            message:"All Objective are:-",
            data:allObjective
        })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}


// Update an IQAC Objective
const updateIqacObjective = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the ID from the request params
        const { objective } = req.body; // Get the updated objective from the request body

        if (!id || !objective) {
            return next(new AppError("ID or Objective Not Found", 400));
        }

        const updatedObjective = await IqacObjectiveModel.findByIdAndUpdate(
            id,
            { objective },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedObjective) {
            return next(new AppError("Objective Not Found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Objective Updated Successfully",
            data: updatedObjective,
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Delete an IQAC Objective
const deleteIqacObjective = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the ID from the request params

        if (!id) {
            return next(new AppError("ID Not Found", 400));
        }

        const deletedObjective = await IqacObjectiveModel.findByIdAndDelete(id);

        if (!deletedObjective) {
            return next(new AppError("Objective Not Found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Objective Deleted Successfully",
            data: deletedObjective,
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};



export {
    addiqacTeam,
    getiqacTeam,
    deleteiqacTeam,
    updateiqacTeam,
    addiqacGuidline,
    getiqacGuidline,
    updateiqacGuidline,
    deleteiqacGuidline,
    addIqacObjective,
    getIqacObjective,
    updateIqacObjective,
    deleteIqacObjective
}