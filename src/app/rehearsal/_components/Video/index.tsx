'use client';

import React, {useEffect, useRef} from 'react';
import styles from './Video.module.css';
import {useMediaStore} from '@/stores/mediaStore';
import {useVideoState} from '@/contexts/VideoStateProvider';
import Image from 'next/image';
import Ellipse from '@/assets/icon/ellipse.svg';
import Pause from '@/assets/icon/pause.svg';
import {useRouter} from 'next/navigation';

const Video = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {mediaStream} = useMediaStore();
  const {videoState} = useVideoState();
  const {mediaStreamStatus} = useMediaStore();
  const router = useRouter();

  useEffect(() => {
    if (mediaStreamStatus !== 'connected') {
      router.push('/rehearsal/setting');
      return;
    }
  }, [mediaStreamStatus, router]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <div className={styles.video_wrapper}>
      {videoState !== 'DONE' && (
        <div className={styles.count_wrapper}>
          <VideoState />
        </div>
      )}
      <video ref={videoRef} autoPlay muted playsInline />
    </div>
  );
};

const VideoState = () => {
  const {videoState} = useVideoState();

  const titlefontType = typeof videoState === 'number' ? 'display-lg' : 'display-sm';
  const subtitleView = typeof videoState === 'number' || videoState === 'STOP';

  const titleText = () => {
    if (videoState === 'STOP') return <Image src={Pause} alt="icon" />;
    else return videoState;
  };

  const subtitleText = () => {
    if (typeof videoState === 'number') return 'seconds';
    if (videoState === 'STOP') return 'stop';
  };

  if (videoState === 'PENDING') {
    return (
      <div className={styles.video_state_wrapper}>
        <span className="body-lg">시작을 눌러 실행해 주세요.</span>
      </div>
    );
  }

  return (
    <div className={styles.video_state_wrapper}>
      <Image className={styles.ellipse} src={Ellipse} alt="icon" />
      <span className={titlefontType}>{titleText()}</span>
      {subtitleView && <span>{subtitleText()}</span>}
    </div>
  );
};

export default Video;
