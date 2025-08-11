import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({

  name: { type: String, required: true },
  model: { type: String, required: true }, 
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  
});

export default mongoose.model('Product', ProductSchema);