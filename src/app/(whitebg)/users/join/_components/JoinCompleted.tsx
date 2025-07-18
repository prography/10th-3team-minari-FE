import styles from './JoinCompleted.module.css';
import Image from 'next/image';
import GrayMinari from '@/assets/minari-gray-cut.svg';
import ProfileCard from '@/app/(whitebg)/users/my/_components/ProfileCard';

interface JoinCompletedProps {
  domain: string;
}

const JoinCompleted = ({domain}: JoinCompletedProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['profile-card__wrap']}>
        <ProfileCard domain={domain} />
      </div>
      <div className={styles['bg-image']}>
        <Image src={GrayMinari} alt="" />
      </div>
    </div>
  );
};

export default JoinCompleted;
