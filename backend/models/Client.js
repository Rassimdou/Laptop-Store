import mongoose from "mongoose";

export const ClientSchema = new mongoose.Schema({

  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role :     { type: String, enum: ['user', 'admin'], default: 'user' } 
  
});

export default mongoose.model('Client', ClientSchema);
