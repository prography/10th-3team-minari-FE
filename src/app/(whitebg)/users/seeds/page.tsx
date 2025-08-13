import styles from './Seeds.module.css';
import TabView from './_components/(tabs)/TabView';
import SeedInfoBox from './_components/SeedInfoBox';
import LogoText from '@/components/LogoText';

const SeedsLayout = () => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>
        <LogoText logoSize={36} className="title-md txt-primary">
          미나리샵
        </LogoText>
      </h4>

      <div className={styles.content}>
        <SeedInfoBox />

        <TabView />
      </div>
    </div>
  );
};

export default SeedsLayout;
