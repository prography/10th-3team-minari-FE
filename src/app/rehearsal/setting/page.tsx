'use client';

import {useEffect, useRef} from 'react';
import SelectDeviceBox from './_components/SelectDeviceBox';
import {useRouter} from 'next/navigation';
import {useMediaStore} from '@/stores/mediaStore';
import {getMediaStream} from '@/utils/media';
import {useDeviceStore} from '@/stores/devicsStore';

const ReharsalSettingPage = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {setMediaStream} = useMediaStore();
  const {selectDevice} = useDeviceStore();
  const {videoInput, audioInput} = selectDevice;

  useEffect(() => {
    const setupStream = async () => {
      const stream = await getMediaStream({videoInput, audioInput});
      if (stream) {
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    };

    void setupStream();
  }, []);

  const handleRehearsalStart = () => {
    router.push('/rehearsal');
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
        gap: '50px',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{borderRadius: '20px', height: '500px', width: '500px'}}
      />

      <div style={{display: 'flex', gap: '30px'}}>
        <SelectDeviceBox type="videoInput" />
        <SelectDeviceBox type="audioInput" />
      </div>

      <button
        onClick={handleRehearsalStart}
        style={{width: '100px', padding: '10px', background: 'skyblue'}}
      >
        면접 시작
      </button>
    </div>
  );
};

export default ReharsalSettingPage;
