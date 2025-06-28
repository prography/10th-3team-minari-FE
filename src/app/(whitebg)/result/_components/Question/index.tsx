import Image from 'next/image';
import styles from './Question.module.css';
import MinariWhite from '@/assets/minari-white.svg';
import Calendar from '@/assets/icon/calendar-white.svg';
import Clock from '@/assets/icon/clock-5-white.svg';
import type {ApiResponse} from '@/apis/instance/APIClient';
import type {AnswerType} from '@/apis/answer';
import Time from '../Time';
import {useContents} from '@/hooks/queries/useContents';
import InfoBox from '@/components/InfoBox';

const Question = ({answer}: {answer?: ApiResponse<AnswerType> | null}) => {
  const {data: contents} = useContents(6);

  return (
    <InfoBox>
      <div className={styles.description}>
        <div className={`${styles.core} body-lg`}>
          <Image src={MinariWhite} alt="icon" width={18} aria-hidden />
          <span className="txt-white">오늘의 미나리</span>
        </div>
        <h2 className={`txt-white title-md`}>{contents?.result}</h2>

        <div className={styles.flex_gap_16}>
          <div className={styles.flex_gap_4}>
            <Image src={Calendar} alt="icon" width={24} height={24} />
            <time className={`txt-white label-lg`}>{answer?.result?.createDate}</time>
          </div>

          <div className={styles.flex_gap_4}>
            <Image src={Clock} alt="icon" width={24} height={24} />
            <span className={`txt-white label-lg`}>
              <Time runningTime={answer?.result?.runningTime} />
            </span>
          </div>
        </div>
      </div>
    </InfoBox>
  );
};

export default Question;
