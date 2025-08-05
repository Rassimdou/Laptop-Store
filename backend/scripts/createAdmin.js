// scripts/createAdmin.js
import bcrypt from 'bcrypt';
import Client from '../models/Client.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    // Updated connection with better logging
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail faster
    });
    
    console.log('✅ MongoDB Connected');

    const adminEmail = 'admin@example.com';
    console.log(`Checking for existing admin: ${adminEmail}`);
    
    const existingAdmin = await Client.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      await mongoose.disconnect();
      return;
    }

    const password = 'adminpassword123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Creating new admin...');
    await Client.create({
      name: 'Admin User',
      email: adminEmail,
      phone: '1234567890',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${password}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Fatal Error:', error);
    process.exit(1);
  }
};

createAdmin();