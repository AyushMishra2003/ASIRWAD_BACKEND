import { Router } from "express";
import { addiqacGuidline, addIqacObjective, addiqacTeam, deleteiqacGuidline, deleteIqacObjective, deleteiqacTeam, getiqacGuidline, getIqacObjective, getiqacTeam, updateiqacGuidline, updateIqacObjective, updateiqacTeam } from "../controller/iqac.controller.js";
import upload from "../middleware/multer.middleware.js";
import { addNotice, deleteNotice, getNotice, updateNotice } from "../controller/iqacNotice.controller.js";


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


iqacRoute.post("/notice",upload.single("pdf"),addNotice)
iqacRoute.get("/notice",getNotice)
iqacRoute.put("/notice/:id",upload.single("pdf"),updateNotice)
iqacRoute.delete("/notice/:id",deleteNotice)

export default iqacRoute