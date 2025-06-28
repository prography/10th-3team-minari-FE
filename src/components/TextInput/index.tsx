import {InputHTMLAttributes} from 'react';
import styles from './TextInput.module.css';
import Image from 'next/image';
import redX from '@/assets/icon/red-x.png';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  type?: string;
  errorMsgShow?: boolean;
  errorMsg?: string;
  patternMsg?: string;
  helpMsgShow?: boolean;
  helpMsg?: string;
  required?: boolean;
}

const TextInput = ({
  value,
  setValue,
  placeholder,
  label,
  disabled,
  type,
  patternMsg,
  errorMsgShow,
  errorMsg,
  required,
  helpMsgShow,
  helpMsg,
}: TextInputProps) => {
  const emailPattern = '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{1,}$';
  const errorMsgFormat = (
    <span className={`body-md ${styles['error-message']}`}>
      <Image src={redX} alt={''} />
      <span>{errorMsg}</span>
    </span>
  );
  const helpMsgFormat = <span className={`body-md ${styles['confirm-message']}`}>V {helpMsg}</span>;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={`input-${label}`} className="label-lg">
        <div className="fx mg-bottom-8">
          {label}
          {required && <div className="txt-danger mg-left-4">*</div>}
        </div>
      </label>
      <input
        id={`input-${label}`}
        type={type ? type : 'text'}
        pattern={type === 'email' ? emailPattern : ''}
        disabled={disabled}
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <span className={`body-md ${styles.message}`}>
        <Image src={redX} alt={''} />
        {patternMsg}
      </span>
      {errorMsgShow && errorMsgFormat}
      {helpMsgShow && helpMsgFormat}
    </div>
  );
};

export default TextInput;
