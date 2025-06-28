import React from 'react';
import styles from './RadioButton.module.css';

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  name: string;
  checked?: boolean;
  setChecked?: (value: boolean) => void;
  value: string | number;
  setValue: (value: string | number) => void;
  disabled?: boolean;
}

const RadioButton = ({name, children, value, setValue, disabled, checked}: RadioButtonProps) => {
  return (
    <label className={styles.container}>
      {children}
      <input
        name={name}
        type="radio"
        value={value}
        checked={checked}
        disabled={disabled}
        className={styles.input}
        onChange={() => setValue(value)}
      />
      <span className={styles.checkmark} />
    </label>
  );
};

export default RadioButton;
