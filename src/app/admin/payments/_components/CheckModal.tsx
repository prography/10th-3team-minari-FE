import Button from '@/components/Button';
import Modal from '@/components/Modal';
import React from 'react';
import styles from './CheckModal.module.css';
import {RewardFormType} from '@/app/payments/page';

interface CheckModalProps {
  form: RewardFormType;
  onClickRightButton?: () => void;
  onClickLeftButton?: () => void;
}
const CheckModal = ({form, onClickRightButton, onClickLeftButton}: CheckModalProps) => {
  return (
    <Modal
      title="정보가 맞는지 확인해주세요."
      isCloseButton
      rightButton={<Button onClick={onClickRightButton}>지급</Button>}
      leftButton={
        <Button theme="secondary" onClick={onClickLeftButton}>
          취소
        </Button>
      }
    >
      <div className="fx-align-start body-lg">지급을 누르면 즉시 반영돼요.</div>
      <div className={styles['modal-contents']}>
        <div className="label-lg txt-00">리워드 지급</div>
        <div className={styles['reward-contents']}>
          <div className="body-sm">리워드 종류: 씨앗</div>
          <div className="body-sm">UUID: {form.uuid}</div>
          <div className="body-sm">씨앗 개수: {form.seed}</div>
          <div className="body-sm">지급 사유: {form.reason}</div>
        </div>
      </div>
    </Modal>
  );
};

export default CheckModal;
