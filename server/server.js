import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB, sequelize } from './src/configs/db.config.js';
import * as authMiddleware from './src/middlewares/auth.middleware.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import authRoutes from './src/routes/auth.route.js';
import locationRoutes from './src/routes/location.route.js';
import submissionRoutes from './src/routes/submission.route.js';
import userRoutes from './src/routes/user.route.js';
import initSockets from './src/socket/index.js';
import { createAdapter } from '@socket.io/postgres-adapter';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['polling', 'websocket'],
  },
});

const startServer = async () => {
  try {
    await connectDB();

    app.use(
      cors({
        origin: process.env.CLIENT_URL || '*',
      })
    );

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/location', authMiddleware.checkAccessToken, locationRoutes);
    app.use(
      '/api/submission',
      authMiddleware.checkAccessToken,
      submissionRoutes
    );
    app.use('/api/user', authMiddleware.checkAccessToken, userRoutes);

    app.use(errorHandler);

    const pgAdapter = createAdapter({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    io.adapter(pgAdapter);

    initSockets(io);

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Example app listening on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
  }
};

startServer();
