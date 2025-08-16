import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/minari-black.svg';
import styles from './LogoText.module.css';

type LogoTextProps<T extends React.ElementType = 'span'> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  children: React.ReactNode;
  logoSize?: number;
};

const LogoText = <T extends React.ElementType = 'span'>({
  as,
  children,
  logoSize = 20,
  ...props
}: LogoTextProps<T>) => {
  const Component = as || 'div';

  return (
    <div className={styles.wrapper}>
      <Image src={Logo} alt="로고" width={logoSize} height={logoSize} />
      <Component {...props} className={props.className ? props.className : 'txt-primary body-md'}>
        {children}
      </Component>
    </div>
  );
};

export default LogoText;
