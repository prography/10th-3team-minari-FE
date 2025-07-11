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

const QRCodeModalRefund = () => {
  const id = useId();
  const {close} = useModalStore();

  const order = [
    {
      icon: Round1,
      text: '송금확인증 발급 / 송금내역 캡쳐하기',
    },
    {
      icon: Round2,
      text: 'QR코드를 스캔하고',
    },
    {
      icon: Round3,
      text: '(1)번의 사진을 보낸 후',
    },
    {
      icon: Round4,
      text: 'UUID 적어서 보내기!',
    },
  ];

  return (
    <div className={styles.position}>
      <div className={styles.wrapper}>
        <button className={styles.close_button} onClick={() => close()}>
          <Image src={X} alt="종료버튼" width={24} height={24} />
        </button>
        <span className="title-xs txt-primary">구매 취소/환불이 필요하신가요?</span>
        <span className="body-lg">구매 후 7일 이내의 미사용 씨앗만 되어요.</span>
        <Image src={QRCode} alt="QR code" width={138} height={138} />

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

export default QRCodeModalRefund;
