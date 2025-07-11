'use client';
import ArrowRight from '@/assets/icon/arrow-black.svg';
import styles from './MainButton.module.css';

import Button from '@/components/Button';

const MainButton = () => {
  return (
    <div className={styles['button__wrapper']}>
      <a href="/rehearsal" target="_blank" rel="noopener noreferrer">
        <Button border iconRight={ArrowRight}>
          면접 시작하기
        </Button>
      </a>
    </div>
  );
};

export default MainButton;
