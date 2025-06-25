'use client';

import {useEffect} from 'react';
import {useUserStore} from '@/stores/userStore';
import {useRouter} from 'next/navigation';
import Loader from '@/components/Loader';
import {getKakaoProfile} from '@/apis/user';

const KakaoRedirectPage = () => {
  let code = '';
  const store = useUserStore();
  const router = useRouter();

  // TODO Loading UI 확정 후 수정 & 예외처리 추가
  useEffect(() => {
    code = window.location.search.split('=')[1];

    getKakaoProfile(code)
      .then((response) => {
        const data = response && response.result;
        if (data) {
          store.setUserId(String(data?.id));
          store.setIsLoggedIn(true);
          store.setUsername(data?.name);
          store.setUserKaKaoImage(data?.image);
          store.setIsUserRegistered(data?.registered);

          localStorage.setItem('token', data?.accessToken);

          if (data?.registered) {
            router.push('/');
          } else {
            router.push('/users/join');
          }
        }
      })
      .catch((e) => {
        console.log(e);
        localStorage.clear();
        window.alert('로그인 실패');
        router.push('/');
      });
  }, [code]);
  return <Loader />;
};

export default KakaoRedirectPage;
