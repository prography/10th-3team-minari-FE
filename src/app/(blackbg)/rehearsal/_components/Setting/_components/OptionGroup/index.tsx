import Button from '@/components/Button';
import CameraSelectOption from '../DeviceSelectOption/CameraSelectOption';
import MicSelectOption from '../DeviceSelectOption/MicSelectOption';
import ArrowBlack from '@/assets/icon/arrow-black.svg';
import styles from './OptionGroup.module.css';
import {DeviceSelectProvider} from '@/contexts/DeviceSelectProvider';
import {useRehearsal} from '@/contexts/RehearsalProvider';
import {useEffect, useState} from 'react';
import {useMediaStore} from '@/stores/mediaStore';

const OptionGroup = () => {
  const {handleIsReharsal} = useRehearsal();
  const {mediaStreamStatus} = useMediaStore();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (mediaStreamStatus === 'connected') {
      setDisabled(false);
    }
  }, [mediaStreamStatus]);

  const handleRehearsalStart = () => {
    handleIsReharsal();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['select-group']}>
        <DeviceSelectProvider>
          <CameraSelectOption />
          <MicSelectOption />
        </DeviceSelectProvider>
      </div>
      <Button onClick={handleRehearsalStart} iconLeft={ArrowBlack} disabled={disabled}>
        면접 시작하기
      </Button>
    </div>
  );
};

export default OptionGroup;
