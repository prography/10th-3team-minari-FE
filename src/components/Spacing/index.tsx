'use client';

import React from 'react';
import styles from './Spacing.module.css';
import useTheme from '@/hooks/useTheme';

const Spacing = () => {
  const theme = useTheme();

  return <div className={`${styles.wrapper} ${styles[`${theme}`]}`} />;
};

export default Spacing;
