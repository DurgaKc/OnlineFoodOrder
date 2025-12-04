const express=require("express")
const { getFood, addFood, getOrders, getOrder, addOrder, updateOrderStatus } = require("../controller/order")
const router=express.Router()


router.get("/",getFood)
router.post("/addFood",addFood)

router.get("/getOrders",getOrders)
router.get("/:id",getOrder)
router.post("/addOrder",addOrder)
router.put("/:id/status", updateOrderStatus)

module.exports=router