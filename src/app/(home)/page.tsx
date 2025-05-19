'use client';
import LandingPage from '@/app/(home)/_components/LandingPage';
import {useUserStore} from '@/stores/userStore';
import MainPage from '@/app/(home)/_components/MainPage';
import {useEffect, useState} from 'react';

export default function Page() {
  const store = useUserStore();
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setPageLoaded(true);
  }, [store.isLoggedIn]);
  return <>{pageLoaded && (store.isLoggedIn ? <MainPage /> : <LandingPage />)}</>;
}
