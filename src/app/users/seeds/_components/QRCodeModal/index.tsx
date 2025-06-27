// import Image from 'next/image';
import {useId} from 'react';
import styles from './QRCodeModal.module.css';

const QRCodeModal = () => {
  const id = useId();

  const order = [
    '송금 메모: {RanId} 적기!',
    '토스뱅크 1002-498-076593으로',
    '송금 완료 화면 캡쳐하기!',
    '위 QR 스캔하고 사진 두 개 첨부해 보내기!',
  ];

  return (
    <div className={styles.wrapper}>
      <span className="title-xs">원하는 씨앗을 선택하셨나요?</span>
      <span className="label-lg">마지막 단계에요.</span>
      <span className="body-sm">최대 1시간 이내로 씨앗을 보내드릴게요.</span>
      {/* {imageUrl ? (
        <Image src={imageUrl} alt="QR code" width={138} height={138} />
      ) : ( */}
      <div
        style={{
          width: 138,
          height: 138,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          color: '#888',
        }}
      >
        QR Placeholder
      </div>
      {/* )} */}

      <span className="body-md">{`카카오톡 > 친구추가 > 사진보내기`}</span>

      <ol className={styles.order_list}>
        {order.map((v, i) => (
          <li key={`${id}_${i}`} className="body-sm">
            {v}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default QRCodeModal;
