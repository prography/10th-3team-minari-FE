import styles from './Minari.module.css';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import Tags from './_components/Tags';
import type {Metadata} from 'next';
import MainButton from './_components/MainButton';
import Detail from './_components/Detail';

export const metadata: Metadata = {
  title: '미래의 나를 위한 리허설',
};

const MinariPage = () => {
  return (
    <div className={styles.container}>
      <div className="title-lg">
        오늘의 미나리 <Image src={Minari} alt="" className="mg-top-4" width={28} />
      </div>
      <div className="title-xs mg-top-8 txt-secondary">지금 나에게 맞는 질문을 추천해드려요.</div>
      <Detail />
      <Tags />
      <MainButton />
    </div>
  );
};

export default MinariPage;
