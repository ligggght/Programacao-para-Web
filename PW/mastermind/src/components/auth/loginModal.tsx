'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((s) => s.setUser);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();

    const body = { username, password };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setUser({
          userId: data.userId,
          username: data.username,
          avatarSeed: data.avatarSeed,
          avatarStyle: data.avatarStyle,
        });
        alert('Login realizado!');
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
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>

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
            Entrar
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
