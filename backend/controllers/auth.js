import User from "../modules/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"


export const register = async (req,res,next) =>{
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
            isAdmin:false
        })
        await newUser.save()
        res.status(200).send("User has been created.")
    }
    catch(err){
        next(err)
    }
}
export const login = async (req,res,next) =>{
    try{
        const user = await User.findOne({login:req.body.login})
        if(!user){
            return next(createError(404,"User was not found."))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect){
            return next(createError(400,"Wrong username or passwrod."))
        }
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)
        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails,isAdmin})
    }
    catch(err){
        next(err)
    }
}