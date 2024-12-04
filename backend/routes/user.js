import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, getUsers, updateUser} from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"
const router = express.Router()

router.get("/checkauth", verifyToken,(req,res,next)=>{
    res.send("You are logged in.")
})
router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
    res.send("You are logged in and you can delete your account.")
})
router.get("/checkadmin/:id", verifyAdmin ,(req,res,next)=>{
    res.send("Hi admin you are logged in and you can delete all account.")
})
router.post("/new",createUser, verifyAdmin)
router.put("/:id", verifyUser, updateUser)
router.delete("/:id", verifyUser, deleteUser)
router.get("/find_user", getUsers)
router.get("/:id", verifyUser, getUser)
router.get("/", verifyAdmin, getAllUsers)

export default router