import RadioButton from '@/components/RadioButton';
import Image from 'next/image';
import EmailSample from '@/assets/image/email-sample.png';

interface JoinReceiveNotificationProps {
  receive: boolean;
  setReceive: (value: boolean) => void;
}

const JoinReceiveNotification = ({receive, setReceive}: JoinReceiveNotificationProps) => {
  return (
    <div>
      <div className="fx-center">
        <Image src={EmailSample} alt="" width={320} height={380} />
      </div>
      <RadioButton name="email-radio" checked={receive} setChecked={setReceive}>
        <span className="label-lg">네, 받아볼래요!</span>
      </RadioButton>
    </div>
  );
};

export default JoinReceiveNotification;
