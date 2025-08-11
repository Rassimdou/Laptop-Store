import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();  
        
        
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
    const { name, model, description, price, stock, imageUrl, available } = req.body;

    if (!name || !model || !description || !price || !stock || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Log the incoming data for debugging
        console.log('Incoming product data:', { name, model, description, price, stock, imageUrl, available });
        
        const newProduct = new Product({
            name,
            model,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            imageUrl,
            available: available !== undefined ? available : true
        });
        await newProduct.save();
        return res.status(201).json(newProduct);
        
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; 
    
    try {
        // Log the incoming data for debugging
        console.log('Updating product with ID:', id);
        console.log('Update data:', updates);
        
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
        console.error('Error updating product:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteProduct = async (req, res) => {  // Fixed function name
    const { id } = req.params;
    
    try {
        // Log the product ID for debugging
        console.log('Deleting product with ID:', id);
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.status(200).json({
            message: 'Product deleted successfully',
            deletedProduct  // Send deleted product for confirmation
        });
        
    } catch (error) {
        console.error('Error deleting product:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// Get latest products
export const getLatestProducts = async (req, res) => {
    try {
        const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(4);  // Get the 5 most recent products
        return res.status(200).json(latestProducts);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}