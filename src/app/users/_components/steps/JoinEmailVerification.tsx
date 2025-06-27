'use client';
import styles from './JoinEmailVerification.module.css';
import TextInput from '@/components/TextInput';
import {useEffect, useState} from 'react';
import Button from '@/components/Button';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {useUserEmailVerification} from '@/hooks/queries/useUserEmailVerification';
import {useRouter} from 'next/navigation';
import {useUserEmailCodeVerification} from '@/hooks/queries/useUserEmailCodeVerification';

const JoinEmailVerification = () => {
  const {joinForm, setJoinForm} = useUserJoinContext();
  const [email, setEmail] = useState('');
  const [showVeriCode, setShowVeriCode] = useState(false);
  const router = useRouter();
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // TODO 이메일발송, 코드검증 후 안내문구 추가
  // 이메일 발송 (인증번호)
  const {refetchEmailVerification, isError} = useUserEmailVerification(email);
  const {refetchCodeVerification, code, setCode, isCodeError, isCodeSuccess} =
    useUserEmailCodeVerification();
  const onClickSendVerification = () => {
    refetchEmailVerification();
    setShowVeriCode(true);
  };
  useEffect(() => {
    if (isError) {
      window.alert('이메일 전송 에러');
      router.push('/');
    }
  }, [isError]);

  // 인증번호 검증
  const onClickConfirmVerification = () => {
    refetchCodeVerification();
  };
  useEffect(() => {
    if (isCodeError) {
      window.alert('인증번호 확인 실패');
      router.push('/');
    }
    if (isCodeSuccess) {
      setJoinForm({...joinForm, email: email});
    }
  }, [isCodeError, isCodeSuccess]);

  return (
    <div className={styles.container}>
      <div className={`${styles['input__wrap']} pd-bottom-32`}>
        <TextInput
          label="이메일을 입력해주세요"
          required={true}
          type="email"
          helpMessage="이메일을 입력하세요"
          value={email}
          setValue={setEmail}
        />
        <div className={styles['button__wrap']}>
          <Button
            theme="secondary"
            border
            disabled={!EMAIL_REGEX.test(email)}
            onClick={onClickSendVerification}
          >
            인증
          </Button>
        </div>
      </div>
      {showVeriCode && (
        <div className={`${styles['input__wrap']}`}>
          <TextInput
            label="인증번호를 입력해주세요"
            required={true}
            value={code}
            setValue={setCode}
            type="number"
          />
          <div className={styles['button__wrap']}>
            <Button theme="secondary" border onClick={onClickConfirmVerification}>
              인증
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinEmailVerification;
