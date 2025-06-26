'use client';

import {useModalStore} from '@/stores/modalStore';
import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import styles from './Model.module.css';

export const ModalClient = () => {
  const {modal, isOpen, close} = useModalStore();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      close();
    }
  };

  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <div ref={modalRef} onClick={handleClickOutside} className={styles.backdrop}>
      <div onClick={(e) => e.stopPropagation()}>{modal}</div>
    </div>,
    document.body,
  );
};
