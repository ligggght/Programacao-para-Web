'use client';
import { useState, useEffect } from 'react';
import Header from '../components/initialPage/header';
import Sidebar from '../components/initialPage/sidebar';
import Footer from '../components/initialPage/footer';
import GamePreview from '../components/initialPage/gamePreview';
import TechGrid from '../components/initialPage/techGrid';
import HowToPlay from '../components/initialPage/howToPlay';

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  useEffect(() => {
    document.body.className = isLightMode ? 'light-mode' : '';
  }, [isLightMode]);

  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <Sidebar />
      <main>
        <section id="sobre" className="content-section">
          <h2>SOBRE O PROJETO</h2>
          <p>O Master Mind é um jogo clássico de lógica e dedução...</p>
          <GamePreview />
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
      </main>
      <Footer />
    </>
  );
}
