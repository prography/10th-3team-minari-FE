import RadioButton from '@/components/RadioButton';
import Image from 'next/image';
import EmailSample from '@/assets/image/email-sample.png';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {useEffect, useState} from 'react';

const JoinReceiveNotification = () => {
  const {joinForm, setIsSubscribed} = useUserJoinContext();
  const [receive, setReceive] = useState<string | number>(999);
  const onClickRadio = (value: string | number) => {
    setIsSubscribed(value === 0 ? true : false);
    setReceive(value);
  };
  useEffect(() => {
    if (joinForm.isSubscribed) {
      setReceive(0);
    } else if (joinForm.isSubscribed === false) {
      setReceive(1);
    }
  }, [joinForm.isSubscribed]);

  return (
    <div>
      <div className="fx-center">
        <Image src={EmailSample} alt="" width={320} height={380} />
      </div>
      <RadioButton
        name="subscribe-true"
        value={0}
        setValue={() => onClickRadio(0)}
        checked={receive === 0}
      >
        <span className="label-lg">네, 받아볼래요!</span>
      </RadioButton>
      <RadioButton
        name="subscribe-true"
        value={1}
        setValue={() => onClickRadio(1)}
        checked={receive === 1}
      >
        <span className="label-lg">아니요, 괜찮아요.</span>
      </RadioButton>
    </div>
  );
};

export default JoinReceiveNotification;
