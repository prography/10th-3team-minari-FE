import React from 'react';
import styles from './RadioButton.module.css';

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  name: string;
  checked: boolean;
  setChecked: (value: boolean) => void;
  disabled?: boolean;
}

const RadioButton = ({name, children, disabled, checked, setChecked}: RadioButtonProps) => {
  return (
    <label className={styles.container}>
      {children}
      <input
        name={name}
        type="radio"
        checked={checked}
        disabled={disabled}
        className={styles.input}
        onChange={() => setChecked(true)}
      />
      <span className={styles.checkmark} />
    </label>
  );
};

export default RadioButton;
