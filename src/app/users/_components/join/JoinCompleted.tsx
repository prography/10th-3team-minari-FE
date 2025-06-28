import styles from './JoinCompleted.module.css';
import Image from 'next/image';
import GrayMinari from '@/assets/minari-gray-cut.svg';
import ProfileCard from '@/app/users/_components/my/ProfileCard';

interface JoinCompletedProps {
  name: string;
  domain: string;
  email: string;
}

const JoinCompleted = ({name, domain, email}: JoinCompletedProps) => {
  const selectedDomain = domain === 'FRONTEND' ? '프론트엔드' : '백엔드';
  return (
    <div className={styles.wrapper}>
      <ProfileCard name={name} domain={selectedDomain} email={email} />
      <div className={styles['bg-image__wrapper']}>
        <Image src={GrayMinari} alt="" />
      </div>
    </div>
  );
};

export default JoinCompleted;
