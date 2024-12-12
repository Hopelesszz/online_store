import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import orderhRoute from "./routes/orders.js"
import productRoute from "./routes/products.js"
import userRoute from "./routes/user.js"
import cartRoute from "./routes/cart.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import stripeRoute from "./routes/stripe.js"
const app = express()

dotenv.config()

const connect = async ()=> {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("DB is connected!")
    } catch (error) {
        throw error
    }
}

app.get("/",(req,res)=>{
    res.send("Main page")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRoute)
app.use("/order", orderhRoute)
app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/cart", cartRoute)
app.use("/checkout", stripeRoute);


app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
    return res.status(errStatus).json({status:errStatus, message:errMessage, stack: err.stack})
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to backend!")
})