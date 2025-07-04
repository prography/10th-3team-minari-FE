import styles from './InputForm.module.css';

interface InputFormProps {
  children?: React.ReactNode;
  title: string;
}
const InputForm = ({title, children}: InputFormProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={`label-lg ${styles.title}`}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default InputForm;
