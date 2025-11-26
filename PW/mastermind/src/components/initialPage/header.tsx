import React from 'react';
import { useUserStore } from '@/stores/useUserStore';
import RegisterButton from '../auth/registerButton';
import LoginButton from '../auth/loginButton';
import ChangeDataButton from '../auth/changeDataButton';

type HeaderProps = {
  toggleTheme: () => void;
};

export default function Header({ toggleTheme }: HeaderProps) {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  return (
    <header className="w-full px-6 py-4 flex flex-col gap-4">
      {/* Linha superior: logo à esquerda / ações à direita */}
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold">MASTER MIND</h1>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <ChangeDataButton
                user={{
                  avatarStyle: user.avatarStyle,
                  avatarSeed: user.avatarSeed,
                }}
              />
              <button onClick={logout}>Sair</button>
            </div>
          ) : (
            <>
              <RegisterButton />
              <LoginButton />
            </>
          )}

          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md border border-gray-500 hover:bg-gray-700 transition"
          >
            🌙/☀️
          </button>
        </div>
      </div>

      {/* Navegação */}
      <nav>
        <ul className="flex gap-6 text-lg font-semibold">
          <li>
            <a href="#sobre" className="hover:text-blue-400">
              SOBRE
            </a>
          </li>
          <li>
            <a href="#objetivos" className="hover:text-blue-400">
              OBJETIVOS
            </a>
          </li>
          <li>
            <a href="#como-jogar" className="hover:text-blue-400">
              COMO JOGAR
            </a>
          </li>
          <li>
            <a href="#tecnologias" className="hover:text-blue-400">
              TECH
            </a>
          </li>
          <li>
            <a href="#contato" className="hover:text-blue-400">
              CONTATO
            </a>
          </li>
          <li>
            <a href="DOM.html" className="hover:text-blue-400">
              DOM
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
