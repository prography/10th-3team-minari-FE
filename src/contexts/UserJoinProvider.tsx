'use client';

import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {TypeUserRegisterRequest} from '@/apis/user';
import {CheckItemType} from '@/app/users/join/page';

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
  nextButtonChecker: () => boolean;
};
const UserJoinContext = createContext<ContextType | null>(null);

export const UserJoinProvider = ({children}: {children: React.ReactNode}) => {
  const [step, setStep] = useState(0);
  const [disableNext, setDisableNext] = useState(false);

  const [joinForm, setJoinForm] = useState<TypeUserRegisterRequest>({
    email: '',
    userId: '',
    isSubscribed: false,
    emailSendTime: 'AM_08',
    studyExperienceLevel: 'EMPTY',
    workExperienceLevel: 'EMPTY',
    domain: 'EMPTY',
  });

  // 체크박스 관리
  const [checkItems, setCheckItems] = useState<Array<CheckItemType>>([
    {id: '1', value: false, label: '(필수) STT를 위한 정보 수집에 동의합니다.', required: true},
    {
      id: '2',
      value: false,
      label: '(선택) 카메라 이용을 위한 정보 저장에 동의합니다.',
      required: false,
    },
  ]);
  const checkHandler = (value: boolean, id?: string) => {
    if (id) {
      const idx = checkItems.findIndex((item) => item.id === id);
      checkItems[idx].value = value;
      setCheckItems([...checkItems]);
    }
  };
  // 약관 동의 체크박스 : 전체체크 상태관리
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [checkAllIndeterminate, setCheckAllIndeterminate] = useState<boolean>(false);
  const checkAllHandler = (value: boolean) => {
    checkItems.map((item) => (item.value = value));
    setCheckAll(value);
    setCheckAllIndeterminate(false);
  };
  useEffect(() => {
    if (checkItems.every((item) => item.value)) {
      setCheckAll(true);
      setCheckAllIndeterminate(false);
    } else if (checkItems.some((item) => item.value)) {
      setCheckAll(false);
      setCheckAllIndeterminate(true);
    } else {
      setCheckAll(false);
      setCheckAllIndeterminate(false);
    }
  }, [checkItems]);

  // [다음] 버튼 : 비활성화 처리
  const nextButtonChecker = () => {
    switch (step) {
      case 0:
        const checkRequired = checkItems.filter((item) => item.required);
        return !checkRequired.every((item) => item.value);
      case 2:
        return joinForm.email === '';
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
