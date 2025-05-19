import React from 'react';
import styles from './layout.module.css';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default layout;
