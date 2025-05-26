import Image from 'next/image';
import styles from './Question.module.css';
import MinariGray from '@/assets/minari-gray.svg'; //
import MinariWhite from '@/assets/minari-white.svg';

const Question = () => {
  return (
    <div className={styles.wrapper}>
      <Image
        className={`${styles.flower} ${styles.left}`}
        src={MinariGray}
        alt="icon"
        aria-hidden
      />
      <Image
        className={`${styles.flower} ${styles.right}`}
        src={MinariGray}
        alt="icon"
        aria-hidden
      />
      <time className={`${styles.content} ${styles.time} label-lg`}>2025.05.03</time>
      <div className={styles.description}>
        <div className={`${styles.content} ${styles.core} body-lg`}>
          <Image src={MinariWhite} alt="icon" width={18} aria-hidden />
          <span>오늘의 미나리</span>
        </div>
        <h2 className={`${styles.content} title-md`}>웹 접근성에 대해 설명해 주세요.</h2>
      </div>
    </div>
  );
};

export default Question;
