import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import Client from '../models/Client.js';

dotenv.config();
const router = express.Router();


export  const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

 
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email already in use' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newClient = new Client({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'user' 
    });

    await newClient.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login existing client
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: client._id ,
        role: client.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    //  set the token as a cookie mli7a lel security
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 86400000 // 24 hours
   });

    res.status(200).json({
      message: 'Login successful',
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        role: client.role

      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

