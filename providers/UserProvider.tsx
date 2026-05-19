'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserContextType {
  userId: string;
  userName: string;
}

const UserContext = createContext<UserContextType | null>(null);

export const useCurrentUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useCurrentUser must be used within UserProvider');
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('yoom-user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSubmit = () => {
    if (!nameInput.trim()) return;
    const newUser = { userId: crypto.randomUUID(), userName: nameInput.trim() };
    localStorage.setItem('yoom-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="flex border h-screen w-full items-center justify-center px-4" style={{ background: '#080808' }}>
        <div
          style={{
            background: 'linear-gradient(175deg, #141414 0%, #0d0d0d 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 1px 0 rgba(255,255,255,0.07), 0 48px 80px rgba(0,0,0,0.7)',
          }}
          className="w-full max-w-fit rounded-[24px] p-7 text-white"
        >
          <div
            style={{
              background: 'linear-gradient(145deg, #242424 0%, #0f0f0f 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg"
          >
            <span className="text-[10px] font-bold text-neutral-200">FM</span>
          </div>

          <h1 className="text-lg font-semibold">Welcome to FMT Meet</h1>
          <p className="mt-1 text-sm text-neutral-500">Enter your name to get started</p>

          <div className="mt-6 space-y-2.5">
            <input
              autoFocus
              type="text"
              placeholder="e.g. Priya Sharma"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              style={{
                background: 'rgba(0,0,0,0.55)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 2px 4px rgba(0,0,0,0.4)',
              }}
              className="h-11 w-full rounded-xl px-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all focus:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.18),inset_0_2px_4px_rgba(0,0,0,0.4)]"
            />
            <button
              onClick={handleSubmit}
              disabled={!nameInput.trim()}
              style={{
                background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 6px 20px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.4)',
              }}
              className="h-11 w-full rounded-xl text-sm font-semibold text-black transition-all hover:brightness-105 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
