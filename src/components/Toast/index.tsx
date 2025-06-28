import styles from './Toast.module.css';
import Image from 'next/image';
import Minari from '@/assets/minari-black.svg';

export interface ToastProps {
  title: string;
  description?: string;
  type?: 'basic' | 'warning';
}

const Toast = ({type = 'basic', title, description}: ToastProps) => {
  return (
    <div className={`${styles.container} ${styles[type]}`}>
      <Image src={Minari} alt="" />
      <div>
        <div className="body-lg txt-primary pre">{title}</div>
        <div className="body-md txt-tertiary">{description}</div>
      </div>
    </div>
  );
};

export default Toast;
