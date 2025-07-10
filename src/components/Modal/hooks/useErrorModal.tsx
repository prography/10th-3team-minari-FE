import {useModalStore} from '@/stores/modalStore';
import React from 'react';
import Modal from '..';
import Button from '@/components/Button';

export const useErrorModal = () => {
  const {open, close} = useModalStore();

  const showErrorModalBasic = (title: string, content: React.ReactNode, right?: string) => {
    open(
      <Modal title={title} rightButton={<Button onClick={close}>{right ? right : '확인'}</Button>}>
        {content}
      </Modal>,
    );
  };

  const showErrorModalLeavePage = (
    title: string,
    content: React.ReactNode,
    right: {
      content: string;
      page: string;
    },
    left?: string,
  ) => {
    open(
      <Modal
        title={title}
        leftButton={
          <Button theme="secondary" onClick={close}>
            {left ? left : '확인'}
          </Button>
        }
        rightButton={
          <a href={right.page} target="_blank" rel="noopener noreferrer">
            <Button full>{right.content}</Button>
          </a>
        }
      >
        {content}
      </Modal>,
    );
  };

  return {showErrorModalBasic, showErrorModalLeavePage};
};
