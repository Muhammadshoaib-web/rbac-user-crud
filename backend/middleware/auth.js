import jwt from 'jsonwebtoken';
import user from '../models/user.js';

const auth = (roles = []) => {
  return async (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token) {
      return res.status(403).send('Access denied: No token provided');
    }

    // Remove 'Bearer ' if it exists
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id);
      if (!roles.length || roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).send('Insufficient permissions');
      }
    } catch (error) {
      res.status(401).send('Invalid token');
    }
  }
}

export default auth;