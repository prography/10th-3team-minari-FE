import {useMediaStore} from '@/stores/mediaStore';
import React, {useEffect, useRef} from 'react';
import styles from './Video.module.css';

const OnlyVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {mediaStream} = useMediaStore();

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
