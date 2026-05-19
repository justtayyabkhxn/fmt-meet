'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push('/');
  };

  return (
    <button
      onClick={endCall}
      style={{
        background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 2px 8px rgba(220,38,38,0.4)',
      }}
      className="h-10 rounded-xl px-4 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
    >
      End for all
    </button>
  );
};

export default EndCallButton;
