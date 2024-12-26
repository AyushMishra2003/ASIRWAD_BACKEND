import { Router } from "express";
import { addProducts, deleteProduct, getProducts, specificProduct, updateProduct } from "../controller/product.controller.js";
import upload from "../middleware/multer.middleware.js";


const productRoute=Router()


productRoute.post("/",upload.single("photo"),addProducts)
productRoute.get("/",getProducts)
productRoute.put("/:productId",upload.single("photo"),updateProduct)
productRoute.get("/:productId",specificProduct)
productRoute.delete("/:productId",deleteProduct)

export default productRoute
