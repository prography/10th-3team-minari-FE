import React, {useState} from 'react';
import styles from './SelectDeviceBox.module.css';

type DeviceType = 'videoInput' | 'audioInput';

interface SelectDeviceBoxProps {
  type: DeviceType;
  deviceList: MediaDeviceInfo[] | undefined;
  selected: MediaDeviceInfo | undefined;
  onSelect: (type: DeviceType, device: MediaDeviceInfo) => void;
}

const SelectDeviceBox = ({type, deviceList, selected, onSelect}: SelectDeviceBoxProps) => {
  const [open, setOpen] = useState(false);

  const handleItemClick = (device: MediaDeviceInfo) => {
    onSelect(type, device);
    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={() => setOpen((prev) => !prev)} className={styles.selected}>
        {selected?.label ?? `${type === 'videoInput' ? '카메라' : '마이크'}를 선택하세요`}
      </button>
      {open && deviceList && (
        <ul className={styles.options}>
          {deviceList.map((device) => (
            <li key={device.deviceId} onClick={() => handleItemClick(device)}>
              {device.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDeviceBox;
