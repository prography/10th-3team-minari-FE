import {InputHTMLAttributes} from 'react';
import styles from './TextInput.module.css';
import Image from 'next/image';
import errorIcon from '@/assets/icon/red-x.png';
import warningIcon from '@/assets/icon/yellow-x.svg';
import successIcon from '@/assets/icon/check-success.svg';

export type InputStatusType = 'success' | 'error' | 'plain' | 'warning';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  type?: string;
  helpMsgShow?: boolean;
  helpMsg?: string;
  status?: InputStatusType;
  required?: boolean;
  unit?: string;
}

const TextInput = ({
  label,
  disabled,
  type,
  required,
  helpMsgShow,
  helpMsg,
  onChange,
  status,
  unit,
  ...restProps
}: TextInputProps) => {
  const msgIcon =
    status === 'success' ? successIcon : status === 'warning' ? warningIcon : errorIcon;
  const helpMsgFormat = (
    <span className={`body-md ${styles['help-message']} ${styles[`help-message-${status}`]}`}>
      {status !== 'plain' && <Image src={msgIcon} alt="" />}
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
      <div className={styles['input__wrap']}>
        <input
          id={`input-${label}`}
          type={type ? type : 'text'}
          disabled={disabled}
          className={`${styles.input} ${styles[`input-${status}`]}`}
          onChange={onChange}
          {...restProps}
        />
        {unit && (
          <div className={styles.unit}>
            <span className="body-lg txt-tertiary">{unit}</span>
          </div>
        )}
      </div>
      <div className={styles['help-message__wrap']}>{helpMsgShow && helpMsgFormat}</div>
    </div>
  );
};

export default TextInput;
