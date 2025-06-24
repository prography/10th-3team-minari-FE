import React, {useEffect, useState} from 'react';
import ProgressBar from './ProgressBar';
import styles from './CompleteModal.module.css';
import {useRouter} from 'next/navigation';
import {useCompleteModal} from '@/contexts/CompleteModalProvider';

const CompleteModal = () => {
  const [percent, setPercent] = useState(0);
  const {open, handleClose, isUploaded} = useCompleteModal();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    if (percent >= 100) {
      handleClose();
      router.push('/result');
      return;
    }

    if (isUploaded) {
      setPercent(100);
    }

    if (percent < 94) {
      const timer = setTimeout(() => {
        setPercent((prev) => {
          const increment = Math.floor(Math.random() * 6) + 3;
          return Math.min(prev + increment, 94);
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [percent, open, isUploaded]);

  if (!open) return <></>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <span className="title-sm">고생하셨어요</span>
        <span className="body-lg">
          오늘 면접 결과를 면밀히 분석하고 있어요. 잠시만 기다려주세요!
        </span>
        <ProgressBar value={percent} />
        <span className="body-md">결과 분석까지 {percent}%</span>
      </div>
    </div>
  );
};

export default CompleteModal;
