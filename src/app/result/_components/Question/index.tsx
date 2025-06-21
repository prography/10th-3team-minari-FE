import Image from 'next/image';
import styles from './Question.module.css';
import MinariGray from '@/assets/minari-gray.svg';
import MinariWhite from '@/assets/minari-white.svg';
import {getContents} from '@/apis/question';
import Calendar from '@/assets/icon/calendar-white.svg';
import Clock from '@/assets/icon/clock-5-white.svg';
// import Time from '../Time';

const Question = async () => {
  const contents = await getContents(5);
  const today = new Date();
  const formatted = today.toISOString().slice(0, 10).replace(/-/g, '.');

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

      <div className={styles.description}>
        <div className={`${styles.content} ${styles.core} body-lg`}>
          <Image src={MinariWhite} alt="icon" width={18} aria-hidden />
          <span>오늘의 미나리</span>
        </div>
        <h2 className={`${styles.content} title-md`}>{contents?.result}</h2>

        <div className={styles.flex_gap_16}>
          <div className={styles.flex_gap_4}>
            <Image src={Calendar} alt="icon" width={24} height={24} />
            <time className={`${styles.content} label-lg`}>{formatted}</time>
          </div>

          <div className={styles.flex_gap_4}>
            <Image src={Clock} alt="icon" width={24} height={24} />
            <span className={`${styles.content} label-lg`}>{/* <Time /> */}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
