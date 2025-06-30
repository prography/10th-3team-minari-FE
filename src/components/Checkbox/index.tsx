import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  children?: React.ReactNode;
  indeterminate?: boolean;
  setIndeterminate?: (value: boolean) => void;
  disabled?: boolean;
  checked: boolean;
  setChecked?: (value: boolean) => void;
  onChangeCheck?: (value: boolean, id?: string) => void;
  required?: boolean;
}

const Checkbox = ({
  id,
  children,
  checked,
  setChecked,
  onChangeCheck,
  disabled,
  indeterminate,
  required,
}: CheckboxProps) => {
  const onChangeCheckbox = () => {
    if (onChangeCheck) {
      // 체크박스 여러개 일때
      onChangeCheck(!checked, id && id);
    }
    if (setChecked) {
      // 체크박스 한개일때
      setChecked(!checked);
    }
  };
  return (
    <div className={styles.wrapper}>
      <label className={styles.container}>
        <span className="label-lg">{children}</span>
        <input
          id={id}
          className={styles.input}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChangeCheckbox}
        />
        <span className={indeterminate ? styles['checkmark-indeterminate'] : styles.checkmark}>
          {indeterminate && (
            <span className={styles.indeterminate}>
              <hr />
            </span>
          )}
        </span>
      </label>
      {required && <span className="txt-danger mg-left-4">*</span>}
    </div>
  );
};

export default Checkbox;
