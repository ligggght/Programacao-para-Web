'use client';

import { useState, useEffect } from 'react';
import { useMultiplayerGame } from '@/hooks/useMultiplayerGame';
import SetupGame from './SetupGame';
import Board from './Board';
import ChatRoom from '../chat/ChatRoom';
import type { PegColor, FeedbackType, RowType } from '@/types/global';

type GamePhase = 'menu' | 'creating' | 'joining' | 'lobby' | 'playing' | 'finished';

export default function MultiplayerGame() {
  const {
    gameState,
    loading,
    error,
    createGame,
    joinGame,
    fetchGameState,
    submitGuess,
    submitFeedback,
  } = useMultiplayerGame();

  const [phase, setPhase] = useState<GamePhase>('menu');
  const [gameId, setGameId] = useState('');
  const [inputGameId, setInputGameId] = useState('');
  const [secretCode, setSecretCode] = useState<PegColor[]>([
    'default',
    'default',
    'default',
    'default',
  ]);
  const [guessingRow, setGuessingRow] = useState<RowType>({
    pegs: ['default', 'default', 'default', 'default'],
    feedback: ['empty', 'empty', 'empty', 'empty'],
  });
  const [editingFeedback, setEditingFeedback] = useState<FeedbackType[]>([
    'empty',
    'empty',
    'empty',
    'empty',
  ]);

  useEffect(() => {
    if (!gameId || phase === 'menu' || phase === 'creating' || phase === 'joining') return;

    const interval = setInterval(() => {
      fetchGameState(gameId);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameId, phase, fetchGameState]);

  useEffect(() => {
    if (!gameState) return;

    if (gameState.status === 'waiting') {
      setPhase('lobby');
    } else if (gameState.status === 'playing') {
      setPhase('playing');
    } else if (gameState.status === 'finished') {
      setPhase('finished');
    }
  }, [gameState]);

  const handleCreateGame = async () => {
    if (secretCode.some((c) => c === 'default')) {
      alert('Configure o código secreto completo!');
      return;
    }

    const newGameId = await createGame(secretCode.map((c) => c.toString()));
    if (newGameId) {
      setGameId(newGameId);
      setPhase('lobby');
    }
  };

  const handleJoinGame = async () => {
    if (!inputGameId) {
      alert('Digite o ID da partida!');
      return;
    }

    const success = await joinGame(inputGameId);
    if (success) {
      setGameId(inputGameId);
      await fetchGameState(inputGameId);
    }
  };

  const handleSubmitGuess = async () => {
    if (guessingRow.pegs.some((p) => p === 'default')) {
      alert('Complete sua jogada!');
      return;
    }

    const success = await submitGuess(
      gameId,
      guessingRow.pegs.map((p) => p.toString()),
    );
    if (success) {
      setGuessingRow({
        pegs: ['default', 'default', 'default', 'default'],
        feedback: ['empty', 'empty', 'empty', 'empty'],
      });
    }
  };

  const handleSubmitFeedback = async () => {
    if (editingFeedback.some((f) => f === 'empty')) {
      alert('Complete o feedback!');
      return;
    }

    const success = await submitFeedback(
      gameId,
      editingFeedback.map((f) => f.toString()),
    );
    if (success) {
      setEditingFeedback(['empty', 'empty', 'empty', 'empty']);
    }
  };

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-3xl font-bold text-success">Modo Multiplayer</h2>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <button onClick={() => setPhase('creating')} className="px-6 py-3 font-bold rounded">
            Criar Nova Partida
          </button>

          <button onClick={() => setPhase('joining')} className="px-6 py-3 font-bold rounded">
            Entrar em uma Partida
          </button>
        </div>

        {error && <p>{error}</p>}
      </div>
    );
  }

  if (phase === 'creating') {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
          <h2 className="text-3xl font-bold">Criar Nova Partida</h2>

          <SetupGame secretCode={secretCode} setSecretCode={setSecretCode} enabled={true} />

          <button
            onClick={handleCreateGame}
            disabled={loading || secretCode.some((c) => c === 'default')}
            className="px-6 py-3 font-bold rounded disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Partida'}
          </button>

          <button onClick={() => setPhase('menu')} className="px-4 py-2 rounded">
            Voltar
          </button>

          {error && <p>{error}</p>}
        </div>
        <ChatRoom />
      </>
    );
  }

  if (phase === 'joining') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-3xl font-bold">Entrar em uma Partida</h2>

        <input
          type="text"
          placeholder="ID da Partida"
          value={inputGameId}
          onChange={(e) => setInputGameId(e.target.value)}
          className="px-4 py-2 border-2 rounded w-full max-w-md"
        />

        <button
          onClick={handleJoinGame}
          disabled={loading || !inputGameId}
          className="px-6 py-3 font-bold rounded disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar na Partida'}
        </button>

        <button onClick={() => setPhase('menu')} className="px-4 py-2 rounded">
          Voltar
        </button>

        {error && <p>{error}</p>}
        <ChatRoom />
      </div>
    );
  }

  if (phase === 'lobby') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-3xl font-bold">Aguardando Oponente...</h2>
        <div className="text-xl">
          <p>
            ID da Partida: <span className="font-bold text-success">{gameId}</span>
          </p>
          <p className="text-sm mt-2">Compartilhe este ID com seu oponente!</p>
        </div>
        <div className="animate-pulse text-lg">Esperando segundo jogador entrar...</div>
        {secretCode.some((c) => c !== 'default') && (
          <div className="mt-4">
            <SetupGame secretCode={secretCode} setSecretCode={() => {}} enabled={false} />
          </div>
        )}
        <ChatRoom />
      </div>
    );
  }

  if (phase === 'playing' && gameState) {
    const rows: RowType[] = gameState.rows.map((r) => ({
      pegs: r.pegs as PegColor[],
      feedback: r.feedback as FeedbackType[],
    }));

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Partida: {gameId}</h2>
          <p className="text-lg">
            Você é o <span>Jogador {gameState.playerNumber}</span>
          </p>
          <p className="text-lg">{gameState.isMyTurn ? 'Sua vez!' : 'Vez do oponente'}</p>
        </div>

        <Board
          rows={rows}
          guessingRow={guessingRow}
          setGuessingRow={setGuessingRow}
          editingFeedback={editingFeedback}
          setEditingFeedback={setEditingFeedback}
          awaitingFeedback={!gameState.isMyTurn}
          isPlayerGuessing={gameState.playerNumber === 2}
          secretCode={
            (gameState.secretCode as PegColor[]) || ['default', 'default', 'default', 'default']
          }
        />

        {gameState.isMyTurn && gameState.playerNumber === 2 && (
          <button
            onClick={handleSubmitGuess}
            disabled={loading || guessingRow.pegs.some((p) => p === 'default')}
            className="px-6 py-3 font-bold rounded disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Jogada'}
          </button>
        )}

        {gameState.isMyTurn && gameState.playerNumber === 1 && (
          <button
            onClick={handleSubmitFeedback}
            disabled={loading || editingFeedback.some((f) => f === 'empty')}
            className="px-6 py-3 font-bold rounded disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        )}

        {error && <p>{error}</p>}
      </div>
    );
  }

  if (phase === 'finished' && gameState) {
    const isWinner = gameState.winner === `player${gameState.playerNumber}`;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-4xl font-bold">{isWinner ? '🎉 Você Venceu!' : '😢 Você Perdeu!'}</h2>
        <p className="text-xl">Vencedor: Jogador {gameState.winner?.replace('player', '')}</p>
        <button
          onClick={() => {
            setPhase('menu');
            setGameId('');
            setInputGameId('');
            setSecretCode(['default', 'default', 'default', 'default']);
          }}
          className="px-6 py-3 font-bold rounded"
        >
          Jogar Novamente
        </button>
      </div>
    );
  }

  return null;
}
