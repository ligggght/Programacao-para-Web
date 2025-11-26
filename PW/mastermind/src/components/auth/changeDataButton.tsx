'use client';

import { useState } from 'react';
import Image from 'next/image';
import ChangeDataModal from './changeDataModal';

export default function ChangeDataButton({
  user,
}: {
  user: { avatarStyle: string; avatarSeed: string };
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Image
        src={`https://api.dicebear.com/7.x/${user.avatarStyle}/png?seed=${user.avatarSeed}`}
        width={40}
        height={40}
        className="rounded-full"
        alt="Avatar"
        onClick={() => setOpen(true)}
      />
      {open && <ChangeDataModal onClose={() => setOpen(false)} />}
    </>
  );
}
