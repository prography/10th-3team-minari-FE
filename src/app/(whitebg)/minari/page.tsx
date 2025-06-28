'use client';

import styles from './Minari.module.css';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import Button from '@/components/Button';
import {useTag} from '@/hooks/queries/useTag';
import {QUESTION_ID} from '@/constants/questionId';

const MinariPage = () => {
  // const {questionId} = useQuestionId();
  const {data} = useTag(QUESTION_ID);
  const CATEGORY = '브라우저';

  return (
    <div className={styles.container}>
      <div className="title-lg">
        오늘의 미나리 <Image src={Minari} alt="" className="mg-top-4" width={28} />
      </div>
      <div className="title-xs mg-top-8 txt-tertiary">
        나에게 맞는 미나리를 선택하고, 풀어보세요!
      </div>
      <div className={styles['category__container']}>
        <div className="title-sm">{CATEGORY}</div>
      </div>
      <div className={styles['keyword__wrapper']}>
        {data?.result?.map((item, i) => (
          <div key={i} className={styles['keyword__container']}>
            <span className="label-lg">{item}</span>
          </div>
        ))}
      </div>
      <div className={styles['button__wrapper']}>
        <a href="/rehearsal" target="_blank" rel="noopener noreferrer">
          <Button rounded>면접 시작하기</Button>
        </a>
      </div>
    </div>
  );
};

export default MinariPage;
