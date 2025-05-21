import styles from './MainPage.module.css';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';

const MainPage = () => {
  const KEYWORDS = ['키워드1', '키워드2', '키워드3'];

  return (
    <div className={styles.container}>
      <div className="title-lg">
        오늘의 미나리 <Image src={Minari} alt="" className="mg-top-4" />
      </div>
      <div className="title-xs mg-top-8 txt-tertiary">
        나에게 맞는 미나리를 선택하고, 풀어보세요!
      </div>
      <div className={styles['category__container']}>
        <div className="title-sm">세부 카테고리</div>
      </div>
      <div className={styles['keyword__wrapper']}>
        {KEYWORDS.map((item, i) => (
          <div key={i} className={styles['keyword__container']}>
            <span className="label-lg">{item}</span>
          </div>
        ))}
      </div>
      <div className={styles['button__wrapper']}>
        <Link href="/rehearsal/setting">
          <Button rounded>면접 시작하기</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
