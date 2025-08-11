import e from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate('clientId').populate('products.productId');
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const createOrder = async (req, res) => {
  try {
    // Verify client is attached to request
    if (!req.client || !req.client._id) {
      return res.status(401).json({ message: 'Client authentication missing' });
    }

    const clientId = req.client._id;
    const { products, totalAmount, wilaya, address, notes } = req.body;
    
    // Validation
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required' });
    }
    
    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({ message: 'Valid totalAmount is required' });
    }
    
    if (!wilaya || !address) {
      return res.status(400).json({ message: 'Wilaya and address are required' });
    }
    
    // Validate products and check stock
    for (const item of products) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ 
          message: `Product not found: ${item.productId}`
        });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
        });
      }
    }
    
    // Create order
    const order = await Order.create({
      clientId,
      products,
      totalAmount,
      wilaya,
      address,
      notes,
      status: 'pending'
    });
    
    // Update product stock quantities
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderDetails = await Order.findById(orderId).populate('products.product');
        
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
    const userOrders = await Order.find({ client: clientID }).populate('products.product'); 
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