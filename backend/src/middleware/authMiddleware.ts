import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SUPABASE_JWT_SECRET;

// Extend Express Request interface using module augmentation
declare module 'express' {
  interface Request {
    user?: {
      user_id: string; // or replace with the actual type if you have a custom user type
    };
  }
}

if (!secret) {
  throw new Error('JWT secret not found.');
}

// Middleware for JWT authorization
export const jwtAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & { sub: string; exp: number };

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (decoded.exp < currentTime) {
      res.status(401).json({ message: 'Token has expired' });
      return;
    }

    // Pass the user_id (from the sub claim) to the request object
    req.user = {
      user_id: decoded.sub, // Extract user ID from 'sub' field
    };

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
