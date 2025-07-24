'use client';

import Image from 'next/image';
import Shape from '@/assets/icon/shapes.svg';
import styles from './Detail.module.css';
import {useTagDetail} from '@/hooks/queries/useTagDetail';
import {useQuestionId} from '@/hooks/queries/useQuestionId';

const Detail = () => {
  const {data: questionId} = useQuestionId();
  const {data} = useTagDetail(questionId ?? 0);
  return (
    <div className={styles['category__container']}>
      <div>
        <Image src={Shape} alt="shapes" />
        <span className="label-lg txt-tertiary mg-left-4">세부 카테고리</span>
      </div>
      {data && <div className="label-lg txt-secondary">{data.result}</div>}
    </div>
  );
};

export default Detail;
