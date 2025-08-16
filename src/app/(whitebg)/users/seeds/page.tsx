import styles from './Seeds.module.css';
import TabView from './_components/(tabs)/TabView';
import SeedInfoBox from './_components/SeedInfoBox';
import LogoText from '@/components/LogoText';

const SeedsLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <LogoText logoSize={36} className={'title-md txt-primary'} as="h4">
          미나리샵
        </LogoText>
      </div>

      <div className={styles.content}>
        <SeedInfoBox />

        <TabView />
      </div>
    </div>
  );
};

export default SeedsLayout;
