import Image from 'next/image';
import styles from './InfoBox.module.css';
import MinariGray from '@/assets/minari-gray.svg';

const InfoBox = ({children}: {children: React.ReactNode}) => {
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
      {children}
    </div>
  );
};

export default InfoBox;
