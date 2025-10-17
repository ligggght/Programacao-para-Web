import React from 'react';

type HeaderProps = {
  toggleTheme: () => void;
};

export default function Header({ toggleTheme }: HeaderProps) {
  return (
    <header>
      <h1>MASTER MIND</h1>
      <button onClick={toggleTheme} style={{ position: 'absolute', top: 10, right: 10 }}>
        🌙/☀️
      </button>
      <nav>
        <ul>
          <li>
            <a href="#sobre">SOBRE</a>
          </li>
          <li>
            <a href="#objetivos">OBJETIVOS</a>
          </li>
          <li>
            <a href="#como-jogar">COMO JOGAR</a>
          </li>
          <li>
            <a href="#tecnologias">TECH</a>
          </li>
          <li>
            <a href="#contato">CONTATO</a>
          </li>
          <li>
            <a href="DOM.html">DOM</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
