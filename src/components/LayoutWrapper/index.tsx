'use client';

import {ReactNode} from 'react';
import styles from './LayoutWrapper.module.css';
import Header from '@/components/Header';
import {usePathname} from 'next/navigation';
import {useUserStore} from '@/stores/userStore';
import useTheme from '@/hooks/useTheme';
import {PATH} from '@/constants/path';

const LayoutWrapper = ({children}: {children: ReactNode}) => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const theme = useTheme();

  // 랜딩 페이지는 LayoutWrapper 스타일 적용 x
  const avoidWrapper = pathname === PATH.ROOT && !userStore.isLoggedIn;

  return (
    <>
      <Header
        menu={
          userStore.isLoggedIn ? (
            <Header.UserMenu userImage={userStore.userKakaoImage} />
          ) : (
            <Header.LangingMenu />
          )
        }
      />
      <div className={!avoidWrapper ? `${styles.wrapper} ${styles[theme]}` : ''}>
        <div className={!avoidWrapper ? styles.container : ''}>{children}</div>
      </div>
    </>
  );
};

export default LayoutWrapper;
