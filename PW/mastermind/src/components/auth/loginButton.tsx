'use client';

import { useState } from 'react';
import LoginModal from './loginModal';

export default function LoginButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>LOGIN</button>
      {open && <LoginModal onClose={() => setOpen(false)} />}
    </>
  );
}
