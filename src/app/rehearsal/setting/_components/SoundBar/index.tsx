import useMicVolume from '@/hooks/useMicVolume';
import React from 'react';
import styles from './SoundBar.module.css';
import Mic from '@/assets/icon/mic.svg';
import Image from 'next/image';

const SoundBar = () => {
  const volume = useMicVolume();

  const activeBarCount = Math.round((volume / 100) * 12);

  return (
    <div className={styles.wrapper}>
      <Image src={Mic} alt="icon" width={24} height={24} />
      <div className={styles['bar-wrapper']}>
        {Array.from({length: 12}).map((_, idx) => (
          <div key={idx} className={`${styles.bar} ${idx < activeBarCount ? styles.active : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default SoundBar;
