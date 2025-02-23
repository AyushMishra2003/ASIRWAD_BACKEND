import Gallery from "../models/galley.model.js"
import AppError from "../utlis/error.utlis.js"
import cloudinary from "cloudinary";
import fs from "fs/promises";
import nodemailer from 'nodemailer'; // Import Nodemailer
import sendEmail from "../utlis/sendEmail.js";



 const addGallery = async (req, res) => {
    try {
      const { name } = req.body;
      let photos = [];
  
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No photos uploaded" });
      }
  
      // Loop through all uploaded files
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "gallery", // Folder name in Cloudinary
        });
  
        if (result) {
          const newPhoto = new Gallery({
            name,
            photo: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          });
  
          await newPhoto.save(); // Save each photo as a new document
          photos.push(newPhoto);
  
          // Remove uploaded file from local storage
          await fs.rm(file.path);
        }
      }
  
      res.status(201).json({
        success:true,
        message:"Photo added Succesfully",
        data:photos
      })
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

const getGallery = async (req, res, next) => {
    try {

        const allGallery = await Gallery.find({})

        if (!allGallery) {
            return next(new AppError("Gallery not Found", 400))
        }

        res.status(200).json({
            success: true,
            message: "All Gallery",
            data: allGallery
        })

    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

const editGallery = async (req, res, next) => {
    try {

        const { name } = req.body

        const { id } = req.params



        const validGallery = await Gallery.findById(id)

        if (!validGallery) {
            return next(new AppError("Gallery Not Found", 400))
        }

        if (name) {
            validGallery.name = name
        }



        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lms",
            });

            if (result) {
                validGallery.photo.public_id = result.public_id;
                validGallery.photo.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        }

        await validGallery.save()

        res.status(200).json({
            success: true,
            message: "Gallery Added Succesfully",
            data: validGallery
        })



    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}


const deleteGallery = async (req, res, next) => {
    try {

        const { id } = req.params

        const validGallery = await Gallery.findById(id)

        if (!validGallery) {
            return next(new AppError("Gallery not Found"))
        }

        await Gallery.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Gallery Delete Succesfully"
        })

    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

const addInquiry = async (req, res, next) => {
    try {
        const { fullName, email, phoneNumber, message } = req.body;

        const sender='ranipadmawati1992@gmail.com'

        // Validate input fields
        if (!fullName || !email || !phoneNumber || !message) {
            return next(new AppError("All fields are required", 400));
        }

        if (phoneNumber.length !== 10) {
            return next(new AppError("Phone number must be 10 digits", 400));
        }

        // Email format
        const subject = "New Inquiry Received";

        const messageBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear Team,</p>
            <p>We have received a new inquiry from <strong>${fullName}</strong> . Below are the details:</p>
            
            <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                <tr>
                    <td style="padding: 10px; font-weight: bold; width: 30%;">Name:</td>
                    <td style="padding: 10px;">${fullName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Number:</td>
                    <td style="padding: 10px;">${phoneNumber}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Email:</td>
                    <td style="padding: 10px;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold;">Message:</td>
                    <td style="padding: 10px;">${message}</td>
                </tr>
            </table>
    
            <p>Thank you for your attention to this matter.</p>
            
            <p>Best Regards,<br />
            रानी पद्मावती तारा योगतंत्र आदर्श संस्कृत महाविद्यालय</p>
        </div>
    `;


        // Send email
        await sendEmail(sender, subject, messageBody);

        // Send response
        res.status(200).json({
            success: true,
            message: "Inquiry email sent successfully.",
        });

    } catch (error) {
        console.error("Error:", error);
        return next(new AppError("An error occurred while processing your inquiry", 500));
    }
};


export {
    addGallery,
    getGallery,
    deleteGallery,
    editGallery,
    addInquiry
}