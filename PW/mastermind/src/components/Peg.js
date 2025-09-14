import React, { useState, useRef, useEffect } from 'react';
import './Peg.css';

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

function Peg({ color, onChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Fecha o menu se clicar fora dele
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
        className={`peg${color ? ' ' + color : ''}`}
        onClick={() => {setShowMenu(true);}}
        style={{ cursor: !color ? 'pointer' : 'default' }}
      >
        {!color && ''}
      </div>
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
          {COLORS.map(c => (
            <button
              key={c}
              className={`peg ${c}`}
              style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
              onClick={() => {
                onChange(c);
                setShowMenu(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Peg;
