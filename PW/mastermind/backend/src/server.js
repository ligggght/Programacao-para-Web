import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
app.use(
  cors(
    process.env.IS_DEV === 'false' && {
      origin: 'https://ine5646.marco.antonio.machado.arruda.vms.ufsc.br',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  ),
);
app.use(express.json());

// Rotas da API
app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/chat', chatRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB conectado!');
    app.listen(3001, () => console.log('Backend rodando em http://localhost:3001'));
  })
  .catch((err) => console.error(err));
