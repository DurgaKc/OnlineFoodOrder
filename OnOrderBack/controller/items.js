const Items=require("../models/items")

//To get all food items
const getItems=async(req,res)=>{
    const items=await Items.find()
    return res.json(items)
}
//To get single food items
const getItem=async(req,res)=>{
  const {id} = req.params;
    const item=await Items.findById({_id:id})
    return res.json(item)
}
//To add food items
const addItem=async(req,res)=>{
   const {fname,category,price,ingredients}=req.body

   if(!fname || !category || !price){
    res.json({message:"Required fields can't be empty"})
   }
   const newItems=await Items.create({
    fname,category,price,ingredients,
    image: req.file ? req.file.filename : null,
   })
   return res.json(newItems)
}


// To edit food items
const editItem = async (req, res) => {
  try{
    const item = await Items.findById(req.params.id);
    if(!item) return res.status(404).json({message: "Items not found"});

    const updatedData = {
      fname: req.body.fname || item.fname,
      category: req.body.category || item.category,
      price: req.body.price || item.price,
      ingredients: req.body.ingredients || item.ingredients
    };
    if(req.file){
      updatedData.image = req.file.filename;
    }else{
      updatedData.image = item.image;
    }

    const updatedItem = await Items.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {new: true}
    );
    return res.status(200).json(updatedItem);
  }catch(error){
    return res.status(500).json({message:"server error",error: error.message})
  }
};
//To delete food items
const deleteItem=async(req,res)=>{
    try{
        const item = await Items.findByIdAndDelete(req.params.id);

        if(!item){
            return res.status(404).json({message:"Item not found"})
        }
        res.json({ message: "Item deleted successfully" });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error deleting item" });
    }
}

module.exports={getItems,getItem,addItem,editItem,deleteItem}