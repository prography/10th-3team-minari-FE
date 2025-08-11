'use client';

import {loginKaKao} from '@/apis/user';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import React, {useEffect} from 'react';
import BlackArrow from '@/assets/icon/arrow-black.svg';
import {useUserStore} from '@/stores/userStore';
import {getCookie} from '@/utils/cookies';

const MainButton = () => {
  const store = useUserStore();
  const router = useRouter();

  useEffect(() => {
    getCookie('access-token').then((token) => {
      if (!token && store.username) {
        localStorage.clear();
        location.reload();
      }
    });
    if (!store.isUserRegistered && store.isLoggedIn) {
      router.push('/users/join');
    }
  }, [store.isLoggedIn]);

  const onClickLogin = () => {
    loginKaKao();
  };

  const onClickMinari = () => {
    router.push('/minari');
  };
  return (
    <Button
      iconRight={BlackArrow}
      border
      onClick={store.isLoggedIn ? onClickMinari : onClickLogin}
      full
    >
      {store.isLoggedIn ? '리허설 시작하기' : '카카오 로그인'}
    </Button>
  );
};

export default MainButton;
