import {useModalStore} from '@/stores/modalStore';
import React from 'react';
import Modal from '..';
import Button from '@/components/Button';

interface ModalType {
  title: string;
  content: React.ReactNode;
  bgClick?: boolean;
}

interface ModalLeavePageType extends ModalType {
  left: {
    content: string;
    page: string;
  };
  right?: {
    onClick?: () => void;
  };
}

export const useErrorModal = () => {
  const {open, close} = useModalStore();

  const showErrorModalBasic = ({title, content, bgClick}: ModalType) => {
    open({
      modal: (
        <Modal title={title} rightButton={<Button onClick={close}>확인</Button>}>
          {content}
        </Modal>
      ),
      disableBackdropClick: bgClick,
    });
  };

  const showErrorModalLeavePage = ({title, content, right, left, bgClick}: ModalLeavePageType) => {
    open({
      modal: (
        <Modal
          title={title}
          leftButton={
            <a href={left.page} target="_blank" rel="noopener noreferrer">
              <Button theme="secondary" full>
                {left.content}
              </Button>
            </a>
          }
          rightButton={<Button onClick={right ? right.onClick : close}>확인</Button>}
        >
          {content}
        </Modal>
      ),
      disableBackdropClick: bgClick,
    });
  };

  return {showErrorModalBasic, showErrorModalLeavePage};
};
