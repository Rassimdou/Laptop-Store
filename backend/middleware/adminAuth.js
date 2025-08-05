import jwt from 'jsonwebtoken';


const adminAuth = (req , res , next) => {
    //get authorization token from headers
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied, no token provided' });
            console.log('Access denied');
        }
        const token = authHeader.split(' ')[1];

        // Verify JWT

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //check admin priveleges
        if (decode.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden, admin access required' });
        }


        //attach user request and proceed
        req.user = decode;
        next();
    }catch (error){
        //handle different error cases
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } 
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status
    } 



};