import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { supabase } from '@/utils/supabase-client';

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
export const jwtAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const environment = process.env.NODE_ENV;

  if (environment === 'development') {
    // skip jwt auth in development server
    next();
  } else {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    try {
      const { data: authState, error } = await supabase.auth.getClaims(token);

      if (error) {
        throw new Error(error.message);
      }

      if (!authState) {
        throw new Error('Auth state not found');
      }

      req.user = {
        user_id: authState.claims.sub,
      };

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error);
      res
        .status(401)
        .json({ message: error instanceof Error ? error.message : 'Token is not valid' });
    }
  }
};
