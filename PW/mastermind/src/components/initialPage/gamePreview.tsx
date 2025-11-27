import React from 'react';

export default function GamePreview() {
  return (
    <div className="game-preview">
      <h3>PEQUENO PREVIEW DO JOGO</h3>
      <div className="mastermind-board">
        <div className="secret-row">
          <div className="peg peg-default"></div>
          <div className="peg peg-default"></div>
          <div className="peg peg-default"></div>
          <div className="peg peg-default"></div>
        </div>

        <div className="guess-row">
          <div className="peg peg-vermelho"></div>
          <div className="peg peg-azul"></div>
          <div className="peg peg-verde"></div>
          <div className="peg peg-amarelo"></div>
          <div className="feedback">
            <div className="feedback-peg feedback-correct"></div>
            <div className="feedback-peg feedback-wrong-position"></div>
            <div className="feedback-peg feedback-wrong-position"></div>
            <div className="feedback-peg feedback-wrong"></div>
          </div>
        </div>

        <div className="guess-row">
          <div className="peg peg-roxo"></div>
          <div className="peg peg-laranja"></div>
          <div className="peg peg-azul"></div>
          <div className="peg peg-verde"></div>
          <div className="feedback">
            <div className="feedback-peg feedback-correct"></div>
            <div className="feedback-peg feedback-correct"></div>
            <div className="feedback-peg feedback-wrong-position"></div>
            <div className="feedback-peg feedback-wrong"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
