'use client';

import { useState, useEffect } from 'react';
import { useMultiplayerGame } from '@/hooks/useMultiplayerGame';
import SetupGame from './SetupGame';
import Board from './Board';
import type { PegColor, FeedbackType, RowType } from '@/types/global';

type GamePhase = 'menu' | 'creating' | 'joining' | 'lobby' | 'playing' | 'finished';

export default function MultiplayerGame() {
  const { gameState, loading, error, createGame, joinGame, fetchGameState, submitGuess, submitFeedback } = useMultiplayerGame();
  
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [gameId, setGameId] = useState('');
  const [inputGameId, setInputGameId] = useState('');
  const [secretCode, setSecretCode] = useState<PegColor[]>(['default', 'default', 'default', 'default']);
  const [guessingRow, setGuessingRow] = useState<RowType>({
    pegs: ['default', 'default', 'default', 'default'],
    feedback: ['empty', 'empty', 'empty', 'empty'],
  });
  const [editingFeedback, setEditingFeedback] = useState<FeedbackType[]>(['empty', 'empty', 'empty', 'empty']);

  // Polling para atualizar estado do jogo
  useEffect(() => {
    if (!gameId || phase === 'menu' || phase === 'creating' || phase === 'joining') return;

    const interval = setInterval(() => {
      fetchGameState(gameId);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameId, phase, fetchGameState]);

  // Atualiza fase baseado no gameState
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
    if (secretCode.some(c => c === 'default')) {
      alert('Configure o código secreto completo!');
      return;
    }

    const newGameId = await createGame(secretCode.map(c => c.toString()));
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
    if (guessingRow.pegs.some(p => p === 'default')) {
      alert('Complete sua jogada!');
      return;
    }

    const success = await submitGuess(gameId, guessingRow.pegs.map(p => p.toString()));
    if (success) {
      setGuessingRow({
        pegs: ['default', 'default', 'default', 'default'],
        feedback: ['empty', 'empty', 'empty', 'empty'],
      });
    }
  };

  const handleSubmitFeedback = async () => {
    if (editingFeedback.some(f => f === 'empty')) {
      alert('Complete o feedback!');
      return;
    }

    const success = await submitFeedback(gameId, editingFeedback.map(f => f.toString()));
    if (success) {
      setEditingFeedback(['empty', 'empty', 'empty', 'empty']);
    }
  };

  // Menu inicial: escolher entre criar ou entrar
  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#16213e] p-6">
        <h2 className="text-white text-3xl font-bold">Modo Multiplayer</h2>
        
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={() => setPhase('creating')}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded"
          >
            Criar Nova Partida
          </button>

          <button
            onClick={() => setPhase('joining')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded"
          >
            Entrar em uma Partida
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  // Tela de criar partida (apenas para Player 1)
  if (phase === 'creating') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#16213e] p-6">
        <h2 className="text-white text-3xl font-bold">Criar Nova Partida</h2>
        
        <SetupGame secretCode={secretCode} setSecretCode={setSecretCode} enabled={true} />

        <button
          onClick={handleCreateGame}
          disabled={loading || secretCode.some(c => c === 'default')}
          className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Partida'}
        </button>

        <button
          onClick={() => setPhase('menu')}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded"
        >
          Voltar
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  // Tela de entrar na partida (Player 2 - SEM código secreto)
  if (phase === 'joining') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#16213e] p-6">
        <h2 className="text-white text-3xl font-bold">Entrar em uma Partida</h2>

        <input
          type="text"
          placeholder="ID da Partida"
          value={inputGameId}
          onChange={(e) => setInputGameId(e.target.value)}
          className="px-4 py-2 bg-[#0f3460] border-2 border-[#00d4ff] text-white rounded w-full max-w-md"
        />

        <button
          onClick={handleJoinGame}
          disabled={loading || !inputGameId}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar na Partida'}
        </button>

        <button
          onClick={() => setPhase('menu')}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded"
        >
          Voltar
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  if (phase === 'lobby') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#16213e] p-6">
        <h2 className="text-white text-3xl font-bold">Aguardando Oponente...</h2>
        <div className="text-white text-xl">
          <p>ID da Partida: <span className="text-[#00ff41] font-bold">{gameId}</span></p>
          <p className="text-sm mt-2">Compartilhe este ID com seu oponente!</p>
        </div>
        <div className="animate-pulse text-[#00d4ff] text-lg">
          Esperando segundo jogador entrar...
        </div>
        
        {/* ADICIONADO: Mostrar código secreto criado enquanto aguarda */}
        {secretCode.some(c => c !== 'default') && (
          <div className="mt-4">
            <SetupGame secretCode={secretCode} setSecretCode={() => {}} enabled={false} />
          </div>
        )}
      </div>
    );
  }

  if (phase === 'playing' && gameState) {
    const rows: RowType[] = gameState.rows.map(r => ({
      pegs: r.pegs as PegColor[],
      feedback: r.feedback as FeedbackType[]
    }));

    const awaitingFeedback = gameState.isMyTurn && rows.length > 0 && 
      (!rows[rows.length - 1].feedback || rows[rows.length - 1].feedback.length === 0);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#16213e] p-6">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Partida: {gameId}</h2>
          <p className="text-lg">
            Você é o <span className="text-[#00ff41]">Jogador {gameState.playerNumber}</span>
          </p>
          <p className={`text-lg ${gameState.isMyTurn ? 'text-[#00ff41]' : 'text-red-500'}`}>
            {gameState.isMyTurn ? '🟢 Sua vez!' : '🔴 Vez do oponente'}
          </p>
        </div>

        {/* ADICIONADO: Card com código secreto fixo para Player 1 */}
        {gameState.playerNumber === 1 && secretCode.some(c => c !== 'default') && (
          <div className="bg-[#0f3460] border-2 border-[#00ff41] p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-center font-bold mb-2">Seu Código Secreto</h3>
            <SetupGame secretCode={secretCode} setSecretCode={() => {}} enabled={false} />
          </div>
        )}

        <Board
          rows={rows}
          guessingRow={guessingRow}
          setGuessingRow={setGuessingRow}
          editingFeedback={editingFeedback}
          setEditingFeedback={setEditingFeedback}
          awaitingFeedback={awaitingFeedback}
          secretCode={gameState.opponentSecretCode as PegColor[] || ['default', 'default', 'default', 'default']}
        />

        {gameState.isMyTurn && !awaitingFeedback && gameState.playerNumber === 2 && (
          <button
            onClick={handleSubmitGuess}
            disabled={loading || guessingRow.pegs.some(p => p === 'default')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Jogada'}
          </button>
        )}

        {gameState.isMyTurn && awaitingFeedback && gameState.playerNumber === 1 && (
          <button
            onClick={handleSubmitFeedback}
            disabled={loading || editingFeedback.some(f => f === 'empty')}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  if (phase === 'finished' && gameState) {
    const isWinner = gameState.winner === `player${gameState.playerNumber}`;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#16213e] p-6">
        <h2 className="text-white text-4xl font-bold">
          {isWinner ? '🎉 Você Venceu!' : '😢 Você Perdeu!'}
        </h2>
        <p className="text-white text-xl">
          Vencedor: Jogador {gameState.winner?.replace('player', '')}
        </p>
        <button
          onClick={() => {
            setPhase('menu');
            setGameId('');
            setInputGameId('');
            setSecretCode(['default', 'default', 'default', 'default']);
          }}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded"
        >
          Jogar Novamente
        </button>
      </div>
    );
  }

  return null;
}