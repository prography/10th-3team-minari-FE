import React, {useState} from 'react';
import styles from './SelectDeviceBox.module.css';
import {useDeviceStore, type Device} from '@/stores/devicsStore';

interface SelectDeviceBoxProps {
  type: Device;
}

const DevicesKey = {
  videoInput: 'videoInputDevices',
  audioInput: 'audioInputDevices',
} as const;

const SelectDeviceBox = ({type}: SelectDeviceBoxProps) => {
  const {devices, selectDevice, setSelectDevice} = useDeviceStore();
  const [open, setOpen] = useState(false);

  const handleItemClick = (device: MediaDeviceInfo) => {
    setSelectDevice(type, device);
    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={() => setOpen((prev) => !prev)} className={styles.selected}>
        {selectDevice[type]?.label ?? `${type === 'videoInput' ? '카메라' : '마이크'}를 선택하세요`}
        {type === 'audioInput' && ' (필수)'}
      </button>
      {open && devices && (
        <ul className={styles.options}>
          {devices[DevicesKey[type]].map((device) => (
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
