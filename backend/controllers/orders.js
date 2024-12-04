import Order from "../modules/Order.js"
import { createError } from "../utils/error.js"

export const createOrder = async (req,res)=>{
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const updateOrder  = async (req,res)=>{
    try{
        const updatedOrder  = await Order.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedOrder)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const deleteOrder = async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted.")
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getOrder = async (req,res)=>{
    try{
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getAllOrders =  async (req,res,next)=>{
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    }
    catch(error) {
        next(error)
    }
}