'use client';
import styles from './More.module.css';
import {deleteUser} from '@/apis/user';
import Toast from '@/components/Toast';
import {useToastStore} from '@/stores/toastStore';
import Button from '@/components/Button';
import ArrowRight from '@/assets/icon/arrow-black.svg';
import {useRouter} from 'next/navigation';
import {useModalStore} from '@/stores/modalStore';
import React from 'react';
import Modal from '@/components/Modal';
import {useClearCache} from '@/hooks/useClearCache';

const MoreTab = () => {
  const toastStore = useToastStore();
  const router = useRouter();
  const {open, close} = useModalStore();
  const {clearCookies, goHome} = useClearCache();
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

  return (
    <div className={styles['button-section']}>
      <button className="body-lg txt-disabled" onClick={onClickLogout}>
        로그아웃
      </button>
      <button className="body-lg txt-disabled" onClick={onClickWithdraw}>
        회원탈퇴
      </button>
      <Button iconRight={ArrowRight} onClick={() => router.push('/admin')}>
        어드민
      </Button>
    </div>
  );
};

export default MoreTab;
