import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import MenuButton from '@/assets/icon/menu.svg';
import Link from 'next/link';
import LogoImageBlack from '@/assets/logo-black.png';
import LogoImageWhite from '@/assets/logo-white.png';
import useTheme from '@/hooks/useTheme';

interface HeaderProps {
  menu: React.ReactNode;
}

const Header = ({menu}: HeaderProps) => {
  const theme = useTheme();

  const logo = theme === 'light' ? LogoImageBlack : LogoImageWhite;

  return (
    <div className={`${styles.wrapper} ${styles[`${theme}`]}`}>
      <div className={styles.container}>
        <Link href="/">
          <Image src={logo} alt="logo" height={40} />
        </Link>
        <div>{menu}</div>
      </div>
    </div>
  );
};

const LandingMenu = () => {
  return (
    <>
      <nav className={styles['menu-landing']}>
        <button className="label-md">서비스 소개</button>
        <button className="label-md">문의사항</button>
        <button className="label-md">FAQ</button>
        <button className="label-md">BLOG</button>
      </nav>
      <nav className={styles['menu-landing-mobile']}>
        <Image src={MenuButton} alt="menu-button" />
      </nav>
    </>
  );
};

const UserMenu = ({userImage}: {userImage?: string}) => {
  return (
    <Link href="/">
      <Image
        src={userImage ? userImage : ''}
        alt="logo"
        width={40}
        height={40}
        className={styles['user-image']}
      />
    </Link>
  );
};

Header.LangingMenu = LandingMenu;
Header.UserMenu = UserMenu;

export default Header;
