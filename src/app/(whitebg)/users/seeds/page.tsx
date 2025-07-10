'use client';

import styles from './Seeds.module.css';
import TabView from './_components/(tabs)/TabView';
import InfoBox from '@/components/InfoBox';
import {useUsers} from '@/hooks/queries/useUsers';
import Image from 'next/image';
import Logo from '@/assets/minari-black.svg';

const SeedsLayout = () => {
  const {data} = useUsers();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Image src={Logo} alt="logo" width={36} height={36} />
        <h4 className="title-md">미나리샵</h4>
      </div>

      <div className={styles.content}>
        <InfoBox>
          <div className={styles.seeds_info}>
            <span className="title-sm txt-white">씨앗 이용 정보</span>
            <div className={`${styles.seeds_info_flex} body-lg txt-white`}>
              <span>{`${data ? data.name : ''}님의 씨앗`}</span>
              <span>{`${data ? data.seed : 0} 개`}</span>
            </div>
          </div>
        </InfoBox>

        <TabView />
      </div>
    </div>
  );
};

export default SeedsLayout;
