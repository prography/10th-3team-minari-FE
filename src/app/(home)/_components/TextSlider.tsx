import styles from './TextSlider.module.css';
import MinariBlack from '@/assets/minari-black.svg';
import Image from 'next/image';

const TextSlider = () => {
  const text = () => {
    return (
      <span className={styles['slide-texts']}>
        <span className="body-lg pd-left-24">미래의 나를 위한 리허설 ㅣ 미나리</span>
        <Image src={MinariBlack} alt="logo" />
        <span className="body-lg">매일 도착하는 질문을 통한 꾸준한 성장</span>
        <Image src={MinariBlack} alt="logo" />
        <span className="body-lg">1등 개발자 취업도우미</span>
        <Image src={MinariBlack} alt="logo" />
      </span>
    );
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles['slide-wrapper']}>
        <div className={styles['slide-container']}>
          <p>{text()}</p>
          <p>{text()}</p>
          <p>{text()}</p>
        </div>
      </div>
      <div className={`${styles['slide-wrapper']} ${styles['slide-dark']}`}>
        <div className={styles['slide-container']}>
          <p>{text()}</p>
          <p>{text()}</p>
          <p>{text()}</p>
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
