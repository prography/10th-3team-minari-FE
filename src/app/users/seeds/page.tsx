'use client';

import {useRouter} from 'next/navigation';
import BuyTab from './_components/(tabs)/BuyTab';
import HistoryTab from './_components/(tabs)/HistoryTab';
import UsageTab from './_components/(tabs)/UsageTab';
import TabButton from './_components/TabButton';
import styles from './Seeds.module.css';
import {useCurrentParams} from '@/hooks/useCurrentParams';

const SeedsPage = () => {
  const router = useRouter();
  const tab = useCurrentParams('tabs', 'buy');

  return (
    <div style={{marginTop: 16}}>
      <nav className={styles.nav_list}>
        {['buy', 'history', 'usage'].map((t) => (
          <TabButton key={t} onClick={() => router.push(`?tabs=${t}`)} active={tab === t}>
            {t === 'buy' ? '씨앗 사기' : t === 'history' ? '구입 내역' : '사용 내역'}
          </TabButton>
        ))}
      </nav>

      <div style={{marginTop: 32}}>
        {tab === 'buy' && <BuyTab />}
        {tab === 'history' && <HistoryTab />}
        {tab === 'usage' && <UsageTab />}
      </div>
    </div>
  );
};

export default SeedsPage;
