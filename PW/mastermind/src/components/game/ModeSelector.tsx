'use client';

import React from 'react';
import styles from './ModeSelector.module.css';

interface ModeSelectorProps {
  onSelectMode: (mode: 'single' | 'multi') => void;
}

export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MASTERMIND</h1>
      <p className={styles.subtitle}>Escolha o modo de jogo</p>
      
      <div className={styles.modes}>
        <button 
          className={styles.modeButton}
          onClick={() => onSelectMode('single')}
        >
          <div className={styles.modeIcon}>🤖</div>
          <h2>Um Jogador</h2>
          <p>Jogue contra o computador</p>
        </button>

        <button 
          className={styles.modeButton}
          disabled
          title="Em desenvolvimento"
        >
          <div className={styles.modeIcon}>👥</div>
          <h2>Dois Jogadores</h2>
          <p>Em breve...</p>
        </button>
      </div>

      <div className={styles.info}>
        <h3>Como Jogar</h3>
        <p>Descubra a sequência secreta de 4 cores em até 10 tentativas!</p>
      </div>
    </div>
  );
}