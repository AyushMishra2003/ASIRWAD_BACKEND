import { Router } from "express";
import { addNotice, deleteNotice, getNotice, updateNotice } from "../controller/notice.controller.js";
import upload from "../middleware/multer.middleware.js";


const noticeRouter=Router()


noticeRouter.post("/",upload.single("pdf"),addNotice)
noticeRouter.get("/",getNotice)
noticeRouter.put("/:id",upload.single("pdf"),updateNotice)
noticeRouter.delete("/:id",deleteNotice)

export default noticeRouter


