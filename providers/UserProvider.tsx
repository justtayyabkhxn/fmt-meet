'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface UserContextType {
  userId: string;
  userName: string;
}

const UserContext = createContext<UserContextType | null>(null);

export const useCurrentUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error('useCurrentUser must be used within UserProvider');
  }

  return ctx;
};

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<UserContextType | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem('yoom-user');

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = () => {
    if (!nameInput.trim()) return;

    const newUser = {
      userId: crypto.randomUUID(),
      userName: nameInput.trim(),
    };

    localStorage.setItem('yoom-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        {/* Card */}
        <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-8">
          {/* Top Badge */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
              <span className="text-sm font-bold tracking-wide text-white">
                FM
              </span>
            </div>

            <div>
              <h2 className="text-sm font-medium text-neutral-400">
                FMT Meet
              </h2>
              <p className="text-xs text-neutral-600">
                Fast • Minimal • Secure
              </p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Join Meeting
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Enter your display name to continue into the meeting room.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Display Name
              </label>

              <input
                autoFocus
                type="text"
                placeholder="e.g. Tayyab Khan"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleSubmit()
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-5 text-sm text-white outline-none transition-all placeholder:text-neutral-600 focus:border-white/20 focus:bg-black/60 focus:ring-4 focus:ring-white/5"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!nameInput.trim()}
              className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-white text-sm font-semibold text-black transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="absolute inset-0 bg-gradient-to-b from-white to-neutral-300" />

              <span className="relative flex items-center gap-2">
                Continue

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-white/5 pt-5">
            <p className="text-center text-xs text-neutral-600">
              Your name is only visible inside the meeting.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};