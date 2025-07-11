import styles from './Seeds.module.css';
import TabView from './_components/(tabs)/TabView';
import Image from 'next/image';
import Logo from '@/assets/minari-black.svg';
import SeedInfoBox from './_components/SeedInfoBox';

const SeedsLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Image src={Logo} alt="logo" width={36} height={36} />
        <h4 className="title-md">미나리샵</h4>
      </div>

      <div className={styles.content}>
        <SeedInfoBox />

        <TabView />
      </div>
    </div>
  );
};

export default SeedsLayout;
