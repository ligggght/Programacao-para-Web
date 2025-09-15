import React, { useState } from 'react';
import Board from '../components/Board';
import FeedbackSelector from '../components/FeedbackSelector';

function Game() {
  const [rows, setRows] = useState([
    { pegs: [null, null, null, null], feedback: ['', '', '', ''] }
  ]);
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(['', '', '', '']);

  function addGuess(newGuess) {
    setRows(rows => {
      const updatedRows = [
        ...rows.slice(0, -1),
        newGuess,
        { pegs: [null, null, null, null], feedback: ['', '', '', ''] }
      ];
      return updatedRows;
    });
    setEditingFeedback(['', '', '', '']);
    setAwaitingFeedback(true);
  }

  function addFeedback(newFeedback, guessIndex) {
    setRows(rows =>
      rows.map((row, idx) =>
        idx === guessIndex
          ? { ...row, feedback: newFeedback }
          : row
      )
    );
    setAwaitingFeedback(false);
  }

  const editingRow = rows[rows.length - 1];
  const canSubmit = editingRow.pegs.every(c => c !== null);

  return (
    <div>
      <h2>Mastermind</h2>
      <Board
        rows={awaitingFeedback ? rows.slice(0, -1) : rows}
        onPegChange={(rowIdx, pegIdx, newColor) => {
          if (!awaitingFeedback && rowIdx === rows.length - 1) {
            setRows(rows =>
              rows.map((row, idx) =>
                idx === rowIdx
                  ? {
                      ...row,
                      pegs: row.pegs.map((c, i) => (i === pegIdx ? newColor : c))
                    }
                  : row
              )
            );
          }
        }}
        feedbackSelector={
          awaitingFeedback && rows.length > 1 ? (
            <FeedbackSelector
              feedback={editingFeedback}
              onChange={setEditingFeedback}
            />
          ) : null
        }
      />
      {!awaitingFeedback && (
        <button
          onClick={() => {
            addGuess({
              pegs: editingRow.pegs,
              feedback: ['', '', '', ''],
            });
          }}
          disabled={!canSubmit}
        >
          Submeter Jogada
        </button>
      )}
      {awaitingFeedback && rows.length > 1 && (
        <button
          onClick={() => {
            addFeedback(editingFeedback, rows.length - 2);
          }}
        >
          Submeter Feedback
        </button>
      )}
    </div>
  );
}

export default Game;