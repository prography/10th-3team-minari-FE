'use client';

import ArrowRight from '@/assets/icon/arrow-black.svg';
import styles from './MainButton.module.css';
import Button from '@/components/Button';
import {useAnswerEligibility} from '@/hooks/queries/useAnswerEligibility';
import {useRouter} from 'next/navigation';
import {PATH} from '@/constants/path';
import {useMemo} from 'react';

const MainButton = () => {
  const {data} = useAnswerEligibility();
  const router = useRouter();

  const isRetryAvailable = useMemo(() => {
    return data === 'LIMIT_REACHED' || data === 'SEED_REQUIRED';
  }, [data]);

  return (
    <div className={styles['button__wrapper']}>
      {isRetryAvailable && (
        <Button border theme="secondary" onClick={() => router.push(PATH.REHEARSAL_RESULT)}>
          결과보기
        </Button>
      )}
      <a href={PATH.REHEARSAL} target="_blank" rel="noopener noreferrer">
        <Button border iconRight={ArrowRight} disabled={data === 'UNKNOWN'} full>
          {isRetryAvailable ? '다시 도전하기' : '면접 시작하기'}
        </Button>
      </a>
    </div>
  );
};

export default MainButton;
