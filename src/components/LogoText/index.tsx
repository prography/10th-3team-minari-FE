import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/minari-black.svg';
import styles from './LogoText.module.css';

interface LogoTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  logoSize?: number;
}

const LogoText = ({children, logoSize = 20, ...props}: LogoTextProps) => {
  return (
    <div className={styles.wrapper}>
      <Image src={Logo} alt="로고" width={logoSize} height={logoSize} />
      <span {...props} className={props.className ? props.className : 'txt-primary body-md'}>
        {children}
      </span>
    </div>
  );
};

export default LogoText;
