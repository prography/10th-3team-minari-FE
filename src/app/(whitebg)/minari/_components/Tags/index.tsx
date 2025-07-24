'use client';

import Image from 'next/image';
import styles from './Tags.module.css';
import Tag from '@/assets/icon/tag.svg';
import {useQuestionId} from '@/hooks/queries/useQuestionId';
import {useTag} from '@/hooks/queries/useTag';

const Tags = () => {
  const {data: questionId} = useQuestionId();
  const {data} = useTag(questionId ?? 0);

  return (
    <div className={styles['keyword__wrapper']}>
      <div>
        <Image src={Tag} alt="tag" />
        <span className="label-lg txt-tertiary mg-left-4">관련 키워드</span>
      </div>
      <div className={styles['keyword__container']}>
        {data?.result?.map((item, i) => (
          <div key={i} className={styles.keyword}>
            <span className="label-lg txt-tertiary"># {item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
