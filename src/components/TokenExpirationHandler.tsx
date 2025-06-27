'use client';

import {useModalStore} from '@/stores/modalStore';
import {useEffect} from 'react';
import Modal from './Modal';
import Button from './Button';
import {deleteCookie} from '@/utils/cookies';

export function TokenExpirationHandler() {
  const {open} = useModalStore();

  useEffect(() => {
    const handleTokenExpired = async () => {
      localStorage.removeItem('user-storage');
      await deleteCookie('token');
      window.location.href = '/';
    };

    const eventListener = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const errorMessage = customEvent.detail;

      open(
        <Modal
          title="다시 로그인해주세요."
          rightButton={<Button onClick={handleTokenExpired}>확인</Button>}
        >
          {errorMessage}
        </Modal>,
        true,
      );
    };

    window.addEventListener('tokenExpired', eventListener);
    return () => {
      window.removeEventListener('tokenExpired', eventListener);
    };
  }, [open]);

  return null;
}
