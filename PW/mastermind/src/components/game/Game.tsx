// TODO: integração com o front dos envios passados

'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Board from './Board';
import SetupGame from './SetupGame';
import { EasyMastermindBot } from './Bot';
import type { RowType, FeedbackType, PegColor } from '@/types/global';

export default function Game() {
  const [rows, setRows] = useState<RowType[]>([]);
  const [guessingRow, setGuessingRow] = useState<RowType>({
    pegs: ['default', 'default', 'default', 'default'],
    feedback: ['empty', 'empty', 'empty', 'empty'],
  });

  const [awaitingFeedback, setAwaitingFeedback] = useState<boolean>(false);
  const [editingFeedback, setEditingFeedback] = useState<FeedbackType[]>([
    'empty',
    'empty',
    'empty',
    'empty',
  ]);
  const [secretCode, setSecretCode] = useState<PegColor[]>([
    'default',
    'default',
    'default',
    'default',
  ]);

  const [canSubmitFeedback, setCanSubmitFeedback] = useState(false);
  const [canSubmitGuess, setCanSubmitGuess] = useState(false);
  const [canSubmitGameSetup, setCanSubmitGameSetup] = useState(false);

  const [passwordGuessed, setPasswordGuessed] = useState(false);

  const [gameSettedUp, setGameSettedUp] = useState(false);

  const [isBotPlaying, setIsBotPlaying] = useState(false);
  const [isBotGuessing, setIsBotGuessing] = useState(false);
  const bot = useMemo(() => new EasyMastermindBot(isBotGuessing), [isBotGuessing]);

  // Bot começa jogando e precisa gerar o código secreto
  useEffect(() => {
    if (isBotPlaying && !isBotGuessing) {
      setSecretCode(bot.generateRandomPassword());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBotPlaying]);

  useEffect(() => {
    if (!isBotPlaying || passwordGuessed) return;

    if (!isBotGuessing && awaitingFeedback) {
      setTimeout(() => {
        addFeedback(bot.giveFeedback(rows[rows.length - 1].pegs), rows.length - 1);
      }, 500);
    }

    if (isBotGuessing && !awaitingFeedback) {
      setTimeout(() => {
        addGuess({ pegs: bot.makeGuess(rows), feedback: ['empty', 'empty', 'empty', 'empty'] });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, isBotPlaying]);

  function addGuess(newGuess: RowType) {
    setRows((rows) => {
      const updatedRows: RowType[] = [...rows, newGuess];
      return updatedRows;
    });

    setGuessingRow({
      pegs: ['default', 'default', 'default', 'default'],
      feedback: ['empty', 'empty', 'empty', 'empty'],
    });
    setEditingFeedback(['empty', 'empty', 'empty', 'empty']);
    setAwaitingFeedback(true);
  }

  function addFeedback(newFeedback: FeedbackType[], guessIndex: number) {
    setRows((rows) => [
      ...rows.slice(0, guessIndex),
      { ...rows[guessIndex], feedback: newFeedback },
      ...rows.slice(guessIndex + 1),
    ]);
    setEditingFeedback(['empty', 'empty', 'empty', 'empty']);
    setAwaitingFeedback(false);
    if (newFeedback.every((fb) => fb === 'correct')) {
      setPasswordGuessed(true);
    }
  }

  useEffect(() => {
    if (passwordGuessed) {
      alert('Parabéns! Você adivinhou o código secreto!');
      // Reiniciar o jogo
      setRows([]);
      setGuessingRow({
        pegs: ['default', 'default', 'default', 'default'],
        feedback: ['empty', 'empty', 'empty', 'empty'],
      });
      setAwaitingFeedback(false);
      setEditingFeedback(['empty', 'empty', 'empty', 'empty']);
      setSecretCode(['default', 'default', 'default', 'default']);
      setPasswordGuessed(false);
      setGameSettedUp(false);
    }
  }, [passwordGuessed]);

  useEffect(() => {
    if (rows.length >= 10 && !passwordGuessed) {
      alert('Fim de jogo! Você atingiu o número máximo de tentativas.');
      // Reiniciar o jogo
      setRows([]);
      setGuessingRow({
        pegs: ['default', 'default', 'default', 'default'],
        feedback: ['empty', 'empty', 'empty', 'empty'],
      });
      setAwaitingFeedback(false);
      setEditingFeedback(['empty', 'empty', 'empty', 'empty']);
      setSecretCode(['default', 'default', 'default', 'default']);
      setPasswordGuessed(false);
      setGameSettedUp(false);
    }
  }, [rows, passwordGuessed]);

  useEffect(() => {
    setCanSubmitGuess(guessingRow.pegs.every((c) => c !== 'default'));
  }, [guessingRow]);

  useEffect(() => {
    setCanSubmitFeedback(editingFeedback.every((c) => c !== 'empty'));
  }, [editingFeedback]);

  useEffect(() => {
    setCanSubmitGameSetup(secretCode.every((c) => c !== 'default'));
  }, [secretCode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#16213e] p-6">
      <h2 className="text-white text-2xl font-bold">Mastermind</h2>
      {!gameSettedUp && (
        <>
          <SetupGame secretCode={secretCode} setSecretCode={setSecretCode} />
          {/* TODO: mover para SetupGame os botoes abaixo */}
          <button
            onClick={() => {
              setIsBotPlaying(true);
              setIsBotGuessing(false);
              setGameSettedUp(true);
            }}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded"
          >
            Bot Gera o Código Secreto
          </button>
          {/* apenas aparece se a senha secreta já estar configurada */}
          {canSubmitGameSetup && (
            <button
              onClick={() => {
                setIsBotPlaying(true);
                setIsBotGuessing(true);
                setGameSettedUp(true);
              }}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded"
            >
              Bot Adivinha o Código Secreto
            </button>
          )}
        </>
      )}
      {gameSettedUp && (
        <Board
          rows={rows}
          guessingRow={guessingRow}
          setGuessingRow={setGuessingRow}
          editingFeedback={editingFeedback}
          setEditingFeedback={setEditingFeedback}
          awaitingFeedback={awaitingFeedback}
          secretCode={secretCode}
        />
      )}

      {!gameSettedUp && (
        <button
          onClick={() => setGameSettedUp(true)}
          disabled={!canSubmitGameSetup}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded"
        >
          Iniciar Jogo
        </button>
      )}
      {gameSettedUp && !awaitingFeedback && (
        <button
          onClick={() => {
            addGuess({
              pegs: guessingRow.pegs,
              feedback: ['empty', 'empty', 'empty', 'empty'],
            });
          }}
          disabled={!canSubmitGuess}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded"
        >
          Submeter Jogada
        </button>
      )}

      {gameSettedUp && awaitingFeedback && (
        <button
          onClick={() => {
            addFeedback(editingFeedback, rows.length - 1);
          }}
          disabled={!canSubmitFeedback}
          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded"
        >
          Submeter Feedback
        </button>
      )}
    </div>
  );
}
