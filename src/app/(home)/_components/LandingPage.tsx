import styles from './LandingPage.module.css';
import TextSlider from '@/app/(home)/_components/TextSlider';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import Button from '@/components/Button/Button';

const LandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['hero-grid']}>
        <div className={styles['hero-text']}>
          <div className="display-md">
            미나리와 함께 <Image src={Minari} alt="" className="mg-left-4" />
          </div>
          <div className="display-md">매일 한줄의 질문으로 자라나는</div>
          <div className="display-md mg-bottom-20">개발자의 여정</div>
          <Button iconRight="arrow-black" border>
            카카오 로그인
          </Button>
        </div>
      </div>
      <TextSlider />
    </div>
  );
};

export default LandingPage;
