import SelectOption from '@/components/SelectOption';
import useMedia from '@/hooks/useMedia';
import Image from 'next/image';
import ChevronDown from '@/assets/icon/chevron-down.svg';
import styles from './DeviceSelectOption.module.css';
import Camera from '@/assets/icon/camera.svg';
import {useDeviceSelect} from '@/contexts/DeviceSelectProvider';

const CameraSelectOption = () => {
  const {mediaStream} = useMedia();
  const {device, handleCameraClick} = useDeviceSelect();

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleCameraClick}>
        <div className={styles.icon}>
          <Image src={Camera} alt="icon" width={24} height={24} />
        </div>
        <Image src={ChevronDown} alt="icon" width={16} height={16} />
      </button>

      {device === 'camera' && (
        <div className={styles.setting}>
          <SelectOption
            label={<SelectOption.Label>카메라</SelectOption.Label>}
            inputField={
              <SelectOption.InputFieldDevics type="videoInput" disabled={mediaStream == null} />
            }
            options={<SelectOption.OptionsDevices type="videoInputDevices" />}
          />
        </div>
      )}
    </div>
  );
};

export default CameraSelectOption;
