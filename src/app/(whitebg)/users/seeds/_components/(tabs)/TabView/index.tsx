'use client';

import {useRouter} from 'next/navigation';
import {useCurrentParams} from '@/hooks/useCurrentParams';
import HistoryTab from '../HistoryTab';
import TabButtonWrapper from '@/components/TabButton/TabButtonWrapper';
import TabButton from '@/components/TabButton';
import BuyTab from '../BuyTab';
import styles from './TabView.module.css';

const TabView = () => {
  const router = useRouter();
  const tab = useCurrentParams('tabs', 'buy');

  return (
    <div className={styles.wrapper}>
      <TabButtonWrapper>
        {['buy', 'history'].map((t) => (
          <TabButton key={t} onClick={() => router.push(`?tabs=${t}`)} active={tab === t}>
            {t === 'buy' ? '씨앗 사기' : '히스토리'}
          </TabButton>
        ))}
      </TabButtonWrapper>

      {tab === 'buy' && <BuyTab />}
      {tab === 'history' && <HistoryTab />}
    </div>
  );
};

export default TabView;
