import User from "../modules/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const createUser = async (req,res)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            login:req.body.login,
            password:hash,
            email:req.body.email,
            phone:req.body.phone,
            city:req.body.city,
            street:req.body.street,
            house:req.body.house,
            apartment_number:req.body.apartment_number,
            isAdmin:req.body.isAdmin
        })
        await newUser.save()
        res.status(200).send("User has been created.")
    }
    catch(err){
        next(err)
    }
}
export const updateUser = async (req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const deleteUser = async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
export const getAllUsers =  async (req,res,next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(error) {
        next(error)
    }
}
export const getUsers = async (req,res)=>{
    try{
        const { ids } = req.query; 
        const idArray = ids.split(","); 
        const users = await User.find({ '_id': { $in: idArray } });
        res.status(200).json(users)
    }
    catch(error) {
        res.status(500).json(error)
    }
}
