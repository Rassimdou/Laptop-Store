import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';

export const protect = async (req, res, next) => {
  try {
    // 1. Get token from cookies or Authorization header
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Check if user exists
    const currentUser = await Client.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // 4. Grant access
    req.user = currentUser;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Authentication failed' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Admin privileges required' });
};