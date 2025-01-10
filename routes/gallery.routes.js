import { Router } from "express";
import { addGallery, deleteGallery, getGallery } from "../controller/gallery.controller.js";
import upload from "../middleware/multer.middleware.js";

const galleryRoute=Router()

galleryRoute.post("/",upload.single("photo"),addGallery)
galleryRoute.get("/",getGallery)
galleryRoute.delete("/:id",deleteGallery)


export default galleryRoute