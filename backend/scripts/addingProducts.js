// Sample laptop products data for MongoDB
const laptopProducts = [
  {
    name: "Dell XPS 13 Plus",
    model: "XPS 13-9320",
    brand: "Dell",
    category: "Ultrabook",
    description: "Ultra-portable laptop with 13.4-inch InfinityEdge display, 12th Gen Intel Core i7, 16GB RAM, 512GB SSD. Perfect for professionals and students.",
    price: 1299,
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "MacBook Pro 14-inch",
    model: "MKGR3LL/A",
    brand: "Apple",
    category: "Professional",
    description: "Apple MacBook Pro with M2 Pro chip, 14-inch Liquid Retina XDR display, 16GB unified memory, 512GB SSD. Ideal for creative professionals.",
    price: 1999,
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "HP Spectre x360 14",
    model: "14-ef0013dx",
    brand: "HP",
    category: "2-in-1",
    description: "2-in-1 convertible laptop with 13.5-inch OLED touch display, Intel Core i7-1255U, 16GB RAM, 1TB SSD. Perfect for versatility and style.",
    price: 1149,
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    model: "20XW0026US",
    brand: "Lenovo",
    category: "Business",
    description: "Business ultrabook with 14-inch display, Intel Core i7-1165G7, 16GB RAM, 512GB SSD. Built for business professionals who need reliability.",
    price: 1599,
    stock: 6,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "ASUS ROG Zephyrus G14",
    model: "GA402RJ-L8003W",
    brand: "ASUS",
    category: "Gaming",
    description: "Gaming laptop with AMD Ryzen 9 6900HS, RTX 3060, 16GB RAM, 1TB SSD, 14-inch QHD display. Perfect for gaming and content creation.",
    price: 1449,
    stock: 9,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "Microsoft Surface Laptop 5",
    model: "RBI-00024",
    brand: "Microsoft",
    category: "Ultrabook",
    description: "Premium laptop with 13.5-inch PixelSense touchscreen, Intel Core i5-1235U, 8GB RAM, 256GB SSD. Great for productivity and portability.",
    price: 999,
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1587614295999-6c1c3f7e1e4e?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "Acer Predator Helios 300",
    model: "PH315-55-764C",
    brand: "Acer",
    category: "Gaming",
    description: "High-performance gaming laptop with Intel Core i7-12700H, RTX 4060, 16GB RAM, 512GB SSD, 15.6-inch 144Hz display.",
    price: 1199,
    stock: 7,
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "Dell Inspiron 15 3000",
    model: "I3511-3145BLK-PUS",
    brand: "Dell",
    category: "Budget",
    description: "Budget-friendly laptop with 15.6-inch display, Intel Core i3-1115G4, 8GB RAM, 256GB SSD. Perfect for everyday computing tasks.",
    price: 449,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "MacBook Air M2",
    model: "MLXY3LL/A",
    brand: "Apple",
    category: "Ultrabook",
    description: "Ultra-thin laptop with Apple M2 chip, 13.6-inch Liquid Retina display, 8GB unified memory, 256GB SSD. Perfect balance of performance and portability.",
    price: 1099,
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "Lenovo Legion 5 Pro",
    model: "82JD00BDUS",
    brand: "Lenovo",
    category: "Gaming",
    description: "Gaming laptop with AMD Ryzen 7 6800H, RTX 3070 Ti, 16GB RAM, 512GB SSD, 16-inch WQXGA 165Hz display. Built for serious gamers.",
    price: 1699,
    stock: 5,
    imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "HP Envy x360 15",
    model: "15-ey0013dx",
    brand: "HP",
    category: "2-in-1",
    description: "2-in-1 convertible with AMD Ryzen 7 5700U, 15.6-inch Full HD touchscreen, 12GB RAM, 256GB SSD. Versatile for work and entertainment.",
    price: 799,
    stock: 14,
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "ASUS ZenBook 14",
    model: "UX425EA-EH71",
    brand: "ASUS",
    category: "Ultrabook",
    description: "Ultrabook with Intel Core i7-1165G7, 14-inch Full HD display, 16GB RAM, 512GB SSD. Compact design with premium build quality.",
    price: 849,
    stock: 11,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "Razer Blade 15",
    model: "RZ09-0421NEH3-R3U1",
    brand: "Razer",
    category: "Gaming",
    description: "Premium gaming laptop with Intel Core i7-12800H, RTX 4070, 16GB RAM, 1TB SSD, 15.6-inch QHD 240Hz display. Ultimate gaming experience.",
    price: 2299,
    stock: 3,
    imageUrl: "https://images.unsplash.com/photo-1616569165959-a0647bde5e32?w=500&h=400&fit=crop",
    available: true
  },
  {
    name: "Samsung Galaxy Book3 Pro",
    model: "NP960XFG-KC1US",
    brand: "Samsung",
    category: "Professional",
    description: "Lightweight laptop with Intel Core i7-1360P, 16-inch AMOLED display, 16GB RAM, 512GB SSD. Stunning display with excellent performance.",
    price: 1399,
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=400&fit=crop",
    available: true
  },
  
];


import mongoose from 'mongoose';
import Product from '../models/Product.js'; // Adjust path to your Product model
import { connectDB } from '../config/db.js'; // Adjust path to your DB config
import dotenv from 'dotenv';
const seedProducts = async () => {
dotenv.config();
  try {
    await connectDB();
    
   
    
    // Insert sample products
    const insertedProducts = await Product.insertMany(laptopProducts);
    console.log(`${insertedProducts.length} products inserted successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

// Run with: node seed.js


export default laptopProducts;