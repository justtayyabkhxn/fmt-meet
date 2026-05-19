'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useCurrentUser } from '@/providers/UserProvider';
import { useToast } from '@/components/ui/use-toast';

const features = [
  {
    title: 'HD Video',
    desc: 'Crystal-clear video and audio for every participant.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
      </svg>
    ),
  },
  {
    title: 'Screen Sharing',
    desc: 'Share your screen or any tab with a single click.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
      </svg>
    ),
  },
  {
    title: 'Local Recording',
    desc: 'Record and save meetings directly to your device.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
  {
    title: 'No Sign-up',
    desc: 'Enter your name, share a link — done in seconds.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { userName } = useCurrentUser();
  const { toast } = useToast();

  const [joinCode, setJoinCode] = useState('');
  const [creating, setCreating] = useState(false);

  const handleNewMeeting = async () => {
    if (!client) return;
    setCreating(true);
    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      await call.getOrCreate({
        data: { starts_at: new Date().toISOString(), custom: { description: 'Instant Meeting' } },
      });
      router.push(`/meeting/${call.id}`);
    } catch {
      toast({ title: 'Failed to create meeting' });
      setCreating(false);
    }
  };

  const handleJoin = () => {
    const code = joinCode.trim().replace(/\s+/g, '');
    if (!code) return;
    const id = code.includes('/meeting/') ? code.split('/meeting/')[1].split('?')[0] : code;
    router.push(`/meeting/${id}`);
  };

  return (
    <main className="relative min-h-screen text-white">

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <header style={{ background: 'rgba(8,8,8,0.80)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }} className="sticky top-0 z-50">
        <div className="mx-auto flex h-[62px] max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              style={{
                background: 'linear-gradient(145deg, #242424 0%, #0f0f0f 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg"
            >
              <span className="text-[10px] font-bold tracking-tight text-neutral-200">FM</span>
            </div>
            <span className="text-sm font-semibold text-white">FMT Meet</span>
          </div>

          {/* User */}
          <div
            style={{ background: 'rgba(255,255,255,0.04)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)' }}
            className="hidden items-center gap-2 rounded-full px-3 py-1.5 sm:flex"
          >
            <div style={{ background: 'linear-gradient(135deg, #555, #333)' }} className="h-5 w-5 rounded-full flex items-center justify-center">
              <span className="text-[9px] font-bold text-white uppercase">{userName[0]}</span>
            </div>
            <span className="text-xs text-neutral-400">{userName}</span>
          </div>
        </div>

        {/* Separator — gradient fade */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent 100%)' }} />
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative z-10 flex min-h-[calc(100vh-63px)] flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 text-center">

        {/* Glow behind the CTA card */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(140,140,160,0.07) 0%, transparent 65%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Eyebrow badge */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)',
          }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
        >
          <span
            style={{ background: 'linear-gradient(135deg, #bbb, #888)' }}
            className="h-1.5 w-1.5 rounded-full"
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
            FindMyTutor India
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{ fontSize: 'clamp(38px, 8vw, 108px)', lineHeight: 0.95, letterSpacing: 'clamp(-2px, -0.04em, -4px)', fontWeight: 700 }}
          className="max-w-4xl text-white"
        >
          Video meetings
          <br />
          <span
            style={{
              background: 'linear-gradient(160deg, #b8b8b8 0%, #383838 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            made simple.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-[480px] px-2 text-[14px] leading-[1.75] text-neutral-500 sm:mt-7 sm:text-[15px]">
          Start a meeting in seconds, share the link, and connect from your browser — no installs, no accounts required.
        </p>

        {/* ── Action Card ── */}
        <div
          style={{
            background: 'linear-gradient(175deg, #141414 0%, #0d0d0d 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 1px 0 rgba(255,255,255,0.07), 0 48px 80px rgba(0,0,0,0.7), 0 16px 32px rgba(0,0,0,0.4)',
          }}
          className="relative mt-10 w-full max-w-[420px] rounded-[24px] p-4 sm:mt-12 sm:p-6"
        >
          {/* New Meeting */}
          <button
            onClick={handleNewMeeting}
            disabled={!client || creating}
            style={{
              background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 6px 20px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.4)',
            }}
            className="flex h-13 w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-black transition-all duration-150 hover:brightness-105 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {creating ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
            {creating ? 'Starting…' : 'New Meeting'}
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07))' }} className="h-px flex-1" />
            <span className="text-[11px] text-neutral-600">or join with a code</span>
            <div style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.07), transparent)' }} className="h-px flex-1" />
          </div>

          {/* Join row */}
          <div className="flex gap-2.5">
            <input
              type="text"
              placeholder="Meeting code or link"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              style={{
                background: 'rgba(0,0,0,0.55)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 2px 4px rgba(0,0,0,0.4)',
              }}
              className="h-11 flex-1 rounded-xl px-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-150 focus:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.18),inset_0_2px_4px_rgba(0,0,0,0.4)]"
            />
            <button
              onClick={handleJoin}
              disabled={!joinCode.trim()}
              style={{
                background: 'linear-gradient(180deg, #222 0%, #171717 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 1px 0 rgba(255,255,255,0.07) inset, 0 4px 12px rgba(0,0,0,0.4)',
              }}
              className="h-11 rounded-xl px-5 text-sm font-medium text-neutral-300 transition-all hover:text-white hover:brightness-125 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Join
            </button>
          </div>
        </div>

        {/* Stat pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {['No downloads', 'No sign-up required', 'Browser based'].map((label) => (
            <span
              key={label}
              style={{ background: 'rgba(255,255,255,0.03)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
              className="rounded-full px-3 py-1 text-xs text-neutral-600"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="relative z-10 px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
        {/* Gradient rule */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 100%)' }} className="mb-20" />

        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-700">Features</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-200">Everything you need</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: 'linear-gradient(155deg, #141414 0%, #0d0d0d 100%)',
                  boxShadow: '0 0 0 0.5px rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                className="rounded-[20px] p-6 hover:-translate-y-1 hover:shadow-[0_0_0_0.5px_rgba(255,255,255,0.08),0_16px_36px_rgba(0,0,0,0.5)]"
              >
                <div
                  style={{
                    background: 'linear-gradient(145deg, #1e1e1e 0%, #141414 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 2px 8px rgba(0,0,0,0.4)',
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400"
                >
                  {f.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-neutral-200">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-[1.7] text-neutral-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 pb-10 text-center">
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)' }} className="mb-8" />
        <p className="text-xs text-neutral-800">© {new Date().getFullYear()} FMT Meet — FindMyTutor India</p>
      </footer>
    </main>
  );
}
