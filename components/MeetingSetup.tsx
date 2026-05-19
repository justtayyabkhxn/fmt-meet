'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import Alert from './Alert';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (v: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();
  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable().catch(() => {});
      call.microphone.enable().catch(() => {});
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  // Stop preview tracks when unmounting so the browser releases the camera/mic indicator
  useEffect(() => {
    return () => {
      if (isMicCamToggled) return; // already disabled, nothing to stop
      call.camera.disable().catch(() => {});
      call.microphone.disable().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Meeting hasn't started yet — scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );
  if (callHasEnded)
    return (
      <Alert title="This call has ended" iconUrl="/icons/call-ended.svg" />
    );

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center px-4"
      style={{ background: '#080808' }}
    >
      <div
        style={{
          background: 'linear-gradient(175deg, #141414 0%, #0d0d0d 100%)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.07), 0 1px 0 rgba(255,255,255,0.07), 0 48px 80px rgba(0,0,0,0.7)',
        }}
        className="w-full max-w-[480px] rounded-[24px] p-5 sm:p-7 text-white"
      >
        <h1 className="mb-5 text-center text-lg font-semibold">
          Ready to join?
        </h1>

        <div
          style={{
            background: '#060606',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
          className="overflow-hidden rounded-2xl"
        >
          <VideoPreview />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-neutral-500">
            <input
              type="checkbox"
              checked={isMicCamToggled}
              onChange={(e) => setIsMicCamToggled(e.target.checked)}
              className="accent-neutral-400"
            />
            Join with mic &amp; camera off
          </label>
          <DeviceSettings />
        </div>

        <button
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
          style={{
            background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
            boxShadow:
              '0 1px 0 rgba(255,255,255,0.4) inset, 0 6px 20px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.4)',
          }}
          className="mt-5 h-11 w-full rounded-xl text-sm font-semibold text-black transition-all hover:brightness-105 active:scale-[0.985]"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingSetup;
