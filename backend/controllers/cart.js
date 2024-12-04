import Cart from "../modules/Cart.js"
import mongoose from 'mongoose';

export const createCart = async (req, res) => {
    try {
      const userId = req.body.userId
      const productId = req.body.productId; 
      let quantity = parseInt(req.body.quantity, 10) || 1;
  
      const cart = await Cart.findOne({ userId });
  
        if (!cart) {
            const newCart = await Cart.create({
                userId,
                items: [{ productId, quantity }],
            });
        return res.status(201).json(newCart);
        } 
        else {
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if (itemIndex === -1) {
                cart.items.push({ productId, quantity });
            } 
            else {
                cart.items[itemIndex].quantity += quantity;
            }
  
        cart.updatedAt = new Date();
        await cart.save();
            return res.status(200).json(cart);
        }
    } 
    catch (error) {
        res.status(500).json(error.message);
    }
};
export const updateCart  = async (req,res)=>{
    try{
        const updatedCart  = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedCart)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const deleteCart = async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted.")
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getCart = async (req,res)=>{
    const user = req.query.user
    try{
        const cart = await Cart.find({ userId: user });
        res.status(200).json(cart)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getAllCarts =  async (req,res,next)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }
    catch(error) {
        next(error)
    }
}
export const getCount =  async (req,res,next)=>{
    try{
        const carts = await Cart.findById(req.params.id).select("items").lean();
        const itemsCount = carts.items.length;
        res.status(200).json(itemsCount)
    }
    catch(error) {
        next(error)
    }
}
export const deleteCartItem = async (req, res) => {
    try {
        const cartId = req.query.cartId; 
        const productId = req.query.productId; 

        await Cart.updateOne(
            { _id: cartId },
            { $pull: { items: { productId: productId } } } 
        );

        res.status(200).json("Item has been deleted from the cart.");
    } catch (error) {
        res.status(500).json(error);
    }
};
export const deleteCartByUser = async (req,res)=>{
    const userId = req.query.userId
    try{
        await Cart.findOneAndDelete({userId:userId})
        res.status(200).json("Cart has been deleted.")
    }
    catch(error) {
        res.status(500).json(error)
    }
}