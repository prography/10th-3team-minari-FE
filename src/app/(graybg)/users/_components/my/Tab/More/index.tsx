'use client';
import styles from './More.module.css';
import {deleteUser} from '@/apis/user';
import Toast from '@/components/Toast';
import {useToastStore} from '@/stores/toastStore';
import {deleteCookie} from '@/utils/cookies';

const MoreTab = () => {
  const toastStore = useToastStore();
  const navigateHome = () => {
    window.location.href = '/';
  };

  const onClickLogout = async () => {
    toastStore.setTime(1000);
    toastStore.open(<Toast title={'로그아웃 되었어요.'} />);
    setTimeout(async () => {
      localStorage.removeItem('user-storage');
      await deleteCookie('access-token');
      await deleteCookie('refresh-token');
      navigateHome();
    }, 800);
  };
  const onClickWithdraw = async () => {
    await deleteUser()
      .then((response) => {
        if (response?.code === '200') {
          toastStore.setTime(2000);
          toastStore.open(
            <Toast
              title={'탈퇴가 완료되었어요'}
              description="그동안 미나리를 사랑해주셔서 감사합니다."
            />,
          );
          setTimeout(async () => {
            localStorage.removeItem('user-storage');
            await deleteCookie('access-token');
            await deleteCookie('refresh-token');
            navigateHome();
          }, 1500);
        }
      })
      .catch(() => {
        toastStore.setTime(2000);
        toastStore.open(
          <Toast title={'탈퇴 실패'} description="앗 이런! 다시 한 번 시도해주세요." />,
        );
      });
  };
  return (
    <div className={styles['button-section']}>
      <button className="body-lg txt-disabled" onClick={onClickLogout}>
        로그아웃
      </button>
      <button className="body-lg txt-disabled" onClick={onClickWithdraw}>
        회원탈퇴
      </button>
    </div>
  );
};

export default MoreTab;
