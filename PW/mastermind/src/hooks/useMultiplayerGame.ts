/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/game`;

interface GameState {
  gameId: string;
  status: 'waiting' | 'playing' | 'finished';
  currentTurn: 'player1' | 'player2';
  isMyTurn: boolean;
  playerNumber: 1 | 2;
  hasOpponent: boolean;
  rows: Array<{
    pegs: string[];
    feedback: string[];
    player: string;
  }>;
  winner: string | null;
  opponentSecretCode: string[] | null;
}

export function useMultiplayerGame() {
  const user = useUserStore((s) => s.user);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar nova partida
  const createGame = async (secretCode: string[]) => {
    if (!user) {
      setError('Usuário não está logado');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: user.userId,
          secretCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar partida');
      }

      return data.gameId;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Entrar em uma partida existente - REMOVIDO secretCode dos parâmetros
  const joinGame = async (gameId: string) => {
    if (!user) {
      setError('Usuário não está logado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId,
          playerId: user.userId,
          // REMOVIDO: secretCode
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao entrar na partida');
      }

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Obter estado da partida
  const fetchGameState = useCallback(
    async (gameId: string) => {
      if (!user) return;

      try {
        const res = await fetch(`${API_URL}/${gameId}?playerId=${user.userId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao obter estado da partida');
        }

        setGameState(data);
      } catch (err: any) {
        setError(err.message);
      }
    },
    [user],
  );

  // Submeter jogada
  const submitGuess = async (gameId: string, pegs: string[]) => {
    if (!user) {
      setError('Usuário não está logado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${gameId}/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: user.userId,
          pegs,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter jogada');
      }

      // Atualiza o estado após submeter
      await fetchGameState(gameId);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Submeter feedback
  const submitFeedback = async (gameId: string, feedback: string[]) => {
    if (!user) {
      setError('Usuário não está logado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${gameId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: user.userId,
          feedback,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter feedback');
      }

      // Atualiza o estado após submeter
      await fetchGameState(gameId);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    gameState,
    loading,
    error,
    createGame,
    joinGame,
    fetchGameState,
    submitGuess,
    submitFeedback,
  };
}
