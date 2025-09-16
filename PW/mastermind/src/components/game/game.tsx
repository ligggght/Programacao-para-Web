// TODO: adição do passo de escolher o segredo
// TODO: integração com o front dos envios passados

'use client';
import React, { useEffect, useState } from 'react';
import Board from './Board';
import type { RowType, FeedbackType } from '@/types/global';

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

  const [canSubmitFeedback, setCanSubmitFeedback] = useState(false);

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
  }

  // Sempre que a linha de edição mudar, verifica se todos os pinos foram preenchidos
  useEffect(() => {
    setCanSubmitFeedback(guessingRow.pegs.every((c) => c !== null));
  }, [guessingRow]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#16213e] p-6">
      <h2 className="text-white text-2xl font-bold">Mastermind</h2>
      <Board
        rows={rows}
        guessingRow={guessingRow}
        setGuessingRow={setGuessingRow}
        editingFeedback={editingFeedback}
        setEditingFeedback={setEditingFeedback}
        awaitingFeedback={awaitingFeedback}
      />

      {!awaitingFeedback && (
        <button
          onClick={() => {
            addGuess({
              pegs: guessingRow.pegs,
              feedback: ['empty', 'empty', 'empty', 'empty'],
            });
          }}
          disabled={!canSubmitFeedback}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded"
        >
          Submeter Jogada
        </button>
      )}

      {awaitingFeedback && (
        <button
          onClick={() => {
            addFeedback(editingFeedback, rows.length - 1);
          }}
          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded"
        >
          Submeter Feedback
        </button>
      )}
    </div>
  );
}
