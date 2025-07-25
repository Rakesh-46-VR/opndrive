import express from 'express';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

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

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.message.startsWith('CORS error:')) {
    res.status(403).json({ message: err.message });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
