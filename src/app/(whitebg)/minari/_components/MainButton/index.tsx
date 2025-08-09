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
    <div className={styles.button_wrapper}>
      {isRetryAvailable && (
        <div className={styles.result_button}>
          <Button full border theme="secondary" onClick={() => router.push(PATH.REHEARSAL_RESULT)}>
            결과보기
          </Button>
        </div>
      )}
      <a href={PATH.REHEARSAL} target="_blank" rel="noopener noreferrer">
        <Button full border iconRight={ArrowRight} disabled={data === 'UNKNOWN'}>
          {isRetryAvailable ? '다시 도전하기' : '면접 시작하기'}
        </Button>
      </a>
    </div>
  );
};

export default MainButton;
