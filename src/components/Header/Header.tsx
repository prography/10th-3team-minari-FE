import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import LogoImage from '@/assets/logo.png';
import MenuButton from '@/assets/icon/menu.svg';
import Link from 'next/link';

const Header = () => {
  // TODO [Header] 로그인 상태 추가
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/">
          <Image src={LogoImage} alt="logo" height={40} unoptimized />
        </Link>
        <div className={styles['menu-landing']}>
          <button className="label-md">서비스 소개</button>
          <button className="label-md">문의사항</button>
          <button className="label-md">FAQ</button>
          <button className="label-md">BLOG</button>
        </div>
        <div className={styles['menu-landing-mobile']}>
          <Image src={MenuButton} alt="menu-button" />
        </div>
      </div>
    </div>
  );
};

export default Header;
