'use client';
import React, { useState, useRef, useEffect } from 'react';
import { PEG_COLORS } from '../consts/consts';
import type { PegColor } from '../types/global';

type PegProps = {
  color: PegColor;
  enabled: boolean;
  onChange?: (color: PegColor) => void;
};

export default function Peg({ color, onChange, enabled = true }: PegProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Fecha o menu se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
        className={`peg peg-${color}`}
        onClick={enabled ? () => setShowMenu(true) : undefined}
        style={{ cursor: !color ? 'pointer' : 'default' }}
      >
        {!color && ''}
      </div>
      {showMenu && onChange && (
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
          {PEG_COLORS.map((c) => (
            <button
              key={c}
              className={`peg-${c}`}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
              }}
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
