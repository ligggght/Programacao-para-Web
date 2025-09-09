import React from 'react';
import './Board.css';

function Board({ rows }) {
  return (
    <div className="mastermind-board">
      {rows.map((row, idx) => (
        <div key={idx} className="guess-row">
          {row.pegs.map((color, pegIdx) => (
            <div key={pegIdx} className={`peg ${color}`}></div>
          ))}
          <div className="feedback">
            {row.feedback.map((type, fbIdx) => (
              <div key={fbIdx} className={`feedback-peg${type ? ' ' + type : ''}`}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;