import express from "express"
import { login, register } from "../controllers/auth.js"
const router = express.Router()


router.post("/reg", register)
router.post("/login", login)

export default router