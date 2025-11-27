import Peg from './Peg';
import FeedbackSelector from './FeedbackSelector';
import SetupGame from './SetupGame';
import type { BoardProps } from '../../types/global';

export default function Board({
  rows,
  guessingRow,
  setGuessingRow,
  editingFeedback,
  setEditingFeedback,
  awaitingFeedback,
  isPlayerGuessing,
  secretCode,
}: BoardProps) {
  return (
    <div className="flex flex-col items-center p-6 border-[3px] border-[#00d4ff] relative shadow-[0_0_15px_#00d4ff,inset_0_0_15px_rgba(0,212,255,0.2)] w-full max-w-md gap-2">
      {/* Rows jogadas */}
      {rows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-4 items-center my-2">
          {row.pegs.map((color, pegIdx) => (
            <Peg key={pegIdx} color={color} enabled={false} />
          ))}
          <div className="grid grid-cols-2 gap-1">
            {row.feedback.map((type, fbIdx) => (
              <div key={fbIdx} className={`feedback-peg feedback-${type}`}></div>
            ))}
          </div>
        </div>
      ))}

      {/* Linha de adivinhação atual */}
      <div className="grid grid-cols-4 gap-2 mb-4 items-center">
        {!awaitingFeedback &&
          isPlayerGuessing &&
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

        <div className="grid grid-cols-4 gap-1 col-start-2 col-span-2 items-center justify-center">
          {!awaitingFeedback && !isPlayerGuessing && (
            <>
              <FeedbackSelector
                feedback={editingFeedback}
                onChange={(newFeedback) => setEditingFeedback(newFeedback)}
              />
            </>
          )}
        </div>
      </div>
      {!isPlayerGuessing && (
        <>
          {/* Mostra o código secreto */}
          <SetupGame secretCode={secretCode} setSecretCode={() => {}} enabled={false} />
        </>
      )}
    </div>
  );
}
