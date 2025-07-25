import express from 'express';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import adminRouter from './routes/user/user';
import { jwtAuth } from './middleware/authMiddleware';

const app = express();
dotenv.config();

// Configure CORS
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // prints undefined in local development
    console.log(origin);
    if (origin === process.env.ALLOWED_ORIGINS!) {
      // Allow requests with undefined origin (e.g., Postman or same-origin requests)
      callback(null, true);
    } else {
      // Deny all other origins
      callback(new Error('CORS error: Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions)); // Use CORS with options
app.use(cookieParser());
app.use(express.json());

app.use('/admin', jwtAuth, adminRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.message.startsWith('CORS error:')) {
    res.status(403).json({ message: err.message });
  } else {
    next(err); // Pass other errors to the default error handler
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
