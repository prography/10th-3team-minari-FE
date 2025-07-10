import styles from './ErrorLayout.module.css';
import Image from 'next/image';
import Minari from '@/assets/minari-black.svg';

const ErrorLayout = ({children, code}: {children: React.ReactNode; code: number}) => {
  const zeroImage = <Image src={Minari} alt="" width={58} />;
  const errorCode = (code: number) => {
    switch (code) {
      case 404:
        return (
          <div className={styles.title}>
            <span className="display-lg">4</span>
            {zeroImage}
            <span className="display-lg">4</span>
          </div>
        );
      case 403:
        return (
          <div className={styles.title}>
            <span className="display-lg">4</span>
            {zeroImage}
            <span className="display-lg">3</span>
          </div>
        );
      case 401:
        return (
          <div className={styles.title}>
            <span className="display-lg">4</span>
            {zeroImage}
            <span className="display-lg">1</span>
          </div>
        );
      case 500:
        return (
          <div className={styles.title}>
            <span className="display-lg">5</span>
            {zeroImage} {zeroImage}
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['contents__wrap']}>
        <div>{errorCode(code)}</div>
        <div className={styles.contents}>{children}</div>
      </div>
    </div>
  );
};

export default ErrorLayout;
