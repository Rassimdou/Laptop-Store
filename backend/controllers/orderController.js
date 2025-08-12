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


};

export const getAnalyticsData = async (req, res) => {
  try {
    // Get all orders with populated product and client data
    const orders = await Order.find().populate('clientId').populate('products.productId');
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Get total number of orders
    const totalOrders = orders.length;
    
    // Get unique customers (based on clientId)
    const uniqueCustomers = new Set(orders.map(order => order.clientId._id.toString()));
    const totalCustomers = uniqueCustomers.size;
    
    // Get recent orders (last 3)
    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
      .map(order => ({
        id: order._id,
        customer: order.clientId.name,
        amount: order.totalAmount,
        status: order.status,
        date: order.createdAt.toISOString().split('T')[0]
      }));
    
    // Calculate top products based on quantity sold
    const productSales = {};
    
    orders.forEach(order => {
      order.products.forEach(item => {
        const productId = item.productId._id.toString();
        if (!productSales[productId]) {
          productSales[productId] = {
            name: item.productId.name,
            sales: 0
          };
        }
        productSales[productId].sales += item.quantity;
      });
    });
    
    // Convert to array and sort by sales
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 3);
    
    // Generate sales data for the last 6 months
    const salesData = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      
      const monthRevenue = orders
        .filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === date.getMonth() &&
                 orderDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, order) => sum + order.totalAmount, 0);
      
      salesData.push({
        month: `${month} ${year}`,
        revenue: monthRevenue
      });
    }
    
    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      recentOrders,
      topProducts,
      salesData
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};