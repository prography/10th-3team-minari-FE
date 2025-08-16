import Image from 'next/image';
import Seed from '@/assets/icon/seed.svg';
import styles from './Info.module.css';

const Info = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.seed}>
        <div className={styles.icon}>
          <Image src={Seed} alt="씨앗 아이콘" width={28} height={28}></Image>
        </div>
        <span className="txt-primary label-lg">씨앗이란?</span>
      </div>
      <span className="txt-primary body-lg">
        면접을 다시 볼 수 있는 유료 재화예요. 1개의 씨앗 당 한 번 다시 볼 수 있어요.
      </span>
    </div>
  );
};

export default Info;
