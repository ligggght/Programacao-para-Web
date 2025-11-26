'use client';

import { useState } from 'react';
import RegisterModal from './registerModal';

export default function RegisterButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>REGISTER</button>
      {open && <RegisterModal onClose={() => setOpen(false)} />}
    </>
  );
}
