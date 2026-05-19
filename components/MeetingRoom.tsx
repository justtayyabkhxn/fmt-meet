'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import { useLocalRecording } from '@/hooks/useRecording';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { isRecording, startRecording, stopRecording } = useLocalRecording();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid': return <PaginatedGridLayout />;
      case 'speaker-right': return <SpeakerLayout participantsBarPosition="left" />;
      default: return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white" style={{ background: '#080808' }}>
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>

        {/* Participants panel */}
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

      </div>

      {/* Controls bar */}
      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center pb-4">
      <div className="flex items-center gap-2 overflow-x-auto px-4 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        <CallControls onLeave={() => router.push('/')} />

        {/* Layout switcher */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger
              className="cursor-pointer rounded-2xl bg-[rgba(255,255,255,0.06)] px-3 py-3 hover:bg-[rgba(255,255,255,0.10)] transition-all"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}
            >
              <LayoutList size={18} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent
            className="bg-[#111] text-white rounded-xl"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 16px 40px rgba(0,0,0,0.7)' }}
          >
            {(['Grid', 'Speaker-Left', 'Speaker-Right'] as const).map((item, index) => (
              <div key={item}>
                <DropdownMenuItem
                  className="cursor-pointer rounded-lg text-sm hover:bg-white/10"
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
                {index < 2 && <DropdownMenuSeparator style={{ background: 'rgba(255,255,255,0.07)' }} />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Participants */}
        <button
          onClick={() => setShowParticipants((v) => !v)}
          title="Participants"
          className={cn(
            'cursor-pointer rounded-2xl px-3 py-3 transition-all',
            showParticipants ? 'bg-[rgba(255,255,255,0.12)]' : 'bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.10)]'
          )}
          style={{ boxShadow: showParticipants ? '0 0 0 1px rgba(255,255,255,0.16)' : '0 0 0 1px rgba(255,255,255,0.08)' }}
        >
          <Users size={18} className="text-white" />
        </button>

        {/* Local recording */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          title={isRecording ? 'Stop recording' : 'Record (saves to device)'}
          className={cn(
            'cursor-pointer rounded-2xl px-3 py-3 transition-all',
            isRecording ? 'bg-red-500/20 hover:bg-red-500/30' : 'bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.10)]'
          )}
          style={isRecording
            ? { boxShadow: '0 0 0 1px rgba(239,68,68,0.4)', color: '#f87171' }
            : { boxShadow: '0 0 0 1px rgba(255,255,255,0.08)', color: 'white' }
          }
        >
          <svg className={cn('h-[18px] w-[18px]', isRecording && 'animate-pulse')} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" strokeWidth={1.75} />
            <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
          </svg>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
