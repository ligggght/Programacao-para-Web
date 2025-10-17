import React from 'react';

export default function Footer() {
  return (
    <footer>
      <address id="contato">
        <div className="footer-section">
          <h3>SOBRE O PROJETO</h3>
          <p>
            Este projeto foi desenvolvido como parte da disciplina de Programação para Web, com
            estética retrô 8-bit.
          </p>
        </div>

        <div className="footer-section">
          <h3>OBJETIVOS</h3>
          <ul>
            <li>Aplicar HTML5 semântico</li>
            <li>Implementar layouts responsivos</li>
            <li>Desenvolver lógica de jogo</li>
            <li>Utilizar React components</li>
            <li>Criar design 8-bit</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>DISCIPLINA</h3>
          <p>
            <strong>Programação para Web</strong>
          </p>
          <p>Professor: Wyllian Bezerra da Silva</p>
          <p>Semestre: 2025.2</p>
          <p>UFSC - Ciência da Computação</p>
        </div>

        <div className="footer-section">
          <h3>CONTATO</h3>
          <p>caiocra610@gmail.com</p>
          <p>marcoantonio.machadodearruda@gmail.com</p>
        </div>

        <div className="footer-section">
          <h3>REPOSITORIOS</h3>
          <ul>
            <li>
              <a href="https://github.com/ligggght/Programacao-para-Web/" target="_blank">
                GitHub - Source Code
              </a>
            </li>
          </ul>
        </div>
      </address>
    </footer>
  );
}
