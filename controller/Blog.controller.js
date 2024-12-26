
import AppError from "../utlis/error.utlis.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import BlogModel from "../models/Blog.model.js";

const addBlog = async (req, res, next) => {
  try {
    const {name,description} = req.body;

    if (!name || !description) {
      return next(new AppError("All fields are Required", 400));
    }

    const addBlog = new BlogModel({
      name,
      description,
      photo: {
        public_id: "",
        secure_url: "",
      },
    });

    if (!addBlog) {
      return next(new AppError("Blog not Added Successfully", 400));
    }

    console.log(req.file);
    

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });

      console.log(result);

      if (result) {
        addBlog.photo.public_id = result.public_id;
        addBlog.photo.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    }

    await addBlog.save();

    res.status(200).json({
      success: true,
      message: "Adding Blog Detail",
      data: addBlog,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

 const editBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      if (!name && !description && !req.file) {
        return next(new AppError("No fields provided for update", 400));
      }
  
      const blog = await BlogModel.findById(id);
  
      if (!blog) {
        return next(new AppError("Blog not found", 404));
      }
  
      if (name) blog.name = name;
      if (description) blog.description = description;
  
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });
  
          console.log(result);
          

        if (result) {
          // Delete the old blog photo from Cloudinary
          // if (blog.photo.public_id) {
          //   await cloudinary.v2.uploader.destroy(blog.blogPhoto.public_id);
          // }
  
          blog.photo.public_id = result.public_id;
          blog.photo.secure_url = result.secure_url;
        }
        fs.rm(`uploads/${req.file.filename}`);
      }
  
      await blog.save();
  
      res.status(200).json({
        success: true,
        message: "Blog details updated successfully",
        data: blog,
      });
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  };

  
  const deleteBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const blog = await BlogModel.findById(id);
  
      if (!blog) {
        return next(new AppError("Blog not found", 404));
      }

  
      await BlogModel.findByIdAndDelete(id);
  
      res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  };

  

  const getAllBlogs = async (req, res, next) => {
    try {
      const blogs = await BlogModel.find();
  
      res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: blogs,
      });
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  };
  


  export {
    addBlog,
    getAllBlogs,
    editBlog,
    deleteBlog
  }