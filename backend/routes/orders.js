import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from "../controllers/orders.js"
const router = express.Router()

router.post("/", createOrder)
router.put("/:id", verifyAdmin, updateOrder)
router.delete("/:id", verifyAdmin, deleteOrder)
router.get("/:id", getOrder)
router.get("/", getAllOrders)

export default router