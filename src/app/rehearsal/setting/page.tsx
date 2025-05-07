'use client';

import {useEffect, useRef, useState} from 'react';
import SelectDeviceBox from './_components/SelectDeviceBox';

const getDevices = async () => {
  const devicesList = await navigator.mediaDevices.enumerateDevices();
  const videoInputDevices = devicesList.filter((device) => device.kind === 'videoinput');
  const audioInputDevices = devicesList.filter((device) => device.kind === 'audioinput');
  return {videoInputDevices, audioInputDevices};
};

type DeviceList = {
  videoInputDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
};

type SelectDevice = {
  videoInput: MediaDeviceInfo | undefined;
  audioInput: MediaDeviceInfo | undefined;
};

const ReharsalSettingPage = () => {
  const [deviceList, setDeviceList] = useState<DeviceList>();
  const [selectDevice, setSelectDevice] = useState<SelectDevice>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const videoAudioBlobsRef = useRef<Blob[]>([]);
  const audioBlobsRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [media, setMedia] = useState<MediaStream | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await getDevices();
      setDeviceList(devices);
      setSelectDevice({
        videoInput: devices.videoInputDevices[0],
        audioInput: devices.audioInputDevices[0],
      });
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchMediaStream = async () => {
      if (!selectDevice) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: {ideal: 1920},
            height: {ideal: 1080},
            frameRate: 30,
            deviceId: selectDevice.videoInput?.deviceId
              ? {exact: selectDevice.videoInput.deviceId}
              : undefined,
          },
          audio: {
            echoCancellation: true,
            deviceId: selectDevice.audioInput?.deviceId
              ? {exact: selectDevice.audioInput.deviceId}
              : undefined,
          },
        });

        setMedia(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    fetchMediaStream();
  }, [selectDevice]);

  const startRecording = ({
    media,
    selectedMimeType,
    mediaRecorderRef,
  }: {
    media: MediaStream;
    selectedMimeType: string;
    mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>;
  }) => {
    if (!media) return;

    try {
      videoAudioBlobsRef.current = [];
      audioBlobsRef.current = [];

      mediaRecorderRef.current = new MediaRecorder(media, {
        mimeType: selectedMimeType,
        videoBitsPerSecond: 300000,
      });

      const audioOnlyStream = new MediaStream(media.getAudioTracks());

      audioRecorderRef.current = new MediaRecorder(audioOnlyStream, {
        mimeType: 'audio/webm',
      });

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          videoAudioBlobsRef.current.push(event.data);
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

    if (videoAudioBlobsRef.current.length > 0) {
      const blob = new Blob(videoAudioBlobsRef.current, {type: 'video/webm'});
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

    videoAudioBlobsRef.current = [];
    audioBlobsRef.current = [];
  };

  const handleSelectDevice = (type: 'videoInput' | 'audioInput', device: MediaDeviceInfo) => {
    setSelectDevice((prev) => ({
      audioInput: prev?.audioInput,
      videoInput: prev?.videoInput,
      [type]: device,
    }));
  };

  const handleStartClick = () => {
    if (media) {
      startRecording({
        media,
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
      <video ref={videoRef} autoPlay muted playsInline style={{borderRadius: '20px'}} />
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
      <div style={{display: 'flex', gap: '30px'}}>
        <SelectDeviceBox
          type="videoInput"
          deviceList={deviceList?.videoInputDevices}
          selected={selectDevice?.videoInput}
          onSelect={handleSelectDevice}
        />

        <SelectDeviceBox
          type="audioInput"
          deviceList={deviceList?.audioInputDevices}
          selected={selectDevice?.audioInput}
          onSelect={handleSelectDevice}
        />
      </div>
    </div>
  );
};

export default ReharsalSettingPage;
