'use client';
import {useEffect} from 'react';
import {getKakaoProfile} from '@/api/user';
import {useUserStore} from '@/stores/userStore';
import {useRouter} from 'next/navigation';
import Loader from '@/components/Loader/Loader';

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
        store.setIsLoggedIn(true);
        store.setUsername(data.name);
        store.setUserKaKaoImage(data.image);
        store.setIsUserRegistered(data.registered);

        router.push('/');
      })
      .catch((err) => console.log(err));
  }, [code]);
  return <Loader />;
};

export default KakaoRedirectPage;
