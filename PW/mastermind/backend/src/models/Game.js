import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  player1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  secretCodePlayer1: [{ type: String }],
  currentTurn: { type: String, enum: ['player1', 'player2'], default: 'player1' },
  rows: [{
    pegs: [{ type: String }],
    feedback: [{ type: String }],
    player: { type: String, enum: ['player1', 'player2'] }
  }],
  status: { type: String, enum: ['waiting', 'playing', 'finished'], default: 'waiting' },
  winner: { type: String, default: null }
}, {
  timestamps: true
});

export default mongoose.model('Game', GameSchema);