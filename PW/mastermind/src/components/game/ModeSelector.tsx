'use client';

import React from 'react';
import styles from '../../styles/ModeSelector.module.css';
import { useUserStore } from '@/stores/useUserStore';

interface ModeSelectorProps {
  onSelectMode: (mode: 'single' | 'multi') => void;
}

export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  const user = useUserStore((s) => s.user);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MASTERMIND</h1>
      <p className={styles.subtitle}>Escolha o modo de jogo</p>

      {user ? (
        <>
          <div className={styles.modes}>
            <button className={styles.modeButton} onClick={() => onSelectMode('single')}>
              <div className={styles.modeIcon}>🤖</div>
              <h2>Um Jogador</h2>
              <p>Jogue contra o computador</p>
            </button>

            <button 
              className={styles.modeButton} 
              onClick={() => onSelectMode('multi')}
            >
              <div className={styles.modeIcon}>👥</div>
              <h2>Dois Jogadores</h2>
              <p>Jogue com um amigo online</p>
            </button>
          </div>

          <div className={styles.info}>
            <h3>Como Jogar</h3>
            <p>Descubra a sequência secreta de 4 cores em até 10 tentativas!</p>
          </div>
        </>
      ) : (
        <div className="text-center my-8">
          <h2>Você precisa estar logado para jogar</h2>
          <p>Faça login para liberar o jogo.</p>
        </div>
      )}
    </div>
  );
}
