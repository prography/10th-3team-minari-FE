'use client';
import LandingPage from '@/app/(home)/_components/LandingPage';
import {useUserStore} from '@/stores/userStore';
import MainPage from '@/app/(home)/_components/MainPage';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Page() {
  const store = useUserStore();
  const [pageLoaded, setPageLoaded] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setPageLoaded(true);

    if (!store.isUserRegistered && store.isLoggedIn) {
      router.push('/users/join');
    }
  }, [store.isLoggedIn]);

  return <>{pageLoaded && (store.isLoggedIn ? <MainPage /> : <LandingPage />)}</>;
}
