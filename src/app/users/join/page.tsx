'use client';
import React, {useEffect} from 'react';
import JoinAgreement from '@/app/users/_components/steps/JoinAgreement';
import JoinReceiveNotification from '@/app/users/_components/steps/JoinReceiveNotification';
import JoinEmailVerification from '@/app/users/_components/steps/JoinEmailVerification';
import JoinExperience from '@/app/users/_components/steps/JoinExperience';
import {useUserJoin} from '@/hooks/queries/useUserJoin';
import {useRouter} from 'next/navigation';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import JoinPageTitle from '@/app/users/_components/ui/JoinPageTitle';
import styles from './page.module.css';
import Button from '@/components/Button';
import ArrowLeft from '@/assets/icon/arrow-left.svg';
import ArrowRight from '@/assets/icon/arrow-black.svg';
import {useUserStore} from '@/stores/userStore';
import JoinCompleted from '@/app/users/_components/steps/JoinCompleted';
import {useModalStore} from "@/stores/modalStore";
import Modal from '@/components/Modal';

/*
 * 회원 가입
 * step 00. 약관 동의
 * step 01. 메일 수신 동의
 * step 02-1. 이메일 인증
 * step 02-2. 이메일 인증 확인
 * step 03. 연차/파트 선택
 * */
const JoinPage = () => {
  const userStore = useUserStore();
  const {step, setStep, nextButtonChecker, joinForm} = useUserJoinContext();

  // 사용자 등록 api 호출
  const {setShouldFetch, setBody, isSuccess, isError} = useUserJoin();
  const {open} = useModalStore();

  // [이전], [다음] 버튼 페이지 넘기기
  const onClickGoNext = async () => {
    if (step === 1 && joinForm.isSubscribed) {
      setStep(2);
    } else if (step === 1 && !joinForm.isSubscribed) {
      setStep(3);
    } else if (step === 3) {
      // TODO jwt 적용 후 useId 삭제
      const userData = {
        ...joinForm,
        email: joinForm.isSubscribed ? joinForm.email : null,
        userId: userStore.userId,
        workExperienceLevel: joinForm.studyExperienceLevel,
      };

      // user 등록 api 호출
      setBody(userData);
      setShouldFetch(true);
    } else {
      setStep(step + 1);
    }
  };

  const goNextButton = (
    <Button iconRight={ArrowRight} onClick={onClickGoNext} disabled={nextButtonChecker()}>
      다음
    </Button>
  );

  const onClickGoBack = () => {
    if (step === 3 && !joinForm.isSubscribed) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };
  const goBackButton = (
    <Button theme="secondary" iconLeft={ArrowLeft} onClick={onClickGoBack}>
      이전
    </Button>
  );

  const router = useRouter();
  const goHomeButton = (
    <Button iconRight={ArrowRight} onClick={() => router.push('/')}>
      첫 미나리 심으러 가기
    </Button>
  );

  useEffect(() => {
    if (isSuccess) {
      userStore.setUserEmail(joinForm.email ? joinForm.email : '');
      userStore.setUserDomain(joinForm.domain);
      userStore.setIsUserRegistered(true);
      setStep(4);
    }
    if (isError) {
      open(
        <Modal
          title="회원가입 실패"
          rightButton={
            <Button
              onClick={() => {
                location.reload();
              }}
            >
              확인
            </Button>
          }
        />,
        true,
      );
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div>
        <JoinPageTitle step={step} />
        <div className={styles.contents} style={{marginTop: step === 1 ? 10 : ''}}>
          {step === 0 && <JoinAgreement />}
          {step === 1 && <JoinReceiveNotification />}
          {step === 2 && <JoinEmailVerification />}
          {step === 3 && <JoinExperience />}
          {step === 4 && (
            <JoinCompleted
              name={userStore.username}
              email={userStore.userEmail}
              domain={userStore.userDomain}
            />
          )}
        </div>
        <div className={styles.buttons}>
          {step > 0 && step < 4 && goBackButton}
          {step === 4 ? goHomeButton : goNextButton}
        </div>
      </div>
    </>
  );
};

export default JoinPage;

export interface CheckItemType {
  id: string;
  value: boolean;
  label: string;
  required: boolean;
}
