import Peg from './Peg';
import FeedbackSelector from './FeedbackSelector';
import type { BoardProps } from '../../types/global';

export default function Board({
  rows,
  guessingRow,
  setGuessingRow,
  editingFeedback,
  setEditingFeedback,
  awaitingFeedback,
}: BoardProps) {
  return (
    <div className="flex flex-col items-center bg-[#16213e] p-6 border-[3px] border-[#00d4ff] relative shadow-[0_0_15px_#00d4ff,inset_0_0_15px_rgba(0,212,255,0.2)] w-full max-w-md">
      {/* Rows jogadas */}
      {rows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-2 mb-4 items-center">
          {row.pegs.map((color, pegIdx) => (
            <Peg key={pegIdx} color={color} enabled={false} />
          ))}
          <div className="grid grid-cols-4 gap-1">
            {row.feedback.map((type, fbIdx) => (
              <div key={fbIdx} className={`feedback-peg feedback-${type}`}></div>
            ))}
          </div>
        </div>
      ))}

      {/* Linha de adivinhação atual */}
      <div className="grid grid-cols-4 gap-2 mb-4 items-center">
        {!awaitingFeedback &&
          guessingRow.pegs.map((color, pegIdx) => (
            <Peg
              key={pegIdx}
              color={color}
              enabled={!awaitingFeedback}
              onChange={(newColor) => {
                const newPegs = [...guessingRow.pegs];
                newPegs[pegIdx] = newColor;
                setGuessingRow({ ...guessingRow, pegs: newPegs });
              }}
            />
          ))}

        <div className="grid grid-cols-4 gap-1">
          {awaitingFeedback && (
            <FeedbackSelector
              feedback={editingFeedback}
              onChange={(newFeedback) => setEditingFeedback(newFeedback)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
