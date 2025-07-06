import React from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const Textarea = ({onChange, ...restProps}: TextareaProps) => {
  return <textarea type="" className={styles.input} {...restProps} onChange={onChange} />;
};

export default Textarea;
