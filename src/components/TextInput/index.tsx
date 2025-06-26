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
  helpMessage?: string;
  required?: boolean;
  confirmMessage?: string;
  confirmMessageShow?: boolean;
}

const TextInput = ({
  value,
  setValue,
  placeholder,
  label,
  disabled,
  type,
  helpMessage,
  required,
  confirmMessage,
  confirmMessageShow,
}: TextInputProps) => {
  const emailPattern = '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{1,}$';
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
        {helpMessage}
      </span>
      <div
        className={`body-md ${confirmMessageShow ? styles['confirm-message'] : styles['confirm-message__hide']}`}
      >
        {confirmMessageShow ? `V ${confirmMessage}` : ''}
      </div>
    </div>
  );
};

export default TextInput;
