'use client';

import {useRouter} from 'next/navigation';
import {useCurrentParams} from '@/hooks/useCurrentParams';
import BuyTab from '../BuyTab';
import HistoryTab from '../HistoryTab';
import UsageTab from '../UsageTab';
import TabButtonWrapper from '@/components/TabButton/TabButtonWrapper';
import TabButton from '@/components/TabButton';

const TabView = () => {
  const router = useRouter();
  const tab = useCurrentParams('tabs', 'buy');

  return (
    <>
      <TabButtonWrapper>
        {['buy', 'history', 'usage'].map((t) => (
          <TabButton key={t} onClick={() => router.push(`?tabs=${t}`)} active={tab === t}>
            {t === 'buy' ? '씨앗 사기' : t === 'history' ? '구입 내역' : '사용 내역'}
          </TabButton>
        ))}
      </TabButtonWrapper>

      <div>
        {tab === 'buy' && <BuyTab />}
        {tab === 'history' && <HistoryTab />}
        {tab === 'usage' && <UsageTab />}
      </div>
    </>
  );
};

export default TabView;
