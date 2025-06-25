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
}: TextInputProps) => {
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <span className="body-md">
        <Image src={redX} alt={''} />
        {helpMessage}
      </span>
    </div>
  );
};

export default TextInput;
