import Button from '@/components/Button';
import CameraSelectOption from '../DeviceSelectOption/CameraSelectOption';
import MicSelectOption from '../DeviceSelectOption/MicSelectOption';
import ArrowBlack from '@/assets/icon/arrow-black.svg';
import styles from './OptionGroup.module.css';
import {DeviceSelectProvider} from '@/contexts/DeviceSelectProvider';
import {useRehearsal} from '@/contexts/RehearsalProvider';

const OptionGroup = () => {
  const {handleIsReharsal} = useRehearsal();

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
      <Button onClick={handleRehearsalStart} iconLeft={ArrowBlack}>
        면접 시작하기
      </Button>
    </div>
  );
};

export default OptionGroup;
