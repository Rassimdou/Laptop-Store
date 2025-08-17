import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //  Get client from token
    const client = await Client.findById(decoded.id);
    
    if (!client) {
      return res.status(401).json({ message: 'Not authorized, client not found' });
    }
    
    //  Attach client to request
    req.client = client;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.status(401).json({ message: 'Not authorized' });
  }
};
export default protect;
export const admin = (req, res, next) => {
  if (req.client && req.client.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Admin privileges required' });
};