'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import {useAnswerEligibility} from '@/hooks/queries/useAnswerEligibility';
import {useModalStore} from '@/stores/modalStore';
import {useUserStore} from '@/stores/userStore';
import {useRouter} from 'next/navigation';
import {useCallback, useEffect, useMemo} from 'react';

const getTodayKey = () => {
  const now = new Date();
  return `promotion_closed_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

const usePromotionsModal = () => {
  const {open, close} = useModalStore();
  const router = useRouter();
  const {data, refetch} = useAnswerEligibility();
  const {username} = useUserStore();

  const isSeedLimitReached = useMemo(() => {
    return data === 'LIMIT_REACHED' || data === 'SEED_REQUIRED';
  }, [data]);

  const promotionModal = useCallback(() => {
    const todayKey = getTodayKey();

    open({
      modal: (
        <Modal
          title={`${username}님만을 위해 준비했어요.`}
          leftButton={
            <Button
              onClick={() => {
                localStorage.setItem(todayKey, 'true');
                close();
              }}
              theme="secondary"
            >
              괜찮아요
            </Button>
          }
          rightButton={
            <Button
              onClick={() => {
                localStorage.setItem(todayKey, 'true');
                router.push('/rehearsal');
                close();
              }}
            >
              재도전하기
            </Button>
          }
        >
          <p>지금 본 면접은 어떠셨나요?</p>
          <p>다시 한 번 진행하실 수 있도록 씨앗을 드릴게요.</p>
        </Modal>
      ),
      onBackdropClick: () => localStorage.setItem(todayKey, 'true'),
    });
  }, [close, open, router]);

  useEffect(() => {
    const todayKey = getTodayKey();

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('promotion_closed_') && key !== todayKey) {
        localStorage.removeItem(key);
      }
    });

    const alreadyClosed = localStorage.getItem(todayKey);

    if (!alreadyClosed && isSeedLimitReached) {
      promotionModal();
    }
  }, [promotionModal, isSeedLimitReached]);

  useEffect(() => {
    refetch();
  }, [refetch]);
};

export default usePromotionsModal;
