import { Router } from "express";
import { addGallery, deleteGallery, editGallery, getGallery } from "../controller/gallery.controller.js";
import upload from "../middleware/multer.middleware.js";

const galleryRoute=Router()

galleryRoute.post("/",upload.single("photo"),addGallery)
galleryRoute.get("/",getGallery)
galleryRoute.put("/:id",upload.single("photo"),editGallery)
galleryRoute.delete("/:id",deleteGallery)



export default galleryRoute