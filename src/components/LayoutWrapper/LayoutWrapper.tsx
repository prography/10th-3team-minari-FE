import {ReactNode} from 'react';
import styles from './LayoutWrapper.module.css';

const LayoutWrapper = ({children}: {children: ReactNode}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default LayoutWrapper;
