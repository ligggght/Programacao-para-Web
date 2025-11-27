import express from 'express';
import { 
  createGame, 
  joinGame, 
  submitGuess, 
  submitFeedback, 
  getGameState 
} from '../controllers/gameController.js';

const router = express.Router();

router.post('/create', createGame);
router.post('/join', joinGame);
router.get('/:gameId', getGameState);
router.post('/:gameId/guess', submitGuess);
router.post('/:gameId/feedback', submitFeedback);

export default router;