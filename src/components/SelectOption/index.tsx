import {SelectOptionProvider, useSelectOption} from '@/contexts/SelectOptionProvider';
import {useDeviceStore} from '@/stores/devicsStore';
import styles from './SelectOption.module.css';
import ChevronDown from '@/assets/icon/chevron-down.svg';
import Check from '@/assets/icon/check.svg';
import Image from 'next/image';
import {Fragment} from 'react';

export type OptionType = {id: string | number; option: string};

interface SelectOptionProps {
  label?: React.ReactNode;
  inputField: React.ReactNode;
  options: React.ReactNode;
}

interface LabelProps {
  children: React.ReactNode;
}

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

interface OptionsProps {
  options: OptionType[];
  selectOption: OptionType;
  handleClick: (id: string | number) => void;
}

interface InputFieldDevicsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'videoInput' | 'audioInput';
}

const SelectOption = ({label, inputField, options}: SelectOptionProps) => {
  return (
    <SelectOptionProvider>
      <div className={styles.wrapper}>
        {label != null ? <>{label}</> : null}
        {inputField}
        {options}
      </div>
    </SelectOptionProvider>
  );
};

const Label = ({children}: LabelProps) => {
  return <span className={`${styles.label} label-lg`}>{children}</span>;
};

const InputField = ({...restProps}: InputFieldProps) => {
  const {handleOpen} = useSelectOption();

  return (
    <div onClick={handleOpen}>
      <input readOnly {...restProps} />
    </div>
  );
};

/**
 * 옵션으로 받는 props는 추후에 사용시에 사용처에 맞게 수정하셔도 됩니다.
 */
const Options = ({options, selectOption, handleClick}: OptionsProps) => {
  const {open, handleClose} = useSelectOption();

  const handleItemClick = (id: string | number) => {
    handleClick(id);
    handleClose();
  };

  return (
    <>
      {open && (
        <ul className={styles.options}>
          {options.map(({id, option}) => (
            <li key={id} onClick={() => handleItemClick(id)}>
              {id === selectOption.id ? (
                <Image src={Check} alt="icon" width={16} height={24} />
              ) : (
                <div className="spacing" />
              )}
              <span className={`label-lg`}>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const InputFieldDevics = ({type, disabled, ...restProps}: InputFieldDevicsProps) => {
  const {selectDevice} = useDeviceStore();
  const {handleOpen} = useSelectOption();

  const defaultLabel = type === 'videoInput' ? '카메라를 선택하세요' : '마이크를 선택하세요';

  return (
    <div
      className={`${styles.input_wrapper} ${disabled && styles.disabled}`}
      onClick={disabled ? undefined : handleOpen}
    >
      <input
        className={`${styles.input} body-lg`}
        readOnly
        placeholder={defaultLabel}
        value={selectDevice[type]?.label}
        disabled={disabled}
        {...restProps}
      />
      <Image src={ChevronDown} alt="icon" width={24} height={24} />
    </div>
  );
};

const OptionsDevices = ({type}: {type: 'videoInputDevices' | 'audioInputDevices'}) => {
  const {devices, selectDevice, setSelectDevice} = useDeviceStore();
  const {handleClose, open} = useSelectOption();

  const selectDevicsType = type === 'videoInputDevices' ? 'videoInput' : 'audioInput';

  const handleItemClick = (device: MediaDeviceInfo) => {
    setSelectDevice(selectDevicsType, device);

    handleClose();
  };

  const selectDeviceId = selectDevice[selectDevicsType]?.deviceId;

  const selectedLi = (device: MediaDeviceInfo) => {
    return (
      <li
        className={`${styles.selected} ${styles.item}`}
        key={device.deviceId}
        onClick={() => handleItemClick(device)}
      >
        <Image src={Check} alt="icon" width={16} height={24} />
        <span className={`label-lg`}>{device.label}</span>
      </li>
    );
  };

  const unSelectedLi = (device: MediaDeviceInfo) => {
    return (
      <li
        className={`${styles.unselected} ${styles.item}`}
        key={device.deviceId}
        onClick={() => handleItemClick(device)}
      >
        <div className={styles.spacing} />
        <span className={`label-lg`}>{device.label}</span>
      </li>
    );
  };

  return (
    <>
      {open && devices && (
        <ul className={styles.options}>
          {devices[type].map((device) => (
            <Fragment key={device.deviceId}>
              {selectDeviceId === device.deviceId ? (
                <>{selectedLi(device)}</>
              ) : (
                <>{unSelectedLi(device)}</>
              )}
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
};

SelectOption.Label = Label;
SelectOption.InputField = InputField;
SelectOption.Options = Options;
SelectOption.OptionsDevices = OptionsDevices;
SelectOption.InputFieldDevics = InputFieldDevics;

export default SelectOption;
