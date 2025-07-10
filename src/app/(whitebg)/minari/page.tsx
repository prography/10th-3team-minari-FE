'use client';

import styles from './Minari.module.css';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import Button from '@/components/Button';
import {useTag} from '@/hooks/queries/useTag';
import {useQuestionId} from '@/hooks/queries/useQuestionId';
import Shape from '@/assets/icon/shapes.svg';
import Tag from '@/assets/icon/tag.svg';
import ArrowRight from '@/assets/icon/arrow-black.svg';

const MinariPage = () => {
  const {data: questionId} = useQuestionId();
  const {data} = useTag(questionId ?? 0);
  const CATEGORY = '브라우저';

  return (
    <div className={styles.container}>
      <div className="title-lg">
        오늘의 미나리 <Image src={Minari} alt="" className="mg-top-4" width={28} />
      </div>
      <div className="title-xs mg-top-8 txt-secondary">지금 나에게 맞는 질문을 추천해드려요.</div>
      <div className={styles['category__container']}>
        <div>
          <Image src={Shape} alt="shapes" />
          <span className="label-lg txt-tertiary mg-left-4">세부 카테고리</span>
        </div>
        <div className={`label-lg txt-secondary ${styles.category}`}>{CATEGORY}</div>
      </div>
      <div className={styles['keyword__wrapper']}>
        <div>
          <Image src={Tag} alt="tag" />
          <span className="label-lg txt-tertiary mg-left-4">관련 키워드</span>
        </div>
        <div className={styles['keyword__container']}>
          {data?.result?.map((item, i) => (
            <div key={i} className={styles.keyword}>
              <span className="label-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['button__wrapper']}>
        <a href="/rehearsal" target="_blank" rel="noopener noreferrer">
          <Button border iconRight={ArrowRight}>
            면접 시작하기
          </Button>
        </a>
      </div>
    </div>
  );
};

export default MinariPage;
