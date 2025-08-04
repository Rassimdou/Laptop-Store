import e from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";



export const getAllProducts = async (req, res) => {

    const allProducts = await Product.find();
    try {
        
    
    if (!allProducts || allProducts.length === 0) {
    console.log('No products found');
    return res.status(404).json({ message: 'No products found' });
     } 
     else{
    return res.status(200).json(allProducts);
        }

} catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getProductById = async (req, res) => {

    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    else {
        return res.status(200).json(product);
        }
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

export const addProduct = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !description || !price || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl
        });

        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }



}


export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const Updates = req.body; 
     


}