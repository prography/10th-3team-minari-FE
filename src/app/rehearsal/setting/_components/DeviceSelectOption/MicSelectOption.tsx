import SelectOption from '@/components/SelectOption/SelectOption';
import useMedia from '@/hooks/useMedia';
import Mic from '@/assets/icon/mic.svg';
import Image from 'next/image';
import ChevronDown from '@/assets/icon/chevron-down.svg';
import styles from './DeviceSelectOption.module.css';
import SoundBar from '../SoundBar/SoundBar';
import {useDeviceSelect} from '@/contexts/DeviceSelectProvider';

const MicSelectOption = () => {
  const {mediaStream} = useMedia();
  const {device, handleMicClick} = useDeviceSelect();

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleMicClick}>
        <div className={styles.icon}>
          <Image src={Mic} alt="icon" width={24} height={24} />
        </div>
        <Image src={ChevronDown} alt="icon" width={16} height={16} />
      </button>

      {device === 'mic' && (
        <div className={styles.setting}>
          <SelectOption
            label={<SelectOption.Label>마이크</SelectOption.Label>}
            inputField={
              <SelectOption.InputFieldDevics type="audioInput" disabled={mediaStream == null} />
            }
            options={<SelectOption.OptionsDevices type="audioInputDevices" />}
          />
          <SoundBar />
        </div>
      )}
    </div>
  );
};

export default MicSelectOption;
