'use client';
import styles from './BlockDetail.module.css';
import Calendar from '@/assets/icon/calendar.svg';
import Image from 'next/image';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';
import {useDate} from '@/hooks/useDate';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import Modal from '@/components/Modal';
import {useModalStore} from '@/stores/modalStore';
import {PATH} from '@/constants/path';

const BlockDetail = () => {
  const {questionDetail, selectedBlockDate, userData} = useUserHeatmapContext();
  const {dateFormatter} = useDate();
  const {open, close} = useModalStore();

  const router = useRouter();
  const onClickResult = () => {
    router.push(`/result?quesId=${questionDetail?.questionId}`);
  };
  const handleReTry = () => {
    router.push(PATH.REHEARSAL);
    close();
  };

  const handleBuySeeds = () => {
    router.push(PATH.UESRS_SEEDS);
    close();
  };
  const onClickRetry = () => {
    open(
      <Modal
        title={userData?.seed ? '지금 답변이 아쉬우신가요?' : '앗 씨앗이 부족해요.'}
        rightButton={
          <Button onClick={userData?.seed ? handleReTry : handleBuySeeds}>
            {userData?.seed ? '다시 도전하기' : '씨앗 사러 가기'}
          </Button>
        }
      >
        <p>더 멋진 답변을 준비할 수 있어요.</p>
        <p>{userData?.seed ? '씨앗 1개가 사용돼요.' : '씨앗을 사러 가볼까요?'}</p>
      </Modal>,
    );
  };

  return (
    <>
      {selectedBlockDate != '' && questionDetail && (
        <div className={styles.container}>
          <div>
            <div className={styles.title}>
              <Image src={Calendar} alt="calendar-image" />
              <span className="txt-secondary body-sm">
                {dateFormatter(selectedBlockDate)}의 질문 ∙{' '}
                {questionDetail?.domain === 'FRONTEND' ? '프론트엔드' : '백엔드'}
              </span>
            </div>
            <div className={styles['keywords__wrap']}>
              {questionDetail?.tag.map((tag, index) => (
                <div key={index} className={styles.keyword}>
                  {tag}
                </div>
              ))}
            </div>
            <div className="txt-secondary label-lg mg-top-8">{questionDetail?.content}</div>
          </div>
          <div className={styles['buttons__wrap']}>
            <Button theme="white" border size="p-4-8" onClick={onClickResult}>
              <span className="body-md txt-secondary">결과 보러가기</span>
            </Button>
            <Button theme="black" size="p-4-8" onClick={onClickRetry}>
              <span className="body-md txt-brand">다시 시도하기</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockDetail;
