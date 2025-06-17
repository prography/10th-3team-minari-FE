'use client';

import {ReactNode, useEffect} from 'react';
import styles from './LayoutWrapper.module.css';
import Header from '@/components/Header';
import {usePathname} from 'next/navigation';
import {useUserStore} from '@/stores/userStore';
import useTheme from '@/hooks/useTheme';
import {PATH} from '@/constants/path';
import useMedia from '@/hooks/useMedia';
import {useMediaStore} from '@/stores/mediaStore';

const LayoutWrapper = ({children}: {children: ReactNode}) => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const theme = useTheme();
  const {stopMedia} = useMedia();
  const {mediaStreamStatus} = useMediaStore();

  useEffect(() => {
    const isAllowedPath = pathname === '/rehearsal' || pathname === '/rehearsal/setting';

    if (!isAllowedPath && mediaStreamStatus === 'connected') {
      stopMedia();
    }
  }, [pathname, stopMedia, mediaStreamStatus]);

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
