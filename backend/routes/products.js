import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct,searchByCategory,searchByBrand,searchByName, searchByCategoryFeatured,searchCount,searchPrice, getOneProduct } from "../controllers/products.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router()

router.post("/", verifyAdmin, createProduct)
router.put("/:id", verifyAdmin, updateProduct)
router.delete("/:id", verifyAdmin, deleteProduct)
router.get("/find/", getProduct)
router.get("/", getAllProducts)
router.get("/get/:id", getOneProduct)

router.get("/searchByCategory", searchByCategory)
router.get("/searchByCategoryFeatured", searchByCategoryFeatured)
router.get("/searchCount", searchCount)
router.get("/searchByBrand", searchByBrand)
router.get("/searchByName", searchByName)
router.get("/searchByPrice", searchPrice)

export default router