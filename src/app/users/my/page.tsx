'use client';
import styles from './page.module.css';
import {useUserStore} from '@/stores/userStore';
import Heatmap from 'src/app/users/_components/my/Heatmap';

const MyPage = () => {
  const userStore = useUserStore();
  return (
    <div className={styles.container}>
      <div>탭 영역</div>
      <div className="mg-top-24">프로필 영역</div>
      <div className="mg-top-24 title-sm">{userStore.username}님의 미나리밭</div>
      <div className="body-md">
        내가 심은 날의 미나리를 클릭해서 나의 리허설 히스토리를 확인해요.
      </div>
      <div className="mg-top-20">탭 영역2</div>
      <div>
        히트맵 <br />
        <br />
        <Heatmap />
      </div>
    </div>
  );
};

export default MyPage;
