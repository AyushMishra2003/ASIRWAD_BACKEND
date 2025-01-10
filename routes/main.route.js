import { Router } from "express";
import { addMainHome, deleteMainHome, getMainHome, updateMainHome } from "../controller/mainHome.controller.js";
import upload from "../middleware/multer.middleware.js";


const mainRoute=Router()


mainRoute.post("/",upload.single("photo"),addMainHome)
mainRoute.get("/",getMainHome)
mainRoute.put("/:id",upload.single("photo"),updateMainHome)
mainRoute.delete("/:id",deleteMainHome)


export default mainRoute