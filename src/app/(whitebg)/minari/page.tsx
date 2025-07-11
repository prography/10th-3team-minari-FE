import styles from './Minari.module.css';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import Shape from '@/assets/icon/shapes.svg';
import Tags from './_components/Tags';
import type {Metadata} from 'next';
import MainButton from './_components/MainButton';

export const metadata: Metadata = {
  title: '미래의 나를 위한 리허설',
};

const MinariPage = () => {
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
      <Tags />
      <MainButton />
    </div>
  );
};

export default MinariPage;
