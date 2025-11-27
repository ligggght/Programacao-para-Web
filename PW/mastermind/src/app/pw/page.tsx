'use client';

import { useState } from 'react';
import Game from '@/components/game/Game';
import ModeSelector from '@/components/game/ModeSelector';

export default function Page() {
  const [gameMode, setGameMode] = useState<'single' | 'multi' | null>(null);

  const handleSelectMode = (mode: 'single' | 'multi') => {
    setGameMode(mode);
  };

  const handleBackToMenu = () => {
    setGameMode(null);
  };

  if (!gameMode) {
    return <ModeSelector onSelectMode={handleSelectMode} />;
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        onClick={handleBackToMenu}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          padding: '0.5rem 1rem',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.7rem',
          zIndex: 1000,
        }}
      >
        ← MENU
      </button>
      <Game />
    </div>
  );
}
