import e from 'express';
import order from '../models/orderModel.js';


export const getAllOrders = async (req, res) => {
try { 
    const allOrder = await order.find();
    res.status(200).json({orders : allOrder});

}catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createOrder = async (req, res) => {
   // Assuming client ID is stored in req.client
    try {
    const clientID = req.client._id;
    const {  products, totalAmount, wilaya, address } = req.body;
    if (!products || !totalAmount || !wilaya || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    }catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderDetails = await order.findById(orderId).populate('products.product');
        
        if (!orderDetails) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}