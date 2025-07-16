'use client';

import {useModalStore} from '@/stores/modalStore';
import {useEffect} from 'react';
import Modal from './Modal';
import Button from './Button';
import {deleteCookie} from '@/utils/cookies';
import {activateUser} from '@/apis/user';
import Toast from '@/components/Toast';
import {useToastStore} from '@/stores/toastStore';

export function DeletedUserHandler() {
  const {open} = useModalStore();
  const toastStore = useToastStore();
  useEffect(() => {
    const goMain = async () => {
      localStorage.removeItem('user-storage');
      await deleteCookie('token');
      window.location.href = '/';
    };

    const fetchUserActivate = async () => {
      await activateUser()
        .then((response) => {
          if (response?.code === '200') {
            open(
              <Modal
                title="계정이 복구 되었어요"
                rightButton={<Button onClick={() => (window.location.href = '/')}>처음으로</Button>}
              >
                <p>다시 미나리를 심으러 가볼까요?</p>
              </Modal>,
            );
          }
        })
        .catch(() => {
          toastStore.setTime(2000);
          toastStore.open(
            <Toast title={'복구 실패'} description="앗 이런! 다시 한 번 시도해주세요." />,
          );
        });
    };

    const eventListener = () => {
      open(
        <Modal
          title="탈퇴된 계정이에요. 다시 복구하시겠어요?"
          leftButton={
            <Button theme="secondary" onClick={goMain}>
              취소
            </Button>
          }
          rightButton={<Button onClick={fetchUserActivate}>계속</Button>}
        ></Modal>,
        true,
      );
    };

    window.addEventListener('deletedUser', eventListener);
    return () => {
      window.removeEventListener('deletedUser', eventListener);
    };
  }, [open]);

  return null;
}
