'use client';
import {ReactNode, useEffect, useState} from 'react';
import styles from './LayoutWrapper.module.css';
import Header from '@/components/Header';
import {usePathname} from 'next/navigation';
import {useUserStore} from '@/stores/userStore';

const LayoutWrapper = ({children}: {children: ReactNode}) => {
  const pathname = usePathname();
  const userStore = useUserStore();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Header 배경 색
  const themeColor = pathname.includes('rehearsal') ? 'dark' : 'light';

  // 랜딩 페이지는 LayoutWrapper 스타일 적용 x
  const avoidWrapper = pathname === '/' && !userStore.isLoggedIn;

  const wrapperStyle = () => {
    if (pathname.includes('rehearsal')) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  return (
    <>
      <Header
        pageLoaded={pageLoaded}
        theme={themeColor}
        isLoggedIn={userStore.isLoggedIn}
        userImage={userStore.userKakaoImage}
      />
      <div className={!avoidWrapper ? `${styles.wrapper} ${styles[wrapperStyle()]}` : ''}>
        <div className={!avoidWrapper ? styles.container : ''}>{children}</div>
      </div>
    </>
  );
};

export default LayoutWrapper;
