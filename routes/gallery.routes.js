import { Router } from "express";
import { addGallery, addInquiry, deleteGallery, editGallery, getGallery } from "../controller/gallery.controller.js";
import upload from "../middleware/multer.middleware.js";

const galleryRoute=Router()

galleryRoute.post("/", upload.array("photos", 10), addGallery); // Upload up to 10 images/PDFs
galleryRoute.post("/inquiry",addInquiry)
galleryRoute.get("/",getGallery)
galleryRoute.put("/:id",upload.array("photos"),editGallery)
galleryRoute.delete("/:id",deleteGallery)



export default galleryRoute