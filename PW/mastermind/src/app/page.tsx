'use client';
import { useState, useEffect } from 'react';
import Header from '../components/initialPage/header';
import Sidebar from '../components/initialPage/sidebar';
import Footer from '../components/initialPage/footer';
import GamePreview from '../components/initialPage/gamePreview';
import TechGrid from '../components/initialPage/techGrid';
import HowToPlay from '../components/initialPage/howToPlay';
import Game from '@/components/game/Game';
import ModeSelector from '@/components/game/ModeSelector';
import MultiplayerGame from '@/components/game/MultiplayerGame';

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [gameMode, setGameMode] = useState<'single' | 'multi' | null>(null);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  useEffect(() => {
    document.body.className = isLightMode ? 'light-mode' : '';
  }, [isLightMode]);

  const handlePlayClick = () => {
    setShowMenu(true);
  };

  const handleSelectMode = (mode: 'single' | 'multi') => {
    setGameMode(mode);
    setShowMenu(false);
  };

  const handleBackToMenu = () => {
    setGameMode(null);
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <Sidebar />
      <main>
        {/* Se está jogando single player */}
        {gameMode === 'single' ? (
          <div
            style={{
              position: 'relative',
              minHeight: '80vh',
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
        ) : gameMode === 'multi' ? (
          /* Se está jogando multiplayer */
          <div
            style={{
              position: 'relative',
              minHeight: '80vh',
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

            <MultiplayerGame />
          </div>
        ) : (
          /* Página inicial */
          <>
            <section id="sobre" className="content-section">
              <h2>SOBRE O PROJETO</h2>
              <p>O Master Mind é um jogo clássico de lógica e dedução...</p>
              <GamePreview />
              <button onClick={handlePlayClick} className="border-1">
                Jogar
              </button>
            </section>

            <section id="objetivos" className="content-section">
              <h2>OBJETIVOS</h2>
              <ul>
                <li>Implementar uma versão digital do jogo Master Mind</li>
                <li>Aplicar conceitos de Programação para Web com HTML5, CSS3 e JavaScript</li>
                <li>Utilizar o framework React para criar uma interface interativa</li>
                <li>Desenvolver habilidades em design responsivo e UX</li>
                <li>Implementar lógica de jogo e algoritmos de verificação</li>
                <li>Criar uma estética retrô 8-bit</li>
              </ul>
            </section>

            <section id="como-jogar" className="content-section">
              <h2>COMO JOGAR</h2>
              <HowToPlay />
            </section>

            <section id="tecnologias" className="content-section">
              <h2>STACK TECNOLÓGICO</h2>
              <TechGrid />
            </section>
          </>
        )}
      </main>
      <Footer />

      {/* Modal do ModeSelector */}
      {showMenu && !gameMode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleCloseMenu}
        >
          <div
            style={{ position: 'relative', width: '100%', maxWidth: '1200px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseMenu}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.5rem 1rem',
                background: '#d50000',
                border: '2px solid #ff073a',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.7rem',
                zIndex: 10000,
              }}
            >
              ✕ FECHAR
            </button>
            <ModeSelector onSelectMode={handleSelectMode} />
          </div>
        </div>
      )}
    </>
  );
}
