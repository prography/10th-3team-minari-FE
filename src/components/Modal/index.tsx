import styles from './Model.module.css';

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

const Modal = ({title, children, leftButton, rightButton}: ModalProps) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
      {title != null && <span className="title-sm">{title}</span>}
      {children != null && <span className="body-lg">{children}</span>}
      <div className={styles.buttons}>
        {leftButton != null && leftButton}
        {rightButton != null && rightButton}
      </div>
    </div>
  );
};

export default Modal;
