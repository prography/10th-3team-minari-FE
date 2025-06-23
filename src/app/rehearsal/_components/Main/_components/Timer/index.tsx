import React from 'react';
import styles from './Timer.module.css';
import {useTimer} from '@/contexts/TimerProvider';

const Timer = () => {
  const {seconds} = useTimer();

  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (s % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return <div className={`${styles.wrapper} title-xs`}>제한시간 {formatTime(seconds)}</div>;
};

export default Timer;
