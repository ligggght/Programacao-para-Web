import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 60 } },
});

export default mongoose.model('ChatMessage', ChatMessageSchema);
