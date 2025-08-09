import e from 'express';
import Order from '../models/Order.js';


export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
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

export const getUserOrders = async (req, res) => {
  try{
    const clientID = req.client._id;
    const userOrders = await order.find({ client: clientID }).populate('products.product'); 
    res.status(200).json({ orders: userOrders });
  


  }catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }



}



export const updateOrderStatus = async (req, res) => {
  try {
    const orderID =req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    const validStatuses = ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updatedOrder = await order.findByIdAndUpdate(
      orderID,
      { status },
      { new: true }
    );


    
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' });
    
  }



}