import { Router } from "express";
import { addTeam, deleteTeam, getTeam, updateTeam } from "../controller/team.controller.js";
import upload from "../middleware/multer.middleware.js";




const teamRouter=Router()


teamRouter.post("/",upload.single("photo"),addTeam)
teamRouter.get("/",getTeam)
teamRouter.delete("/:id",deleteTeam)
teamRouter.put("/:id",upload.single("photo"),updateTeam)



export default teamRouter