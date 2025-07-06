import styles from './More.module.css';
import {deleteUser} from '@/apis/user';
import Toast from '@/components/Toast';
import {useToastStore} from '@/stores/toastStore';
import Button from '@/components/Button';
import ArrowRight from '@/assets/icon/arrow-black.svg';
import {useRouter} from 'next/navigation';
import {useModalStore} from '@/stores/modalStore';
import Modal from '@/components/Modal';
import {useClearCache} from '@/hooks/useClearCache';
import packageJson from 'package.json';
import {OUT_LINK} from '@/constants/path';

const MoreTab = ({name, kakaoEmail}: {name: string | undefined; kakaoEmail: string}) => {
  const toastStore = useToastStore();
  const {open, close} = useModalStore();
  const {clearCookies, goHome} = useClearCache();
  const router = useRouter();
  const allClear = async () => {
    await clearCookies();
    goHome();
  };
  // 로그아웃
  const onClickLogout = async () => {
    toastStore.setTime(1000);
    toastStore.open(<Toast title={'로그아웃 되었어요.'} />);
    setTimeout(() => {
      allClear();
    }, 800);
  };

  // 탈퇴 클릭 >> 확인 모달
  const onClickWithdraw = async () => {
    open(
      <Modal
        title="정말 계정을 탈퇴 하시겠어요?"
        leftButton={
          <Button onClick={close} theme="secondary">
            취소
          </Button>
        }
        rightButton={<Button onClick={fetchDeleteUser}>계속</Button>}
      >
        <p>가지고 있는 모든 혜택이 사라져요.</p>
        <p>진행 이후 7일 이내에 복구가 가능해요.</p>
      </Modal>,
    );
  };

  // 탈퇴
  const fetchDeleteUser = async () => {
    await deleteUser()
      .then((response) => {
        if (response?.code === '200') {
          open(
            <Modal
              title="탈퇴가 정상적으로 완료되었습니다"
              rightButton={<Button onClick={allClear}>처음으로</Button>}
            >
              <p>그동안 미나리를 이용해주셔서 감사합니다.</p>
            </Modal>,
          );
        }
      })
      .catch(() => {
        toastStore.setTime(2000);
        toastStore.open(
          <Toast title={'탈퇴 실패'} description="앗 이런! 다시 한 번 시도해주세요." />,
        );
      });
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
          <div className="label-lg txt-primary">{kakaoEmail}</div>
        </div>
      </div>
      <div className={styles['button-section']}>
        <button className="body-lg txt-disabled" onClick={onClickLogout}>
          로그아웃
        </button>
        <button className="body-lg txt-disabled" onClick={onClickWithdraw}>
          회원탈퇴
        </button>
        {admins.includes(name ? name : '') && (
          <Button iconRight={ArrowRight} onClick={() => router.push('/admin')}>
            어드민
          </Button>
        )}
      </div>
    </div>
  );
};

export default MoreTab;
