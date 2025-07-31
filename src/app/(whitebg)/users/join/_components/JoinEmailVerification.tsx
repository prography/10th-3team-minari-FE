'use client';
import styles from './JoinEmailVerification.module.css';
import TextInput, {InputStatusType} from '@/components/TextInput';
import React, {useEffect, useRef, useState} from 'react';
import Button from '@/components/Button';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {useUserEmailVerification} from '@/hooks/queries/useUserEmailVerification';
import {useUserEmailCodeVerification} from '@/hooks/queries/useUserEmailCodeVerification';
import {useDate} from '@/hooks/useDate';

const JoinEmailVerification = () => {
  const {joinForm, setJoinForm} = useUserJoinContext();
  const [email, setEmail] = useState('');
  const [showVeriCode, setShowVeriCode] = useState(false);
  const [triggerTimer, setTriggerTimer] = useState(false);
  const TIMER_NUMBER = 180;
  const [timerMin, setTimerMin] = useState('03');
  const [timerSec, setTimerSec] = useState('00');
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [emailMsgShow, setEmailMsgShow] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');
  const [emailStatus, setEmailStatus] = useState<InputStatusType>('plain');

  // 이메일 발송 (인증번호)
  const {fetchEmailVerification} = useUserEmailVerification({
    email,
  });
  const {refetchCodeVerification, code, setCode} = useUserEmailCodeVerification();

  const [timer, setTimer] = useState(TIMER_NUMBER);
  const {putZero} = useDate();
  useEffect(() => {
    if (triggerTimer) {
      if (timer > 0) {
        const timeoutId = setTimeout(() => {
          manipulateTimer(timer);
        }, 1000);
        return () => clearTimeout(timeoutId);
      } else {
        showDelayedWarning();
      }
    }
  }, [timer, triggerTimer]);
  const manipulateTimer = (time: number) => {
    setTimerMin(Math.floor((time - 1) / 60).toString());
    setTimerSec((time - 1 - Math.floor((time - 1) / 60) * 60).toString());
    setTimer((time) => time - 1);
  };
  const resetTimer = () => {
    setTriggerTimer(false);
    setTimer(TIMER_NUMBER);
  };
  const showDelayedWarning = () => {
    setEmailStatus('warning');
    setEmailMsg('인증번호가 오지 않나요? 인증버튼을 다시 눌러주세요.');
    setEmailMsgShow(true);
  };
  const onClickSendVerification = () => {
    resetTimer();
    fetchEmailVerification()
      .then((response) => {
        if (response?.code === '200') {
          setShowVeriCode(true);
          setEmailStatus('success');
          setEmailMsg('인증 메일이 전송되었어요.');
          setEmailMsgShow(true);
          setTriggerTimer(true);
        }
      })
      .catch((error) => {
        setEmailStatus('error');
        if (error?.message === '이미 존재하는 이메일입니다.') {
          setEmailMsg('이미 등록된 메일은 입력할 수 없어요.');
        } else {
          setEmailMsg('앗 이런! 다시 한 번 시도해주세요.');
        }
        setEmailMsgShow(true);
      });
  };
  useEffect(() => {
    if (joinForm.email !== null && joinForm.email !== '') {
      setEmail(joinForm.email);
    }
    if (emailMsgShow) {
      setEmailMsgShow(false);
    }
  }, [email]);

  // 인증번호 검증
  const [codeMsgShow, setCodeMsgShow] = useState(false);
  const [codeMsg, setCodeMsg] = useState<string>('');
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [codeStatus, setCodeStatus] = useState<InputStatusType>();
  const onClickConfirmVerification = () => {
    setCodeSuccess(false);
    setCodeMsgShow(false);
    refetchCodeVerification()
      .then((response) => {
        if (response?.code === '200') {
          setJoinForm({...joinForm, email: email});
          setCodeSuccess(true);
          setCodeMsgShow(true);
          setCodeStatus('success');
          setCodeMsg('인증이 완료되었습니다.');
          setEmailMsgShow(false);
        }
      })
      .catch(() => {
        setCodeStatus('error');
        setCodeMsg('번호가 올바르지 않습니다');
        setCodeMsgShow(true);
      });
  };
  useEffect(() => {
    if (code?.length > 6) {
      setCodeStatus('error');
      setCodeMsg('번호형식이 올바르지 않습니다');
      setCodeMsgShow(true);
    } else {
      setCodeMsgShow(false);
    }
  }, [code]);

  const codeRef = useRef<string>('');
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
    if (email !== '') {
      if (!EMAIL_REGEX.test(email)) {
        setEmailStatus('error');
        setEmailMsg('이메일 형식으로 입력해주세요.');
        setEmailMsgShow(true);
      } else {
        setEmailStatus('success');
      }
    }
  }, [email]);

  return (
    <div className={styles.container}>
      <div className={`${styles['input__wrap']} pd-bottom-32`}>
        <div className={styles['input']}>
          <TextInput
            label="이메일을 입력해주세요"
            placeholder="ex) minari@gmail.com"
            required={true}
            value={joinForm.email && joinForm.email !== '' ? joinForm.email : email}
            onChange={(e) => setEmail(e.target.value)}
            status={emailStatus}
            helpMsgShow={emailMsgShow}
            helpMsg={emailMsg}
            disabled={joinForm.email !== null && joinForm.email !== ''}
          />
        </div>
        <div className={styles['button__wrap']}>
          <Button
            theme="secondary"
            border
            disabled={!EMAIL_REGEX.test(email) || joinForm.email !== ''}
            onClick={onClickSendVerification}
          >
            전송
          </Button>
        </div>
      </div>
      {showVeriCode && (
        <div className={`${styles['input__wrap']}`}>
          <div className={styles['input']}>
            <TextInput
              label="인증번호를 입력해주세요"
              placeholder="메일에 적힌 숫자 6자리를 입력해주세요."
              required={true}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="number"
              status={codeStatus}
              helpMsg={codeMsg}
              helpMsgShow={codeMsgShow}
              disabled={codeSuccess}
            />
            <div className={styles.timer}>
              <div className="body-lg txt-tertiary">
                {putZero(timerMin)}:{putZero(timerSec)}
              </div>
            </div>
          </div>
          <div className={styles['button__wrap']}>
            <Button
              theme="secondary"
              border
              disabled={joinForm.email !== ''}
              onClick={onClickConfirmVerification}
            >
              인증
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinEmailVerification;
