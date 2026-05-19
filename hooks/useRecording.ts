'use client';

import { useState, useCallback, useRef } from 'react';

export function useLocalRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      } as DisplayMediaStreamOptions);

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yoom-recording-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
      };

      // Auto-stop when user stops sharing via browser UI
      stream.getVideoTracks()[0].onended = () => {
        if (recorderRef.current?.state === 'recording') {
          recorderRef.current.stop();
        }
        recorderRef.current = null;
        setIsRecording(false);
      };

      recorder.start(1000);
      recorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      // User cancelled or permission denied
    }
  }, []);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    recorderRef.current = null;
    setIsRecording(false);
  }, []);

  return { isRecording, startRecording, stopRecording };
}
