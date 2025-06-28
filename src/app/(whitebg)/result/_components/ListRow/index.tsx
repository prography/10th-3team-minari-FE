import React from 'react';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import styles from './ListRow.module.css';
import ArrowPrimary from '@/assets/icon/arrow-right-primary.svg';
import Button from '@/components/Button';
import Star from '@/assets/icon/star.svg';

interface ListRowProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const ListRow = ({title, content}: ListRowProps) => {
  return (
    <div className={styles.wrapper}>
      <>{title}</>
      <>{content}</>
    </div>
  );
};

const Title = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={styles.title}>
      <Image src={Minari} alt="icon" width={18} />
      <span className="title-xs txt-primary">{children}</span>
    </div>
  );
};

const Contents = ({children}: {children: React.ReactNode}) => {
  if (typeof children === 'string')
    return <p className={`${styles.contents} body-lg`}>{children}</p>;

  return <div className={styles.contents_keywords}>{children}</div>;
};

const ContentsWithButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className={styles.contents_button}>
      <p className={`${styles.contents} body-lg`}>{children}</p>

      <div className={styles.restart}>
        <div className={`${styles.restart_contents} body-lg`}>
          <div className={styles.restart_title}>
            <Image src={Star} alt="icon" width={24} height={24} />
            <span className="title-sm">지금 프리미엄으로 실력 향상 이어가기</span>
          </div>
          <span>지금 답변이 아쉽다면, 미나리 씨앗을 사용해서 한 번 더 도전해보는건 어떠세요?</span>
        </div>

        <Button onClick={onClick} theme="black" iconRight={ArrowPrimary} shadow>
          다시 도전하기
        </Button>
      </div>
    </div>
  );
};

ListRow.Title = Title;
ListRow.Contents = Contents;
ListRow.ContentsWithButton = ContentsWithButton;

export default ListRow;
