'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/stores/useUserStore';

const avatarStyles = ['adventurer', 'bottts', 'thumbs', 'identicon', 'initials'];

export default function ChangeDataModal({ onClose }: { onClose: () => void }) {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // opcional
  const [avatarStyle, setAvatarStyle] = useState('');
  const [avatarSeed, setAvatarSeed] = useState('');

  // Carrega dados atuais
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatarStyle(user.avatarStyle);
      setAvatarSeed(user.avatarSeed);
    }
  }, [user]);

  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/png?seed=${avatarSeed}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();

    const body = {
      username,
      password, // opcional: só atualiza se preencher
      avatarSeed,
      avatarStyle,
    };

    try {
      const res = await fetch(`http://localhost:3001/api/user/update/${user?.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Dados atualizados!');

        // Atualiza zustand
        setUser({
          userId: user!.userId,
          username,
          avatarSeed,
          avatarStyle,
        });

        onClose();
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (err) {
      alert('Erro ao conectar ao servidor.');
      console.error(err);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: '#16213e',
          padding: '2rem',
          borderRadius: '10px',
          width: '350px',
          color: '#e0e0e0',
          border: '2px solid #00d4ff',
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Alterar Dados</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {/* Username */}
          <input
            type="text"
            placeholder="Novo Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '0.5rem',
              background: '#0f3460',
              border: '2px solid #00d4ff',
              color: '#00d4ff',
            }}
          />

          {/* Senha (opcional) */}
          <input
            type="password"
            placeholder="Nova Senha (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '0.5rem',
              background: '#0f3460',
              border: '2px solid #00d4ff',
              color: '#00d4ff',
            }}
          />

          {/* Avatar Style */}
          <select
            value={avatarStyle}
            onChange={(e) => setAvatarStyle(e.target.value)}
            style={{
              padding: '0.5rem',
              background: '#0f3460',
              border: '2px solid #00d4ff',
              color: '#00d4ff',
            }}
          >
            {avatarStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          {/* Avatar Seed */}
          <input
            type="text"
            placeholder="Seed do avatar"
            value={avatarSeed}
            onChange={(e) => setAvatarSeed(e.target.value)}
            style={{
              padding: '0.5rem',
              background: '#0f3460',
              border: '2px solid #00d4ff',
              color: '#00d4ff',
            }}
          />

          {/* Preview */}
          <div style={{ textAlign: 'center' }}>
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full border-2 border-[#00d4ff]"
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '0.7rem',
              background: '#00d4ff',
              color: '#0f3460',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Salvar
          </button>
        </form>

        <button
          onClick={onClose}
          style={{
            marginTop: '1rem',
            width: '100%',
            padding: '0.5rem',
            background: '#ff4d4d',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
