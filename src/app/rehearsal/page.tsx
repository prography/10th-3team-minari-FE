'use client';

import {useMediaStore} from '@/stores/mediaStore';
import {useEffect, useRef, useState} from 'react';

const ReharsalPage = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const videoBlobsRef = useRef<Blob[]>([]);
  const audioBlobsRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const {mediaStream} = useMediaStore();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const startRecording = ({
    mediaStream,
    selectedMimeType,
    mediaRecorderRef,
  }: {
    mediaStream: MediaStream;
    selectedMimeType: string;
    mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>;
  }) => {
    if (!mediaStream) return;

    try {
      videoBlobsRef.current = [];
      audioBlobsRef.current = [];

      mediaRecorderRef.current = new MediaRecorder(mediaStream, {
        mimeType: selectedMimeType,
        videoBitsPerSecond: 300000,
      });

      const audioOnlyStream = new MediaStream(mediaStream.getAudioTracks());

      audioRecorderRef.current = new MediaRecorder(audioOnlyStream, {
        mimeType: 'audio/webm',
      });

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          videoBlobsRef.current.push(event.data);
        }
      };

      audioRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          audioBlobsRef.current.push(event.data);
        }
      };
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async ({
    mediaRecorderRef,
  }: {
    mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>;
  }) => {
    if (!mediaRecorderRef.current || !audioRecorderRef.current) return;

    await Promise.all([
      new Promise<void>((resolve) => {
        mediaRecorderRef.current!.onstop = () => resolve();
        mediaRecorderRef.current!.stop();
      }),
      new Promise<void>((resolve) => {
        audioRecorderRef.current!.onstop = () => resolve();
        audioRecorderRef.current!.stop();
      }),
    ]);

    if (videoBlobsRef.current.length > 0) {
      const blob = new Blob(videoBlobsRef.current, {type: 'video/webm'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'recording_video_audio.webm';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }

    if (audioBlobsRef.current.length > 0) {
      const blob = new Blob(audioBlobsRef.current, {type: 'audio/webm'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'recording_audio_only.webm';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }

    videoBlobsRef.current = [];
    audioBlobsRef.current = [];
  };

  const handleStartClick = () => {
    if (mediaStream) {
      startRecording({
        mediaStream,
        selectedMimeType: 'video/webm;codecs=vp8',
        mediaRecorderRef,
      });
      mediaRecorderRef.current?.start();
      audioRecorderRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleCloseClick = async () => {
    await stopRecording({mediaRecorderRef});
    setIsRecording(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{borderRadius: '20px', height: '500px', width: '500px'}}
      />
      <div style={{display: 'flex', gap: '30px', margin: '10px 0'}}>
        <button
          onClick={handleStartClick}
          disabled={isRecording}
          style={{padding: '10px', background: 'skyblue', borderRadius: '4px', width: '200px'}}
        >
          시작
        </button>
        <button
          onClick={handleCloseClick}
          disabled={!isRecording}
          style={{padding: '10px', background: 'skyblue', borderRadius: '4px', width: '200px'}}
        >
          종료
        </button>
      </div>
    </div>
  );
};

export default ReharsalPage;
