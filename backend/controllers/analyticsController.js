import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';



export const ProductsSold = async (req, res) => {
    try {
        const ProdSold = await Order.aggregate([

            {$match: { status: "completed" }},
            {$group: {
                _id: null,
                totalProductsSold: { $sum:"$totalAmount" },
            }}  

        ])

    } catch (error) {
        res.status(500).json({ message: "Error fetching products sold", error: error.message });
        console.log("Error fetching products sold:", error);
    }


}

export const 