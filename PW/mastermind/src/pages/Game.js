import React from 'react';
import Board from '../components/Board';

function Game() {
  // Exemplo de dados para o tabuleiro
  const rows = [
    { pegs: ['red', 'blue', 'green', 'yellow'], feedback: ['correct', 'position', '', ''] },
    { pegs: ['purple', 'orange', 'blue', 'green'], feedback: ['correct', 'correct', 'position', ''] },
    // Adicione mais linhas conforme necessário
  ];

  return (
    <div>
      <h2>Mastermind - Jogo</h2>
      <Board rows={rows} />
    </div>
  );
}

export default Game;