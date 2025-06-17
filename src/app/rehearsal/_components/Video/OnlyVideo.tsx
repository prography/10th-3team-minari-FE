'use client';

import {useMediaStore} from '@/stores/mediaStore';
import React, {useEffect, useRef} from 'react';
import styles from './Video.module.css';
import useMedia from '@/hooks/useMedia';
import {useDeviceStore} from '@/stores/devicsStore';

const OnlyVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {mediaStream} = useMediaStore();
  const {mediaStreamStatus, startMedia} = useMedia();
  const {selectDevice} = useDeviceStore();

  const {videoInput, audioInput} = selectDevice;

  useEffect(() => {
    if (mediaStreamStatus === 'idle' || mediaStreamStatus === 'pending') {
      void startMedia({videoInput, audioInput}, true);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <div className={styles.video_wrapper}>
      <video ref={videoRef} autoPlay muted playsInline />
    </div>
  );
};

export default OnlyVideo;
