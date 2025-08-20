'use client';

import {useEffect} from 'react';
import {useUserStore} from '@/stores/userStore';
import {useRouter} from 'next/navigation';
import Loader from '@/components/Loader';
import {getKakaoProfile} from '@/apis/user';
import {deleteCookie, setCookie} from '@/utils/cookies';
import Modal from '@/components/Modal';
import {useModalStore} from '@/stores/modalStore';
import Button from '@/components/Button';
import {trackMixpanel} from '@/lib/mixpanelClient';

const KakaoRedirectPage = () => {
  let code = '';
  const store = useUserStore();
  const router = useRouter();
  const {open, close} = useModalStore();
  const onClickErrorModal = async () => {
    await deleteCookie('accessToken');
    close();
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
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

          setCookie('access-token', data?.accessToken);
          setCookie('refresh-token', data?.refreshToken);

          if (data?.registered) {
            trackMixpanel({
              name: '로그인',
              options: {'로그인 타입': '카카오'},
            });
            router.push('/');
          } else {
            trackMixpanel({name: '미나리 회원가입 페이지 이동'});
            router.push('/users/join');
          }
        }
      })
      .catch((e) => {
        console.log(e, '카카오 로그인 에러 발생');
        localStorage.clear();
        open({
          modal: (
            <Modal
              title={`처음 뵙는 것 같아요.\n당~시인은 누구십니까?`}
              rightButton={<Button onClick={onClickErrorModal}>나 소개하러 가기</Button>}
            />
          ),
          disableBackdropClick: true,
        });
      });
  }, [code]);
  return <Loader />;
};

export default KakaoRedirectPage;
