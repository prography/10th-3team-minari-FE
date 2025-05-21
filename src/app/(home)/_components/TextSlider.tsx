'use client';
import styles from './TextSlider.module.css';
import MinariBlack from '@/assets/minari-black.svg';
import Image from 'next/image';
import {useEffect, useState} from 'react';

const TextSlider = () => {
  // viewport 크기에 따라 텍스트 길이 조정
  const [nodeCopyCount, setNodeCopyCount] = useState(1);
  useEffect(() => {
    if (visualViewport && document) {
      const element = document.getElementById('child');
      if (visualViewport.width >= 700) {
        setNodeCopyCount(Math.ceil((visualViewport.width - 1000) / 700) + 2);
        for (let i = 0; i < nodeCopyCount; i++) {
          const newNode1 = element?.cloneNode(true);
          const newNode2 = element?.cloneNode(true);
          if (newNode1 && newNode2) {
            document?.getElementById('parent')?.lastChild?.after(newNode1);
            document?.getElementById('parent-2')?.lastChild?.after(newNode2);
          }
        }
      }
    }
  }, [nodeCopyCount]);

  const textFirst = () => {
    return (
      <span className={styles['slide-texts']}>
        <span className="body-lg pd-left-24">1등 개발자 취업도우미</span>
        <Image src={MinariBlack} alt="logo" />
        <span className="body-lg">미래의 나를 위한 리허설 ㅣ 미나리</span>
        <Image src={MinariBlack} alt="logo" />
        <span className="body-lg">매일 도착하는 질문을 통한 꾸준한 성장</span>
        <Image src={MinariBlack} alt="logo" />
        <span className="body-lg">1등 개발자 취업도우미</span>
        <Image src={MinariBlack} alt="logo" />
      </span>
    );
  };
  const textSecond = () => {
    return (
      <span className={styles['slide-texts']}>
        <span className="body-lg pd-left-24">미래의 나를 위한 리허설 ㅣ 미나리</span>
        <Image src={MinariBlack} alt="logo" />
        <span className="body-lg">매일 도착하는 질문을 통한 꾸준한 성장</span>
        <Image src={MinariBlack} alt="logo" />
        <span className="body-lg">1등 개발자 취업도우미</span>
        <Image src={MinariBlack} alt="logo" />
      </span>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['slide-wrapper']}>
        <div
          id="parent"
          className={styles['slide-container']}
          style={{animationDuration: `${nodeCopyCount ? 20 * nodeCopyCount : '20'}s`}}
        >
          <p id="child">{textFirst()}</p>
        </div>
      </div>
      <div className={`${styles['slide-wrapper']} ${styles['slide-dark']}`}>
        <div
          id="parent-2"
          className={styles['slide-container']}
          style={{animationDuration: `${nodeCopyCount ? 20 * nodeCopyCount : '20'}s`}}
        >
          <p>{textSecond()}</p>
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
