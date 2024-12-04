import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import { createCart, deleteCart, getAllCarts, getCart, updateCart,getCount,deleteCartItem,deleteCartByUser } from "../controllers/cart.js"

const cart = express.Router()

cart.post("/",createCart)
cart.put("/:id", verifyAdmin, updateCart)
//cart.delete("/:id", verifyAdmin, deleteCart)
cart.get("/", getCart)
cart.get("/all", verifyAdmin, getAllCarts)
cart.delete("/remove", deleteCartItem)
cart.delete("/deleteCartByUser",verifyAdmin, deleteCartByUser)
cart.delete("/:id",deleteCart)
cart.get("/find/:id", getCount)
export default cart;