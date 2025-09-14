import React from 'react';
import './Board.css';
import Peg from './Peg';

function Board({ rows, onPegChange }) {
  return (
    <div className="mastermind-board">
      {rows.map((row, idx) => (
        <div key={idx} className="guess-row">
          {row.pegs.map((color, pegIdx) => (
            <Peg
              key={pegIdx}
              color={color}
              onChange={newColor => onPegChange(idx, pegIdx, newColor)}
            />
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