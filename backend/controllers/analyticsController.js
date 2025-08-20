import Order from '../models/Order.js';
import client from '../models/Client.js';
import Product from '../models/Product.js';
import Client from '../models/Client.js';

export const TotalAmount = async (req, res) => {
    try {
        const totalAmount = await Order.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } }
        ]);

        res.status(200).json({ 
            totalAmount: totalAmount.length > 0 ? totalAmount[0].totalAmount : 0 
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total amount", error: error.message });
        console.log("Error fetching total amount:", error);
    }
};

export const TotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        res.status(200).json({ totalOrders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total orders", error: error.message });
        console.log("Error fetching total orders:", error);
    }
};

export const TotalUsers = async (req, res) => {
    try {
        const totalUsers = await Client.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total users", error: error.message });
        console.log("Error fetching total users:", error);
    }
};
