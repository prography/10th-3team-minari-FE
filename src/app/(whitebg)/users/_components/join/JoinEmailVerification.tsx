'use client';
import styles from './JoinEmailVerification.module.css';
import TextInput, {HelpMessageType} from '@/components/TextInput';
import {useEffect, useRef, useState} from 'react';
import Button from '@/components/Button';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {useUserEmailVerification} from '@/hooks/queries/useUserEmailVerification';
import {useUserEmailCodeVerification} from '@/hooks/queries/useUserEmailCodeVerification';
import {useToastStore} from '@/stores/toastStore';
import Toast from '@/components/Toast';

const JoinEmailVerification = () => {
  const {joinForm, setJoinForm} = useUserJoinContext();
  const [email, setEmail] = useState('');
  const [showVeriCode, setShowVeriCode] = useState(false);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 발송 (인증번호)
  const {refetchEmailVerification} = useUserEmailVerification(email);
  const {refetchCodeVerification, code, setCode} = useUserEmailCodeVerification();

  const [emailMsgShow, setEmailMsgShow] = useState(false);
  const [emailMsg, setEmailMsg] = useState<HelpMessageType>({message: '', type: 'success'});

  const toastStore = useToastStore();
  const openToastWarning = () => {
    if (codeRef.current?.length === 0) {
      toastStore.open(
        <Toast title={'인증번호가 오지 않나요?\n인증버튼을 다시 눌러주세요.'} type="warning" />,
      );
    }
  };
  const onClickSendVerification = () => {
    refetchEmailVerification()
      .then((response) => {
        if (response?.code === '200') {
          setShowVeriCode(true);
          setEmailMsgShow(true);
          setEmailMsg({
            type: 'success',
            message: '인증 메일이 전송되었어요.',
          });

          setTimeout(openToastWarning, 30000);
        }
      })
      .catch(() => {
        setEmailMsgShow(true);
        setEmailMsg({
          type: 'error',
          message: '앗 이런! 다시 한 번 시도해주세요.',
        });
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
  const [codeMsg, setCodeMsg] = useState<HelpMessageType>({message: '', type: 'success'});
  const [codeSuccess, setCodeSuccess] = useState(false);
  const onClickConfirmVerification = () => {
    setCodeSuccess(false);
    setCodeMsgShow(false);
    refetchCodeVerification()
      .then((response) => {
        if (response?.code === '200') {
          setJoinForm({...joinForm, email: email});
          setCodeSuccess(true);
          setCodeMsgShow(true);
          setCodeMsg({
            message: '인증이 완료되었습니다.',
            type: 'success',
          });
        }
      })
      .catch(() => {
        setCodeMsgShow(true);
        setCodeMsg({
          message: '번호가 올바르지 않습니다',
          type: 'error',
        });
      });
  };
  useEffect(() => {
    if (code?.length > 6) {
      setCodeMsgShow(true);
      setCodeMsg({
        message: '번호형식이 올바르지 않습니다',
        type: 'error',
      });
    } else {
      setCodeMsgShow(false);
    }
  }, [code]);

  const codeRef = useRef<string>('');
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={`${styles['input__wrap']} pd-bottom-32`}>
        <TextInput
          label="이메일을 입력해주세요"
          required={true}
          type="email"
          value={joinForm.email && joinForm.email !== '' ? joinForm.email : email}
          setValue={setEmail}
          patternMsg="이메일을 입력하세요"
          helpMsgShow={emailMsgShow}
          helpMsg={emailMsg}
          disabled={joinForm.email !== null && joinForm.email !== ''}
        />
        <div className={styles['button__wrap']}>
          <Button
            theme="secondary"
            border
            disabled={!EMAIL_REGEX.test(email)}
            onClick={onClickSendVerification}
          >
            전송
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
            helpMsg={codeMsg}
            helpMsgShow={codeMsgShow}
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
