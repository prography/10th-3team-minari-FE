import React from 'react';
import styles from './TabButton.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

const TabButton = ({children, active, ...props}: ButtonProps) => {
  return (
    <button className={`${active && styles.active} ${styles.button} label-lg`} {...props}>
      {children}
    </button>
  );
};

export default TabButton;
