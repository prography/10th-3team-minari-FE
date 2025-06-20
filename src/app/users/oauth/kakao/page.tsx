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
        if (!response.ok) {
          throw new Error(response.status.toString());
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.code === '200') {
          store.setIsLoggedIn(true);
          store.setUsername(data.result.name);
          store.setUserKaKaoImage(data.result.image);
          store.setIsUserRegistered(data.result.registered);

          router.push('/');
        } else {
          throw new Error();
        }
      })
      .catch((err) => console.log(err));
  }, [code]);
  return <Loader />;
};

export default KakaoRedirectPage;
