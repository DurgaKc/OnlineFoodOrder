const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    
    },
    category: {
      type: String,
      required: true,
      enum: ["Beverage", "Appetizer", "Dessert"], // dropdown options
    },
    price: {
      type: Number,
      required: true,
    },
    
    ingredients: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
