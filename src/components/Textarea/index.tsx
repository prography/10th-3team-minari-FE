import React from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  setValue: (value: string) => void;
}
const Textarea = ({setValue, ...restProps}: TextareaProps) => {
  return (
    <textarea
      type=""
      className={styles.input}
      {...restProps}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Textarea;
