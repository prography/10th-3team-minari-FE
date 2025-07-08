'use client';
import styles from './page.module.css';
import MoreTab from '@/app/(whitebg)/users/my/_components/Tab/More';
import TabButton from '@/components/TabButton';
import TabButtonWrapper from '@/components/TabButton/TabButtonWrapper';
import {useCurrentParams} from '@/hooks/useCurrentParams';
import {useRouter} from 'next/navigation';
import InfoTab from '@/app/(whitebg)/users/my/_components/Tab/Info';
import {UserHeatmapProvider} from '@/contexts/UserHeatmapProvider';

const MyPage = () => {
  const tab = useCurrentParams('tabs', 'buy');
  const router = useRouter();

  return (
    <div className={styles.container}>
      <TabButtonWrapper>
        {['info', 'more'].map((t) => (
          <TabButton key={t} onClick={() => router.push(`?tabs=${t}`)} active={tab === t}>
            {t === 'info' ? '마이페이지' : '더보기'}
          </TabButton>
        ))}
      </TabButtonWrapper>

      <UserHeatmapProvider>
        {tab === 'info' && <InfoTab />}
        {tab === 'more' && <MoreTab />}
      </UserHeatmapProvider>
    </div>
  );
};

export default MyPage;
