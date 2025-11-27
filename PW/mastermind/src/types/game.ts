export type GameState = {
  id: string;
  player1: string;
  player2: string | null;
  secretCodePlayer1: string[];
  secretCodePlayer2: string[];
  currentTurn: 'player1' | 'player2';
  rows: Array<{
    pegs: string[];
    feedback: string[];
    player: 'player1' | 'player2';
  }>;
  status: 'waiting' | 'playing' | 'finished';
  winner: string | null;
  createdAt: number;
};

// Armazena partidas ativas na memória (em produção, use banco de dados)
export const games = new Map<string, GameState>();