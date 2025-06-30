'use client';

import {useUserStore} from '@/stores/userStore';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {loginKaKao} from '@/apis/user';
import styles from './Page.module.css';
import Image from 'next/image';
import Button from '@/components/Button';
import TextSlider from './_components/TextSlider';
import Footer from '@/components/Footer';
import Minari from '@/assets/minari-black.svg';
import Grass from '@/assets/image/grass.svg';
import Highlight from '@/assets/image/highlight.png';
import Person from '@/assets/image/hero_person.png';
import DescImageOne from '@/assets/image/desc_image_1.svg';
import DescImageTwo from '@/assets/image/desc_image_2.svg';
import BlackArrow from '@/assets/icon/arrow-black.svg';

export default function Page() {
  const store = useUserStore();

  const router = useRouter();

  const onClickLogin = () => {
    loginKaKao();
  };

  const onClickMinari = () => {
    router.push('/minari');
  };

  useEffect(() => {
    if (!store.isUserRegistered && store.isLoggedIn) {
      router.push('/users/join');
    }
  }, [store.isLoggedIn]);

  return (
    <>
      <div className={styles['hero__grid']}>
        <div className={styles['hero__container__wrap']}>
          <div className={styles['hero__container']}>
            <div className={styles['hero__text']}>
              <div className="display-md">
                미나리와 함께 <Image src={Minari} alt="" className="mg-left-4" width={34} />
              </div>
              <div className={styles['hero__text-split__wrap']}>
                <div className={`${styles['hero__text-everyday']} display-md`}>
                  <div>매일 한줄의 질문으로</div>
                  <Image src={Highlight} alt="" className={styles['hero__text-everyday__img']} />
                </div>
                <div className={`${styles['hero__text-grows']} display-md`}>
                  자라나는
                  <Image src={Grass} alt="" className={styles['hero__text-grows__img']} />
                </div>
              </div>
              <div className="display-md mg-bottom-20">개발자의 여정</div>
              <Button
                iconRight={BlackArrow}
                border
                onClick={store.isLoggedIn ? onClickMinari : onClickLogin}
              >
                {store.isLoggedIn ? '키워드 보러가기' : '카카오 로그인'}
              </Button>
            </div>
            <Image src={Person} alt="" className={styles['hero__image-person']} />
          </div>
        </div>
      </div>
      <TextSlider />
      <div className={styles['desc-layout__wrapper']}>
        <div className={styles['desc-layout__container']}>
          <div className={styles['desc__container']}>
            <div className="title-sm">WHO ARE WE?</div>
            <div className="display-sm mg-top-16">미래의 나를 위한 리허설</div>
            <div className={styles['desc__image__wrap']}>
              <div>
                <div
                  className={styles['desc__image-black-container']}
                  style={{alignItems: 'flex-end'}}
                >
                  <Image src={DescImageOne} alt="" />
                </div>
                <div className={`title-xs ${styles['desc__text-subtitle']}`}>Questions</div>
                <div className={`title-lg ${styles['desc__text-title']}`}>
                  <span>매일 도착하는</span>
                  <span>카테고리별 면접 질문</span>
                </div>
                <div className="body-lg">
                  <div className="txt-tertiary">면접을 준비 중이신가요?</div>
                  <div className="txt-tertiary">미나리가 설정하신 시간에 원하시는 카테고리의</div>
                  <div className="txt-tertiary">질문을 보내드려요!</div>
                </div>
              </div>
              <div>
                <div className={styles['desc__image-black-container']}>
                  <Image src={DescImageTwo} alt="" style={{maxWidth: '100%'}} />
                </div>
                <div className={`title-xs ${styles['desc__text-subtitle']}`}>Solutions</div>
                <div className={`title-lg ${styles['desc__text-title']}`}>
                  <span>질문 답변 적합도와</span>
                  <span>모범 답안 확인</span>
                </div>
                <div className="body-lg">
                  <div className="txt-tertiary">면접을 준비 중이신가요?</div>
                  <div className="txt-tertiary">미나리가 설정하신 시간에 원하시는 카테고리의</div>
                  <div className="txt-tertiary">질문을 보내드려요!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
