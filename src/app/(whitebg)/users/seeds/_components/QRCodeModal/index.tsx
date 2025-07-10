import {useId} from 'react';
import styles from './QRCodeModal.module.css';
import QRCode from '@/assets/qr-code.jpeg';
import Image from 'next/image';
import X from '@/assets/icon/x.svg';
import Round1 from '@/assets/icon/round-1.svg';
import Round2 from '@/assets/icon/round-2.svg';
import Round3 from '@/assets/icon/round-3.svg';
import Round4 from '@/assets/icon/round-4.svg';
import {useModalStore} from '@/stores/modalStore';

const QRCodeModal = () => {
  const id = useId();
  const {close} = useModalStore();

  const order = [
    {
      icon: Round1,
      text: '송금 메모: ⭐️UUID⭐ 적기!',
    },
    {
      icon: Round2,
      text: '토스뱅크 1002-498-076593으로',
    },
    {
      icon: Round3,
      text: '송금 완료 화면 캡쳐하기!',
    },
    {
      icon: Round4,
      text: '위 QR 스캔하고 사진 두 개 첨부해 보내기!',
    },
  ];

  return (
    <div className={styles.position}>
      <div className={styles.wrapper}>
        <button className={styles.close_button} onClick={() => close()}>
          <Image src={X} alt="종료버튼" width={24} height={24} />
        </button>
        <span className="title-xs txt-primary">원하는 씨앗을 선택하셨나요?</span>
        <span className="body-lg">최대 1시간 이내로 씨앗을 보내드릴게요.</span>
        <Image src={QRCode} alt="QR code" width={138} height={138} />

        <span
          style={{whiteSpace: 'pre'}}
          className="label-sm txt-tertiary"
        >{`UUID: 홈 → 오른쪽 상단 [프로필 사진] \n→ 내 이름 옆 글자 (ex. 귀여운사자87)`}</span>

        <ol className={styles.order_list}>
          {order.map(({icon, text}, i) => (
            <li key={`${id}_${i}`} className={`${styles.order_item} label-md`}>
              <Image src={icon} alt="icon" aria-hidden />
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default QRCodeModal;
