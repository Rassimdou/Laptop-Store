import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();  
        
        if (!allProducts || allProducts.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        } 
        
        return res.status(200).json(allProducts);
        
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
        
        return res.status(200).json(product);
        
    } catch (error) {
        // Handle invalid ID format
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const addProduct = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !description || !price || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newProduct = new Product({ name, description, price, imageUrl });
        await newProduct.save();
        return res.status(201).json(newProduct);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; 
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            updates, 
            { new: true, runValidators: true }  // Return updated doc and validate updates
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.status(200).json(updatedProduct);  // Added response
        
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteProduct = async (req, res) => {  // Fixed function name
    const { id } = req.params;
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.status(200).json({ 
            message: 'Product deleted successfully',
            deletedProduct  // Send deleted product for confirmation
        });
        
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}