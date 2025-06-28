'use client';

import {useToastStore} from '@/stores/toastStore';
import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import styles from './Toast.module.css';

export const ToastClient = () => {
  const {toast, isOpen, close} = useToastStore();

  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }, [isOpen]);

  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <div className={styles.wrapper} ref={toastRef}>
      <div onClick={(e) => e.stopPropagation()}>{toast}</div>
    </div>,
    document.body,
  );
};
