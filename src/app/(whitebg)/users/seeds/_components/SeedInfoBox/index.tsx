'use client';

import InfoBox from '@/components/InfoBox';
import {useUsers} from '@/hooks/queries/useUsers';
import styles from './SeedInfoBox.module.css';

const SeedInfoBox = () => {
  const {data} = useUsers();

  return (
    <InfoBox>
      <div className={styles.seeds_info}>
        <span className="title-sm txt-white">씨앗 이용 정보</span>
        <div className={`${styles.seeds_info_flex} body-lg txt-white`}>
          <span>{`${data ? data.name : ''}님의 씨앗`}</span>
          <span>{`${data ? data.seed : 0} 개`}</span>
        </div>
      </div>
    </InfoBox>
  );
};

export default SeedInfoBox;
