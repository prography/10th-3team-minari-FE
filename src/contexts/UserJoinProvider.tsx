'use client';

import {createContext, useContext, useMemo, useState} from 'react';
import {TypeUserRegisterRequest} from '@/apis/user';
import {CheckItemType} from '@/app/(whitebg)/users/join/page';
import {useCheckbox} from '@/hooks/useCheckbox';

type ContextType = {
  step: number;
  setStep: (step: number) => void;
  disableNext: boolean;
  setDisableNext: (value: boolean) => void;
  joinForm: TypeUserRegisterRequest;
  setJoinForm: (joinForm: TypeUserRegisterRequest) => void;
  checkItems: CheckItemType[];
  checkAll: boolean;
  checkAllHandler: (value: boolean) => void;
  checkAllIndeterminate: boolean;
  checkHandler: (value: boolean, id?: string) => void;
  setIsSubscribed: (value: boolean) => void;
  nextButtonChecker: () => boolean;
};
const UserJoinContext = createContext<ContextType | null>(null);

export const UserJoinProvider = ({children}: {children: React.ReactNode}) => {
  const [step, setStep] = useState(0);
  const [disableNext, setDisableNext] = useState(false);

  const [joinForm, setJoinForm] = useState<TypeUserRegisterRequest>({
    email: '',
    userId: '',
    isSubscribed: null,
    emailSendTime: 'AM_08',
    studyExperienceLevel: 'EMPTY',
    workExperienceLevel: 'EMPTY',
    domain: 'EMPTY',
  });

  // 체크박스 관리
  const checkItemList = [
    {id: '1', value: false, label: '(필수) 서비스 개인정보 처리방침', required: true},
    {
      id: '2',
      value: false,
      label: '(필수) 서비스 이용약관',
      required: true,
    },
  ];
  const {checkAll, checkAllIndeterminate, checkItems, checkHandler, checkAllHandler} =
    useCheckbox(checkItemList);

  // 라디오버튼 관리
  const setIsSubscribed = (value: boolean) => {
    setJoinForm({...joinForm, isSubscribed: value});
  };

  // [다음] 버튼 : 비활성화 처리
  const nextButtonChecker = () => {
    switch (step) {
      case 0:
        const checkRequired = checkItems.filter((item) => item.required);
        return !checkRequired.every((item) => item.value);
      case 1:
        return joinForm.isSubscribed === null;
      case 2:
        return joinForm.email === '';
      case 3:
        return joinForm.domain === 'EMPTY' || joinForm.studyExperienceLevel === 'EMPTY';
      default:
        return false;
    }
  };

  const value = useMemo(
    () => ({
      step,
      setStep,
      disableNext,
      setDisableNext,
      joinForm,
      setJoinForm,
      checkItems,
      checkHandler,
      checkAll,
      checkAllIndeterminate,
      checkAllHandler,
      setIsSubscribed,
      nextButtonChecker,
    }),
    [step, checkItems, checkAll, checkAllIndeterminate, joinForm],
  );

  return <UserJoinContext.Provider value={value}>{children}</UserJoinContext.Provider>;
};

export const useUserJoinContext = () => {
  const context = useContext(UserJoinContext);
  if (!context) {
    throw new Error('UserJoinProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
