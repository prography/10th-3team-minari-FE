import React from 'react';
import styles from './Keywrod.module.css';

const Keywrod = ({children}: {children: React.ReactNode}) => {
  return <div className={`${styles.wrapper} label-lg txt-brand`}>{children}</div>;
};

export default Keywrod;
