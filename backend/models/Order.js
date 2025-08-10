import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],

  totalAmount:   { type: Number, required: true },
  status:        {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'],
    default: 'pending'
  },

  wilaya:        { type: String, required: true },
  address:       { type: String, required: true },
  notes:         { type: String, default: '' }, // Optional notes field
  createdAt:     { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
