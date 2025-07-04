import {InputHTMLAttributes} from 'react';
import styles from './TextInput.module.css';
import Image from 'next/image';
import errorIcon from '@/assets/icon/red-x.png';
import successIcon from '@/assets/icon/check-success.svg';

export type InputStatusType = 'success' | 'error' | 'plain';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  type?: string;
  helpMsgShow?: boolean;
  helpMsg?: string;
  status?: InputStatusType;
  required?: boolean;
}

const TextInput = ({
  label,
  disabled,
  type,
  required,
  helpMsgShow,
  helpMsg,
  onChange,
  status = 'plain',
  ...restProps
}: TextInputProps) => {
  const msgIcon = status === 'success' ? successIcon : errorIcon;
  const helpMsgFormat = (
    <span className={`body-md ${styles['help-message']} ${styles[`help-message-${status}`]}`}>
      <Image src={msgIcon} alt="" />
      {helpMsg}
    </span>
  );

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
        disabled={disabled}
        className={styles.input}
        onChange={onChange}
        {...restProps}
      />
      <div className={styles['help-message__wrap']}>{helpMsgShow && helpMsgFormat}</div>
    </div>
  );
};

export default TextInput;
