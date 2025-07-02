'use client';

import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import MenuButton from '@/assets/icon/menu.svg';
import Link from 'next/link';
import LogoImageBlack from '@/assets/logo-black.svg';
import LogoImageWhite from '@/assets/logo-white.svg';
import useTheme from '@/hooks/useTheme';
import {OUT_LINK, PATH} from '@/constants/path';
import {useUserStore} from '@/stores/userStore';

const Header = () => {
  const theme = useTheme();
  const userStore = useUserStore();

  const logo = theme === 'light' ? LogoImageBlack : LogoImageWhite;

  return (
    <div className={`${styles.wrapper} ${styles[`${theme}`]}`}>
      <div className={styles.container}>
        <Link href="/">
          <Image src={logo} alt="logo" height={40} />
        </Link>
        <div>{userStore.isUserRegistered ? <UserMenu /> : <LandingMenu />}</div>
      </div>
    </div>
  );
};

const LandingMenu = () => {
  return (
    <>
      <nav className={styles['menu-landing']}>
        <Link href="/" className="fx-center">
          <button className="label-md">서비스 소개</button>
        </Link>
        <a href={OUT_LINK.FAQ} target="_blank" rel="noopener noreferrer" className="label-md">
          문의사항
        </a>
        <a href={OUT_LINK.BLOG} target="_blank" rel="noopener noreferrer" className="label-md">
          BLOG
        </a>
      </nav>
      <nav className={styles['menu-landing-mobile']}>
        <Image src={MenuButton} alt="menu-button" />
      </nav>
    </>
  );
};

const UserMenu = () => {
  const userStore = useUserStore();

  return (
    <Link href={userStore.isUserRegistered ? PATH.MY_PAGE : ''}>
      <Image
        src={userStore.userKakaoImage}
        alt="logo"
        width={40}
        height={40}
        className={styles['user-image']}
      />
    </Link>
  );
};

export default Header;
