import React, { useState } from 'react';
import Board from '../components/Board';
import FeedbackSelector from '../components/FeedbackSelector';

function Game() {
  const [rows, setRows] = useState([
    { pegs: [null, null, null, null], feedback: ['', '', '', ''] }
  ]);
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);

  function addGuess(newGuess) {
    setRows(rows => [
      // mantém todas as jogadas anteriores, exceto a última (linha de edição)
      ...rows.slice(0, -1),
      newGuess,
      // adiciona uma nova linha vazia para edição
      { pegs: [null, null, null, null], feedback: ['', '', '', ''] }
    ]);
    setAwaitingFeedback(true); // Agora espera o feedback
  }

  function addFeedback(newFeedback, guessIndex) {
    setRows(rows =>
      rows.map((row, idx) =>
        idx === guessIndex
          ? { ...row, feedback: newFeedback }
          : row
      )
    );
    setAwaitingFeedback(false); // Libera para próxima jogada

    if (rows.length === 13) {
      console.log('Jogo encerrado! Número máximo de jogadas atingido.');
    }
  }

  return (
    <div>
      <h2>Mastermind</h2>
      <Board
        rows={rows}
        onPegChange={(rowIdx, pegIdx, newColor) => {
          // Só permite alterar pegs se não estiver aguardando feedback e for a linha de edição
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
      />
      {/* Só mostra botão de submeter jogada se não estiver aguardando feedback */}
      {!awaitingFeedback && (
        <button
          onClick={() => {
            const editingRow = rows[rows.length - 1];
            addGuess({
              pegs: editingRow.pegs,
              feedback: ['', '', '', ''],
            });
          }}
        >
          Submeter Jogada
        </button>
      )}

      {/* Só mostra botão de feedback se estiver aguardando feedback */}
      {awaitingFeedback && (
        <FeedbackSelector
          initialFeedback={rows[rows.length - 2].feedback}
          onSubmit={newFeedback => {
            addFeedback(newFeedback, rows.length - 2);
          }}
        />
      )}
    </div>
  );
}

export default Game;