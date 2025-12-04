const express=require("express")
const {registerUser,userLogin, changePassword } = require("../controller/user")
const authMiddleware = require("../middleware/auth")
const router=express.Router()

router.post("/register",registerUser)
router.post("/login",userLogin)
router.put("/changePassword", authMiddleware, changePassword);

module.exports=router