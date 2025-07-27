import express from 'express';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import nativeUserRouter from './routes/native-user';
import { jwtAuth } from './middleware/authMiddleware';
import byoUserRouter from './routes/byo-s3';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (origin === process.env.ALLOWED_ORIGINS! || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('CORS error: Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/v1/nu', jwtAuth, nativeUserRouter);
app.use('/v1/byo', jwtAuth, byoUserRouter);

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
