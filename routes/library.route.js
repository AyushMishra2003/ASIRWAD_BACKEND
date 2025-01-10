import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import { addLibrary, deleteLibrary, getLibrary, updateLibrary } from "../controller/library.controller.js";

const libraryRoute=Router()

libraryRoute.post("/",upload.single("pdf"),addLibrary)
libraryRoute.get("/",getLibrary)
libraryRoute.put("/:id",upload.single("pdf"),updateLibrary)
libraryRoute.delete("/:id",deleteLibrary)

export default libraryRoute