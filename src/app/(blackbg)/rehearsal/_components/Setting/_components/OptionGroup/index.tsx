import Button from '@/components/Button';
import CameraSelectOption from '../DeviceSelectOption/CameraSelectOption';
import MicSelectOption from '../DeviceSelectOption/MicSelectOption';
import ArrowBlack from '@/assets/icon/arrow-black.svg';
import styles from './OptionGroup.module.css';
import {DeviceSelectProvider} from '@/contexts/DeviceSelectProvider';
import {useRehearsal} from '@/contexts/RehearsalProvider';
import {useEffect, useState} from 'react';
import {useMediaStore} from '@/stores/mediaStore';
import {useAnswerEligibility} from '@/hooks/queries/useAnswerEligibility';
import {useModalStore} from '@/stores/modalStore';
import {PATH} from '@/constants/path';
import Modal from '@/components/Modal';
import {useRouter} from 'next/navigation';

const OptionGroup = () => {
  const {data} = useAnswerEligibility();
  const {handleIsReharsal} = useRehearsal();
  const {mediaStreamStatus} = useMediaStore();
  const [disabled, setDisabled] = useState(true);
  const {open: opneModal, close: closeModal} = useModalStore();
  const router = useRouter();

  useEffect(() => {
    if (mediaStreamStatus === 'connected') {
      setDisabled(false);
    }
  }, [mediaStreamStatus]);

  const handleRehearsalStart = () => {
    handleIsReharsal();
  };

  const handleBuySeeds = () => {
    router.push(PATH.UESRS_SEEDS);
    closeModal();
  };

  const handleClickOpenModal = () => {
    opneModal(
      <Modal
        title={'앗 씨앗이 부족해요.'}
        rightButton={<Button onClick={handleBuySeeds}>{'씨앗 사러 가기'}</Button>}
      >
        <p>더 멋진 답변을 준비할 수 있어요.</p>
        <p>{'씨앗을 사러 가볼까요?'}</p>
      </Modal>,
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['select-group']}>
        <DeviceSelectProvider>
          <CameraSelectOption />
          <MicSelectOption />
        </DeviceSelectProvider>
      </div>
      <Button
        onClick={
          data === 'UNKNOWN' || data === 'LIMIT_REACHED'
            ? handleClickOpenModal
            : handleRehearsalStart
        }
        iconLeft={ArrowBlack}
        disabled={disabled}
      >
        면접 시작하기
      </Button>
    </div>
  );
};

export default OptionGroup;
