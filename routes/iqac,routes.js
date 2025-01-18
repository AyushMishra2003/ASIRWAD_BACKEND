import { Router } from "express";
import { addiqacGuidline, addIqacObjective, addiqacTeam, deleteiqacGuidline, deleteIqacObjective, deleteiqacTeam, getiqacGuidline, getIqacObjective, getiqacTeam, updateiqacGuidline, updateIqacObjective, updateiqacTeam } from "../controller/iqac.controller.js";
import upload from "../middleware/multer.middleware.js";


const iqacRoute=Router()

iqacRoute.post("/",upload.single("photo"),addiqacTeam)
iqacRoute.get("/",getiqacTeam)
iqacRoute.post("/guidline",addiqacGuidline)
iqacRoute.get("/guidline",getiqacGuidline)
iqacRoute.get("/objective",getIqacObjective)
iqacRoute.post("/objective",addIqacObjective)
iqacRoute.put("/:id",upload.single("photo"),updateiqacTeam)
iqacRoute.put("/guidline/:id",updateiqacGuidline)
iqacRoute.put("/objective/:id",updateIqacObjective)
iqacRoute.delete("/:id",deleteiqacTeam)
iqacRoute.delete("/guidline/:id",deleteiqacGuidline)
iqacRoute.delete("/objective/:id",deleteIqacObjective)

export default iqacRoute