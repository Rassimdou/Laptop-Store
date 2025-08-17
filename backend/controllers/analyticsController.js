import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';



export const TotalAmount = async (req, res) => {
    try {
        const ToTalAmount = await Order.aggregate([

            {$match: { status: "completed" }},
            {$group: {
                _id: null,
                totalProductsSold: { $sum:"$totalAmount" },
            }}  

        ])
        res.status(200).json({ totalAmount: ToTalAmount});
    } catch (error) {
        res.status(500).json({ message: "Error fetching products sold", error: error.message });
        console.log("Error fetching products sold:", error);
    }


}


export const TotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.aggregate([

            
            {$group: {
                _id: null,
                totalOrders: { $sum },
            }}  

        ])
res.status(200).json({ totalOrders: totalOrders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total orders", error: error.message });
        console.log("Error fetching total orders:", error);
    }


}

export const TotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total users", error: error.message });
        console.log("Error fetching total users:", error);
    }
}