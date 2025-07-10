import styles from './Modal.module.css';

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  position?: 'center' | 'top';
  size?: 'sm' | 'md' | 'lg';
}

const Modal = ({
  title,
  children,
  leftButton,
  rightButton,
  position = 'center',
  size = 'lg',
}: ModalProps) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${styles.modal} ${position && styles[position]} ${size && styles[size]}`}
    >
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
