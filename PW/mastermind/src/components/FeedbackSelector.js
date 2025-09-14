import React, { useState } from 'react';
import '../components/Board.css';

const FEEDBACK_TYPES = [
  { type: 'correct', label: '✓' },
  { type: 'correctColorWrongPosition', label: '↔' },
  { type: 'wrong', label: '✗' },
  { type: '', label: '?' }
];

function FeedbackSelector({ initialFeedback, onSubmit }) {
  const [feedback, setFeedback] = useState(initialFeedback);

  function handleChange(idx, type) {
    setFeedback(fb => fb.map((t, i) => (i === idx ? type : t)));
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {feedback.map((type, idx) => (
        <FeedbackPeg
          key={idx}
          type={type}
          onChange={newType => handleChange(idx, newType)}
        />
      ))}
      <button onClick={() => onSubmit(feedback)}>Submeter Feedback</button>
    </div>
  );
}

function FeedbackPeg({ type, onChange }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        className={`feedback-peg${type ? ' ' + type : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setShowMenu(true)}
      ></div>
      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#222',
            border: '2px solid #00d4ff',
            borderRadius: '8px',
            padding: '0.5rem',
            zIndex: 10,
            display: 'flex',
            gap: '0.5rem'
          }}
        >
          {FEEDBACK_TYPES.map(fb => (
            <button
              key={fb.type}
              className={`feedback-peg${fb.type ? ' ' + fb.type : ''}`}
              style={{ width: 20, height: 20, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
              onClick={() => {
                onChange(fb.type);
                setShowMenu(false);
              }}
              title={fb.label}
            >
              {fb.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackSelector;