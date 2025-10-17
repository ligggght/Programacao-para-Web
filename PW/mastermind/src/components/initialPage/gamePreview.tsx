import React from 'react';

export default function GamePreview() {
  return (
    <div className="game-preview">
      <h3>PEQUENO PREVIEW DO JOGO</h3>
      <div className="mastermind-board">
        <div className="secret-row">
          <div className="peg secret"></div>
          <div className="peg secret"></div>
          <div className="peg secret"></div>
          <div className="peg secret"></div>
        </div>

        <div className="guess-row">
          <div className="peg red"></div>
          <div className="peg blue"></div>
          <div className="peg green"></div>
          <div className="peg yellow"></div>
          <div className="feedback">
            <div className="feedback-peg correct"></div>
            <div className="feedback-peg position"></div>
            <div className="feedback-peg"></div>
            <div className="feedback-peg"></div>
          </div>
        </div>

        <div className="guess-row">
          <div className="peg purple"></div>
          <div className="peg orange"></div>
          <div className="peg blue"></div>
          <div className="peg green"></div>
          <div className="feedback">
            <div className="feedback-peg correct"></div>
            <div className="feedback-peg correct"></div>
            <div className="feedback-peg position"></div>
            <div className="feedback-peg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
