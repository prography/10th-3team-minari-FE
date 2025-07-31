import styles from './Page.module.css';
import Image from 'next/image';
import TextSlider from './_components/TextSlider';
import Minari from '@/assets/minari-black.svg';
import Grass from '@/assets/image/grass.svg';
import Highlight from '@/assets/image/highlight.png';
import Person from '@/assets/image/hero_person.png';
import DescImageOne from '@/assets/image/desc_image_1.svg';
import DescImageTwo from '@/assets/image/desc_image_2.svg';
import DescImageThree from '@/assets/image/desc_image_3.svg';
import MainButton from './_components/MainButton';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '미래의 나를 위한 리허설',
};

export default function Page() {
  return (
    <>
      <div className={styles['hero__grid']}>
        <div className={styles['hero__container__wrap']}>
          <div className={styles['hero__container']}>
            <div className={styles['hero__text']}>
              <h1
                className="display-md txt-primary"
                style={{display: 'flex', alignItems: 'center'}}
              >
                미나리와 함께
                <Image src={Minari} alt="" className="mg-left-4" width={34} />
              </h1>
              <div className={styles['hero__text-split__wrap']}>
                <div className={`${styles['hero__text-everyday']} display-md`}>
                  <div className="txt-primary">매일 한줄의 질문으로</div>
                  <Image src={Highlight} alt="" className={styles['hero__text-everyday__img']} />
                </div>
                <div className={`${styles['hero__text-grows']} display-md txt-primary`}>
                  자라나는
                  <Image src={Grass} alt="" className={styles['hero__text-grows__img']} />
                </div>
              </div>
              <div className="display-md mg-bottom-20">개발자의 여정</div>
              <MainButton />
            </div>
            <Image src={Person} alt="" className={styles['hero__image-person']} width={407} />
          </div>
        </div>
      </div>
      <TextSlider />
      <div className={styles['desc-layout__wrapper']}>
        <div className={styles['desc-layout__container']}>
          <div className={styles['desc__container']}>
            <div className="title-sm">WHO ARE WE?</div>
            <div className={styles.seo}>
              리허설, 면접, 기술면접, 개발자 기술면접, 프론트엔드, 백엔드, 기술질문
            </div>
            <h2 className="display-sm">미래의 나를 위한 리허설</h2>
            <div className={styles['desc__image__wrap']}>
              <div className={styles['desc__image__container']}>
                <div
                  className={styles['desc__image-black-container']}
                  style={{alignItems: 'flex-end'}}
                >
                  <Image src={DescImageOne} alt="" />
                </div>
                <div className={styles['desc__image__contents']}>
                  <div className={`title-xs ${styles['desc__text-subtitle']}`}>Questions</div>
                  <div className={`title-lg ${styles['desc__text-title']}`}>
                    <span>매일 도착하는</span>
                    <span>카테고리별 면접 질문</span>
                  </div>
                  <div className="body-lg">
                    <div className="txt-tertiary">
                      실제 면접에서 자주 출제되는 문제가 궁금하다면?
                    </div>
                    <div className="txt-tertiary">
                      미나리가 매일 프론트엔드, 백엔드 기술 면접 질문을 보내드려요!
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles['desc__image__container-reverse']}>
                <div className={styles['desc__image-black-container']}>
                  <Image src={DescImageTwo} alt="" style={{maxWidth: '100%'}} />
                </div>
                <div className={styles['desc__image__contents']}>
                  <div className={`title-xs ${styles['desc__text-subtitle']}`}>Solutions</div>
                  <div className={`title-lg ${styles['desc__text-title']}`}>
                    <span>실전 같이 생생한</span>
                    <span>모의 면접 환경</span>
                  </div>
                  <div className="body-lg">
                    <div className="txt-tertiary">실제 화상 면접처럼 카메라와 마이크를 키고,</div>
                    <div className="txt-tertiary">내 모습을 직접 보면서 기술질문에 답해요.</div>
                  </div>
                </div>
              </div>

              <div className={styles['desc__image__container']}>
                <div className={styles['desc__image-black-container']}>
                  <Image src={DescImageThree} alt="" style={{maxWidth: '100%'}} />
                </div>
                <div className={styles['desc__image__contents']}>
                  <div className={`title-xs ${styles['desc__text-subtitle']}`}>Solutions</div>
                  <div className={`title-lg ${styles['desc__text-title']}`}>
                    <span>나의 답변</span>
                    <span>& 모범 답안 확인</span>
                  </div>
                  <div className="body-lg">
                    <div className="txt-tertiary">내가 말한 답변을 눈으로 확인하고,</div>
                    <div className="txt-tertiary">기술 질문을 한 군데에서 모아볼 수 있어요.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fx-center mg-bottom-80">
            <MainButton />
          </div>
        </div>
      </div>
    </>
  );
}
