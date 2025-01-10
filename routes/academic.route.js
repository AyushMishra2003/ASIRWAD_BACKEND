import { Router } from "express";
import { addAcademic, deleteAcademic, getAcademic, updateAcademic } from "../controller/academic.controller.js";
import upload from "../middleware/multer.middleware.js";

const academicRoute=Router()

academicRoute.post("/",upload.single("pdf"),addAcademic)
academicRoute.get("/",getAcademic)
academicRoute.put("/:id",upload.single("pdf"),updateAcademic)
academicRoute.delete("/:id",deleteAcademic)


export default academicRoute