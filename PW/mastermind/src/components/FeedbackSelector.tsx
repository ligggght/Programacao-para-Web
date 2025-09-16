import FeedbackPeg from './FeedbackPeg';
import type { FeedbackType } from '../types/global';

type FeedbackSelectorProps = {
  feedback: FeedbackType[];
  onChange: (newFeedback: FeedbackType[]) => void;
};

export default function FeedbackSelector({ feedback, onChange }: FeedbackSelectorProps) {
  function handleChange(idx: number, type: FeedbackType) {
    const newFeedback = [...feedback];
    newFeedback[idx] = type;
    onChange(newFeedback);
  }

  return (
    <div className="flex items-center gap-2">
      {feedback.map((type, idx) => {
        return (
          <FeedbackPeg
            key={idx}
            type={type}
            onChange={(selection) => {
              handleChange(idx, selection);
            }}
          />
        );
      })}
    </div>
  );
}
