const mongoose = require("mongoose");


 const foodSchema = new mongoose.Schema({
  foodname: String,
  price: Number,
 });
 
 const orderSchema = new mongoose.Schema(
    {
     custname:{
        type: String,
      required: true,
     },
     table:{
        type: String,
      required: true,
     },
    foodname: {
        type:String,
      required: true,
    },
    quantity:{
      type: Number,
      required: true,
    },
    price:{
        type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Completed"], // dropdown options
    },
   },
    { timestamps: true });

// ✅ Export separately
const Food = mongoose.model("Food", foodSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Food, Order };  