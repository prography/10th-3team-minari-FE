'use client';
import styles from './JoinEmailVerification.module.css';
import TextInput from '@/components/TextInput';
import {useEffect, useState} from 'react';
import Button from '@/components/Button';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {useUserEmailVerification} from '@/hooks/queries/useUserEmailVerification';
import {useUserEmailCodeVerification} from '@/hooks/queries/useUserEmailCodeVerification';

const JoinEmailVerification = () => {
  const {joinForm, setJoinForm} = useUserJoinContext();
  const [email, setEmail] = useState('');
  const [showVeriCode, setShowVeriCode] = useState(false);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 발송 (인증번호)
  const {refetchEmailVerification} = useUserEmailVerification(email);
  const {refetchCodeVerification, code, setCode} = useUserEmailCodeVerification();

  const [emailSent, setEmailSent] = useState(false);
  const [emailErrorMsgShow, setEmailErrorMsgShow] = useState(false);
  const onClickSendVerification = () => {
    setEmailSent(false);
    setEmailErrorMsgShow(false);
    refetchEmailVerification()
      .then((response) => {
        if (response?.code === '200') {
          setShowVeriCode(true);
          setEmailSent(true);
        }
      })
      .catch(() => {
        setEmailErrorMsgShow(true);
      });
  };
  useEffect(() => {
    if (joinForm.email !== null && joinForm.email !== '') {
      setEmail(joinForm.email);
    }
    if (emailErrorMsgShow) {
      setEmailErrorMsgShow(false);
    }
  }, [email]);

  // 인증번호 검증
  const [codeErrorMsg, setCodeErrorMsg] = useState('');
  const [codeErrorMsgShow, setCodeErrorMsgShow] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const onClickConfirmVerification = () => {
    setCodeSuccess(false);
    refetchCodeVerification()
      .then((response) => {
        if (response?.code === '200') {
          setJoinForm({...joinForm, email: email});
          setCodeSuccess(true);
        }
      })
      .catch(() => {
        setCodeErrorMsg('번호가 올바르지 않습니다');
        setCodeErrorMsgShow(true);
      });
  };
  useEffect(() => {
    if (code?.length > 6) {
      setCodeErrorMsg('번호형식이 올바르지 않습니다');
      setCodeErrorMsgShow(true);
    } else {
      setCodeErrorMsgShow(false);
    }
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={`${styles['input__wrap']} pd-bottom-32`}>
        <TextInput
          label="이메일을 입력해주세요"
          required={true}
          type="email"
          errorMsg="발송 에러"
          errorMsgShow={emailErrorMsgShow}
          value={joinForm.email && joinForm.email !== '' ? joinForm.email : email}
          setValue={setEmail}
          patternMsg="이메일을 입력하세요"
          helpMsg="메일이 발송되었어요"
          helpMsgShow={emailSent}
          disabled={joinForm.email !== null && joinForm.email !== ''}
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
            errorMsg={codeErrorMsg}
            errorMsgShow={codeErrorMsgShow}
            helpMsg="인증이 완료되었어요"
            helpMsgShow={codeSuccess}
            disabled={codeSuccess}
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
