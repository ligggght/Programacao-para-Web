import React from 'react';

export default function HowToPlay() {
  return (
    <div className="rules">
      <div className="rule">
        <h4>1. OBJETIVO</h4>
        <p>
          Descubra a sequência secreta de 4 cores gerada por outro jogador em até 10 tentativas.
        </p>
        <ul>
          <li>Jogador 1 descobre a sequência secreta com base no feedback.</li>
          <li>Jogador 2 cria a sequência e retorna feedback.</li>
        </ul>
      </div>

      <div className="rule">
        <h4>2. CORES DISPONÍVEIS</h4>
        <div className="color-palette">
          <div className="color-sample red"></div>
          <div className="color-sample blue"></div>
          <div className="color-sample green"></div>
          <div className="color-sample yellow"></div>
          <div className="color-sample purple"></div>
          <div className="color-sample orange"></div>
        </div>
        <p>6 cores neon disponíveis para criar suas combinações.</p>
      </div>

      <div className="rule">
        <h4>3. SISTEMA DE FEEDBACK</h4>
        <p>
          <span className="feedback-indicator correct"></span> cor correta na posição correta
        </p>
        <p>
          <span className="feedback-indicator position"></span> cor correta na posição errada
        </p>
        <p>Use o feedback para ajustar sua próxima tentativa!</p>
      </div>
    </div>
  );
}
