import styles from './JoinCompleted.module.css';
import Image from 'next/image';
import ProfileMinari from '@/assets/icon/profile-minari.svg';
import GrayMinari from '@/assets/minari-gray-cut.svg';
import Pen from '@/assets/icon/pen-gray.png';

interface JoinCompletedProps {
  name: string;
  domain: string;
  email: string;
}

const JoinCompleted = ({name, domain, email}: JoinCompletedProps) => {
  const selectedDomain = domain === 'FRONTEND' ? '프론트엔드' : '백엔드';
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className="fx">
          <Image src={ProfileMinari} alt="" />
          <div className={styles['text-section']}>
            <div className={styles['title__wrap']}>
              <div className="label-lg txt-white">{name}님</div>
              <div className={styles['edit-profile__button']}>
                <Image src={Pen} alt="" />
                <span className="label-md txt-inverse-gray">프로필 수정</span>
              </div>
            </div>
            <div className="body-md">{selectedDomain} | 미나리 0일차</div>
            <div>{email}</div>
          </div>
        </div>
      </div>
      <div className={styles['bg-image__wrapper']}>
        <Image src={GrayMinari} alt="" />
      </div>
    </div>
  );
};

export default JoinCompleted;
