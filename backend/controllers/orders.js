import Product from "../modules/Product.js";
import Order from "../modules/Order.js";
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
export const AddToOrder = async (req,res)=>{
    const orderId = req.body.orderId
    const productId = req.body.productId; 
    let quantity = parseInt(req.body.quantity, 10) || 1;
    let sum;
    try{
        const product = await Product.findOne({ _id: productId });
        const order = await Order.findOne({ _id: orderId });
        const itemIndex = order.items.findIndex(item => item.productId.equals(productId));
        sum =  order.totalAmount + product.cost;
        if (itemIndex === -1) {
            order.items.push({ productId, quantity});
            order.totalAmount = sum;
        } 
        else {
            order.items[itemIndex].quantity += quantity;
            order.totalAmount = sum;
        }
        const savedOrder = await order.save();
        res.status(200).json(savedOrder)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const updateQuantity = async (req,res)=>{
    const orderItem = req.body.item;
    const quantity = req.body.quantity;
    try{
        const order = await Order.findById(req.params.id)
        const itemIndex = order.items.findIndex(item => item._id.equals(orderItem));
        if (itemIndex === -1) {
            res.status(404).json("Product was not found")
        } 
        else {
           order.items[itemIndex].quantity += quantity;
           order.totalAmount *= order.items[itemIndex].quantity;
        }
        const savedOrder = await order.save();
        res.status(200).json(savedOrder)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const deleteFromOrder = async (req,res)=>{
    const orderItem = req.body.item;
    const order = await Order.findById(req.params.id)
    const itemIndex = order.items.findIndex(item => item._id.equals(orderItem));
    const product = await Product.findById(order.items[itemIndex].productId)
    order.totalAmount -= product.cost * order.items[itemIndex].quantity;
    await order.save()
    try{
        await Order.updateOne(
            { _id: req.params.id },
            { $pull: { items: { _id: orderItem } } } 
        );
        res.status(200).json("Item has been deleted from the cart.");
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
    const user = req.query.user
    try{
        const order = await Order.findById({ userId: user })
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
export const deleteOrderByUser = async (req,res)=>{
    const userId = req.query.userId
    try{
        await Order.findOneAndDelete({userId:userId})
        res.status(200).json("Order has been deleted.")
    }
    catch(error) {
        res.status(500).json(error)
    }
}