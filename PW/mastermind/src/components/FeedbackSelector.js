import '../components/Board.css';
import FeedbackPeg from './FeedbackPeg';

const FEEDBACK_COLORS = [
  { type: 'correct', color: 'green', label: '✓' },
  { type: 'correctColorWrongPosition', color: 'yellow', label: '↔' },
  { type: 'wrong', color: 'red', label: '✗' },
  { type: '', color: '', label: '?' }
];

function FeedbackSelector({ feedback, onChange }) {
  function handleChange(idx, type) {
    const newFeedback = feedback.map((t, i) => (i === idx ? type : t));
    onChange(newFeedback);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {feedback.map((type, idx) => {
        const colorObj = FEEDBACK_COLORS.find(fb => fb.type === type) || FEEDBACK_COLORS[3];
        return (
          <FeedbackPeg
            key={idx}
            color={colorObj.color}
            onChange={newColor => {
              // Mapeia cor para tipo de feedback
              const selectedType = FEEDBACK_COLORS.find(fb => fb.color === newColor)?.type || '';
              handleChange(idx, selectedType);
            }}
          />
        );
      })}
    </div>
  );
}

export default FeedbackSelector;