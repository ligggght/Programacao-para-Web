import express from 'express';
import ChatMessage from '../models/ChatMessage.js';

const router = express.Router();

// Pegar todas as mensagens
router.get('/', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enviar uma mensagem
router.post('/', async (req, res) => {
  try {
    const { username, message } = req.body;
    if (!username || !message) return res.status(400).json({ error: 'Dados incompletos' });

    const chatMessage = await ChatMessage.create({ username, message });
    res.status(201).json(chatMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
