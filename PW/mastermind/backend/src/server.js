import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/user', userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB conectado!');
    app.listen(3001, () => console.log('Backend rodando em http://localhost:3001'));
  })
  .catch((err) => console.error(err));
