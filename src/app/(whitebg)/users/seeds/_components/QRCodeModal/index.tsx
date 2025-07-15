import {useId} from 'react';
import styles from './QRCodeModal.module.css';
import QRCode from '@/assets/qr-code.jpeg';
import Image from 'next/image';
import X from '@/assets/icon/x.svg';
import {useModalStore} from '@/stores/modalStore';
import {ROUND_ICON} from '@/constants/roundIcon';

interface QRCodeModalProps {
  order: string[];
  uuid: string;
  title: string;
  subTitle: string;
}

const QRCodeModal = ({order, uuid, title, subTitle}: QRCodeModalProps) => {
  const id = useId();
  const {close} = useModalStore();

  const viewOrder = order.map((text, index) => ({
    icon: ROUND_ICON[index + 1],
    text,
  }));

  return (
    <div className={styles.position}>
      <div className={styles.wrapper}>
        <button className={styles.close_button} onClick={() => close()}>
          <Image src={X} alt="종료버튼" width={24} height={24} />
        </button>
        <span className="title-xs txt-primary">{title}</span>
        <span className="body-lg">{subTitle}</span>

        <div className="fx-col g-12 fx-center">
          <Image src={QRCode} alt="QR code" width={138} height={138} />

          <span className="body-sm">{`당신의 UUID: ${uuid}`}</span>
        </div>

        <ol className={styles.order_list}>
          {viewOrder.map(({icon, text}, i) => (
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
