'use client';
import { useState, useRef, useEffect } from 'react';
import type { FeedbackPegProps, FeedbackType } from '../types/global';

const FEEDBACK_OPTIONS: FeedbackType[] = ['correct', 'wrong-position', 'wrong'];

export default function FeedbackPeg({ type, onChange }: FeedbackPegProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative inline-block ">
      {/* Bolinha principal */}
      <div
        className={`w-5 h-5 rounded-full cursor-pointer feedback-${type}`}
        onClick={() => setShowMenu(true)}
      />

      {/* Menu dropdown */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex gap-2 p-2 bg-gray-900 border-2 border-cyan-500 rounded-lg z-10"
        >
          {FEEDBACK_OPTIONS.map((type) => (
            <button
              key={type}
              className={`w-5 h-5 rounded-full feedback-${type}`}
              onClick={() => {
                onChange(type);
                setShowMenu(false);
              }}
              title={type}
            />
          ))}
        </div>
      )}
    </div>
  );
}
