const { Food, Order } = require("../models/order");

// To get food items
const getFood=async(req,res)=>{
  const food = await Food.find()
  res.json(food);
}

//  Add Food 
const addFood =async (req, res) => {
  const { foodname, price } = req.body;
  const food = await Food.create({ foodname, price });
  res.json(food);
}


//To get all order items
const getOrders=async(req,res)=>{
    const orders=await Order.find()
    return res.json(orders)
}

//To get single order
const getOrder=async(req,res)=>{
  const order=await Order.findById(req.params.id)
  return res.json(order)
}

//To add order items
const addOrder=async(req,res)=>{
    const{custname,table,foodname,price ,quantity,status}=req.body

    if(!custname || !table ||!quantity ){
    res.json({message:"Required fields can't be empty"})
    }
    const newOrder = await Order.create({
      custname,
      table,
      foodname,
      price,
      quantity,
      status: status || "Pending",
    });
    return res.json(newOrder)
}

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports={getFood, addFood, getOrders,getOrder,addOrder, updateOrderStatus}