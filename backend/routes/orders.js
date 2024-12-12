import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import { createOrder, deleteOrder, getAllOrders, getOrder, updateQuantity,updateOrder,deleteOrderByUser,AddToOrder,deleteFromOrder } from "../controllers/orders.js"
const router = express.Router()

router.put("/addToOrder",  AddToOrder)
router.post("/", createOrder)
//router.put("/:id", verifyAdmin, updateOrder)
router.put("/updateQuantity/:id",updateQuantity)
router.get("/:id", getOrder)
router.get("/", getAllOrders)
router.delete("/deleteOrderByUser",verifyAdmin, deleteOrderByUser)
router.delete("/deleteFromOrder/:id",deleteFromOrder)
//router.delete("/:id", verifyAdmin, deleteOrder)

export default router