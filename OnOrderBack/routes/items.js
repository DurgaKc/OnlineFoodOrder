const express=require("express")
const upload = require("../middleware/upload")
const { getItems,getItem,addItem,editItem,deleteItem } = require("../controller/items")
const router=express.Router()

router.get("/",getItems)            //get all items
router.get("/:id",getItem)          //get  item by id
router.post("/addItem",upload.single("image"), addItem)     //add item
router.put("/updateItem/:id",upload.single("image"), editItem)         //edit item
router.delete("/deleteItem/:id",deleteItem)    //delete item

module.exports=router