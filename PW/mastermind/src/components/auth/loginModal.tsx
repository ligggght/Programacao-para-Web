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
      const res = await fetch('http://localhost:3001/api/user/login', {
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
          background: '#16213e',
          padding: '2rem',
          borderRadius: '10px',
          width: '350px',
          color: '#e0e0e0',
          border: '2px solid #00d4ff',
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
              background: '#0f3460',
              border: '2px solid #00d4ff',
              color: '#00d4ff',
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
              background: '#0f3460',
              border: '2px solid #00d4ff',
              color: '#00d4ff',
            }}
          />

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
            Entrar
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
