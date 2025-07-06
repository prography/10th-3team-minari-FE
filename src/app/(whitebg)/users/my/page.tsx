'use client';
import styles from './page.module.css';
import MoreTab from '@/app/(whitebg)/users/my/_components/Tab/More';
import TabButton from '@/components/TabButton';
import TabButtonWrapper from '@/components/TabButton/TabButtonWrapper';
import {useCurrentParams} from '@/hooks/useCurrentParams';
import {useRouter} from 'next/navigation';
import InfoTab from '@/app/(whitebg)/users/my/_components/Tab/Info';
import {useUsers} from '@/hooks/queries/useUsers';

const MyPage = () => {
  const tab = useCurrentParams('tabs', 'buy');
  const router = useRouter();
  const {data} = useUsers();
  return (
    <div className={styles.container}>
      <TabButtonWrapper>
        {['info', 'more'].map((t) => (
          <TabButton key={t} onClick={() => router.push(`?tabs=${t}`)} active={tab === t}>
            {t === 'info' ? '마이페이지' : '더보기'}
          </TabButton>
        ))}
      </TabButtonWrapper>

      <div>
        {tab === 'info' && <InfoTab data={data ? data : null} />}
        {tab === 'more' && <MoreTab name={data?.name} />}
      </div>
    </div>
  );
};

export default MyPage;
