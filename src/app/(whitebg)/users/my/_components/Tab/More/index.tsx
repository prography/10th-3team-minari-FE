import styles from './More.module.css';
import Toast from '@/components/Toast';
import {useToastStore} from '@/stores/toastStore';
import Button from '@/components/Button';
import ArrowRight from '@/assets/icon/arrow-black.svg';
import {useRouter} from 'next/navigation';
import {useClearCache} from '@/hooks/useClearCache';
import packageJson from 'package.json';
import {OUT_LINK} from '@/constants/path';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';

const MoreTab = () => {
  const toastStore = useToastStore();
  const {userData} = useUserHeatmapContext();
  const {clearCookies, goHome} = useClearCache();
  const router = useRouter();
  const allClear = async () => {
    await clearCookies();
    goHome();
  };
  // 로그아웃
  const onClickLogout = async () => {
    toastStore.setTime(1000);
    toastStore.setTime(1000);
    toastStore.open(<Toast title={'로그아웃 되었어요.'} />);
    setTimeout(() => {
      allClear();
    }, 800);
  };

  const onClickAgreement = () => {
    window.open(OUT_LINK.약관전체);
  };

  // TODO 어드민 접근권한 로그인 시 추가
  const admins = ['김주하', '최지원'];
  return (
    <div className={styles.container}>
      <div className={styles['info-box']}>
        <div className={styles['info-item']}>
          <div className="body-lg txt-tertiary">버전 유형</div>
          <div className="label-lg txt-primary">v.{packageJson.version}</div>
        </div>
        <hr className={styles.divider} />
        <div className={styles['info-item']}>
          <div className="body-lg txt-tertiary">약관 보기</div>
          <div className="label-lg txt-primary cp" onClick={onClickAgreement}>
            더보기
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles['info-item']}>
          <div className="body-lg txt-tertiary">계정 정보</div>
          <div className="label-lg txt-primary">-</div>
        </div>
      </div>
      <div className={styles['button-section']}>
        <button className="body-lg txt-disabled" onClick={onClickLogout}>
          로그아웃
        </button>
        <button className="body-lg txt-disabled" onClick={() => router.push('/users/withdraw')}>
          회원탈퇴
        </button>
        {admins.includes(userData?.name ? userData?.name : '') && (
          <Button iconRight={ArrowRight} onClick={() => router.push('/admin')}>
            어드민
          </Button>
        )}
      </div>
    </div>
  );
};

export default MoreTab;
