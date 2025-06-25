import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import MenuButton from '@/assets/icon/menu.svg';
import Link from 'next/link';
import LogoImageBlack from '@/assets/logo-black.svg';
import LogoImageWhite from '@/assets/logo-white.svg';
import useTheme from '@/hooks/useTheme';
import {OUT_LINK} from '@/constants/path';

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

const openFAQLink = () => {
  window.open(OUT_LINK.FAQ);
};
const openBlog = () => {
  window.open(OUT_LINK.BLOG);
};

const LandingMenu = () => {
  return (
    <>
      <nav className={styles['menu-landing']}>
        <Link href="/" className="fx-center">
          <button className="label-md">서비스 소개</button>
        </Link>
        <button className="label-md" onClick={openFAQLink}>
          문의사항
        </button>
        <button className="label-md" onClick={openBlog}>
          BLOG
        </button>
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
