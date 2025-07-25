import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '@supabase/supabase-js';

dotenv.config();

const secret = process.env.SUPABASE_JWT_SECRET;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
      };
    }
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
    const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      res.status(401).json({ message: 'Token has expired' });
      return;
    }

    req.user = {
      user_id: decoded.sub,
    };

    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
