'use client';

import { useState } from 'react';
import Image from 'next/image';

const avatarStyles = ['adventurer', 'bottts', 'thumbs', 'identicon', 'initials'];

export default function RegisterModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatarStyle, setAvatarStyle] = useState('adventurer');
  const [avatarSeed, setAvatarSeed] = useState('');

  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/png?seed=${avatarSeed}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();

    const body = {
      username,
      password,
      avatarSeed,
      avatarStyle,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert('Registrado com sucesso!');
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
          background: 'var(--primary-color)',
          padding: '2rem',
          borderRadius: '10px',
          width: '350px',
          color: 'var(--text-color)',
          border: '2px solid var(--accent-color)',
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Registrar</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {/* Username */}
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '0.5rem',
              background: 'var(--primary-color)',
              border: '2px solid var(--accent-color)',
              color: 'var(--text-color)',
            }}
          />

          {/* Senha */}
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.5rem',
              background: 'var(--primary-color)',
              border: '2px solid var(--accent-color)',
              color: 'var(--text-color)',
            }}
          />

          {/* Avatar Style */}
          <select
            value={avatarStyle}
            onChange={(e) => setAvatarStyle(e.target.value)}
            style={{
              padding: '0.5rem',
              background: 'var(--primary-color)',
              border: '2px solid var(--accent-color)',
              color: 'var(--text-color)',
            }}
          >
            {avatarStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          {/* Avatar Seed -> muda gera outro avatar */}
          <input
            type="text"
            placeholder="Seed do avatar"
            value={avatarSeed}
            onChange={(e) => setAvatarSeed(e.target.value)}
            style={{
              padding: '0.5rem',
              background: 'var(--primary-color)',
              border: '2px solid var(--accent-color)',
              color: 'var(--text-color)',
            }}
          />

          {/* Preview do Avatar */}
          <div style={{ textAlign: 'center' }}>
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full border-2 border-[var(--accent-color)]"
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '0.7rem',
              background: 'var(--accent-color)',
              color: 'var(--text-color)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Registrar
          </button>
        </form>

        <button
          onClick={onClose}
          style={{
            marginTop: '1rem',
            width: '100%',
            padding: '0.5rem',
            background: 'var(--secondary-color)',
            color: 'var(--text-color)',
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
