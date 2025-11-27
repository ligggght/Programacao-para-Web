'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/useUserStore';

interface Message {
  _id: string;
  username: string;
  message: string;
  createdAt: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const user = useUserStore((state) => state.user);

  const fetchMessages = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`);
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!user) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, message: newMessage }),
    });
    setNewMessage('');
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // atualiza a cada 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-messages" style={{ height: '300px', overflowY: 'auto' }}>
        {messages.map((m) => (
          <div key={m._id} className="chat-message">
            <b className="chat-username">{m.username}:</b> {m.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Encontre alguém!"
        className="chat-input"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
