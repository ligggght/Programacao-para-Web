import React from 'react';

export default function Sidebar() {
  return (
    <aside>
      <div className="sidebar-section">
        <h3>INTEGRANTES</h3>
        <ul>
          <li>Marco Antônio Machado de Arruda</li>
          <li>Caio César Rodrigues de Aquino</li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>FEATURES</h3>
        <ul>
          <li>Interface responsiva</li>
          <li>Sistema de score</li>
          <li>Estética 8-bit</li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>LINKS</h3>
        <ul>
          <li>
            <a href="https://github.com/ligggght/Programacao-para-Web/" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://presencial.moodle.ufsc.br/course/view.php?id=32192" target="_blank">
              Programação para Web
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
