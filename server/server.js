import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './src/configs/db.config.js';
import * as authDiddleware from './src/middlewares/auth.middleware.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import authRoutes from './src/routes/auth.route.js';
import locationRoutes from './src/routes/location.route.js';
import userRoutes from './src/routes/user.route.js';
import submissionRoutes from './src/routes/submission.route.js';

const app = express();

connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/location', authDiddleware.checkAccessToken, locationRoutes);
app.use('/api/submission', authDiddleware.checkAccessToken, submissionRoutes);
app.use('/api/user', authDiddleware.checkAccessToken, userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
