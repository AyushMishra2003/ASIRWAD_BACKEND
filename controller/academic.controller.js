import AppError from "../utlis/error.utlis.js";
import cloudinary from "cloudinary";
import Academic from "../models/academic.model.js";
import fs from "fs";

const addAcademic = async (req, res, next) => {
  try {
    const { name, year } = req.body;

    // Validate required fields
    if (!name || !year) {
      return next(new AppError("All fields are required", 400));
    }

    // Initialize new academic entry
    const newAcademicEntry = new Academic({
      name,
      year,
      pdf: {
        public_id: "",
        secure_url: "",
      },
    });

    // Handle file upload if a file is provided
    // if (req.file) {
    //   try {
    //     // Ensure the file is uploaded as a raw resource
    //     const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
    //       folder: "lms",
    //       resource_type: "raw", // Ensure PDFs are uploaded as raw files
    //     });

    //     console.log("Cloudinary Upload Result:", uploadResult);

    //     // Update the academic entry with Cloudinary details
    //     if (uploadResult && uploadResult.secure_url) {
    //       newAcademicEntry.pdf.public_id = uploadResult.public_id;
    //       newAcademicEntry.pdf.secure_url = uploadResult.secure_url;

    //       // Remove the local file after successful upload
    //       fs.rmSync(req.file.path, { force: true });
    //     } else {
    //       throw new Error("Failed to upload the file to Cloudinary");
    //     }
    //   } catch (uploadError) {
    //     // Handle file upload errors
    //     console.error("Error uploading file to Cloudinary:", uploadError);
    //     return next(new AppError("File upload failed. Please try again.", 500));
    //   }
    // }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'coa',
        resource_type: 'auto',
      });
    
      if (result) {
        newAcademicEntry.pdf.public_id = result.public_id;
        newAcademicEntry.pdf.secure_url = result.secure_url; // Corrected: Assign secure_url to secure_url
      }
    
      // Corrected the syntax for fs.rm
      fs.rm(`uploads/${req.file.filename}`, { force: true }, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
        }
      });
    }
    

    // Save the academic entry to the database
    await newAcademicEntry.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Academic detail added successfully",
      data: newAcademicEntry,
    });
  } catch (error) {
    // Handle any other unexpected errors
    console.error("Error in addAcademic:", error);
    return next(new AppError(error.message || "An unexpected error occurred", 500));
  }
};


const getAcademic=async(req,res,next)=>{
  try{

    const allAcademic=await Academic.find({})

    if(!allAcademic){
        return next(new AppError("Academic not Found",400))
    }


    res.status(200).json({
        success:true,
        message:"All Academic are:-",
        data:allAcademic
    })

  }catch(error){
    return next(new AppError(error.message,500))
  }
}


const updateAcademic=async(req,res,next)=>{
  try{
  
    const {id}=req.params
    const {name,year}=req.body

    const exitAcademic=await Academic.findById(id)

    if(!exitAcademic){
      return next(new AppError("Academic not Found",400))
    }

    if(name){
      exitAcademic.name=name
    }
   
    if(year){
      exitAcademic.year=year
    }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'coa',
        resource_type: 'auto',
      });
    
      if (result) {
        exitAcademic.pdf.public_id = result.public_id;
        exitAcademic.pdf.secure_url = result.secure_url; // Corrected: Assign secure_url to secure_url
      }
    
      // Corrected the syntax for fs.rm
      fs.rm(`uploads/${req.file.filename}`, { force: true }, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
        }
      });
    }

    await exitAcademic.save()


    res.status(200).json({
      success:true,
      message:"Academic Updated Successfully",
      data:exitAcademic
    })





  }catch(error){
    return next(new AppError(error.message,500))
  }
}

const deleteAcademic=async(req,res,next)=>{
  try{
    const {id}=req.params

    const exitAcademic=await Academic.findById(id)

    if(!exitAcademic){
      return next(new AppError("Academic not Found",400))
    }

    await Academic.findByIdAndDelete(id)

    res.status(200).json({
      success:true,
      message:"Academic Deleted Successfully"
    })

  }catch(error){
    return next(new AppError(error.message,500))
  }
}



export { addAcademic, getAcademic ,updateAcademic,deleteAcademic};
