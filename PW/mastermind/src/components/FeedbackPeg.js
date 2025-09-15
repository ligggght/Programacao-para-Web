import React, { useState, useRef, useEffect } from 'react';
import './FeedbackSelector.css';

const FEEDBACK_COLORS = [
  { type: 'correct', color: 'green' },
  { type: 'correctColorWrongPosition', color: 'yellow' },
  { type: 'wrong', color: 'red' }
];

function FeedbackPeg({ color, onChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        className={`feedback-peg${color ? ' ' + color : ''}`}
        onClick={() => setShowMenu(true)}
        style={{ cursor: 'pointer' }}
      ></div>
      {showMenu && (
        <div
          ref={menuRef}
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
            gap: '0.5rem',
          }}
        >
          {FEEDBACK_COLORS.map(fb => (
            <button
              key={fb.type}
              className={`feedback-peg ${fb.color}`}
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: fb.color,
              }}
              onClick={() => {
                onChange(fb.color);
                setShowMenu(false);
              }}
              title={fb.type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackPeg;
