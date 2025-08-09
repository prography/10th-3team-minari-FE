import React from 'react';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import styles from './ListRow.module.css';
import ArrowPrimary from '@/assets/icon/arrow-right-primary.svg';
import Button from '@/components/Button';
import StarFill from '@/assets/icon/star-fill.svg';
import {Tooltip} from 'react-tooltip';
import {TOOLTIP} from '@/constants/tooltip';

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

const ContentsAnswer = ({
  children,
  memo,
  onClick,
}: {
  children: React.ReactNode;
  memo?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className={styles.contents_button}>
      <p className={`${styles.contents} body-lg`}>{children}</p>

      <div className={styles.memo}>
        <div className={styles.restart_title}>
          <Image src={Minari} alt="icon" width={24} height={24} />
          <span className="title-xs txt-primary">답변 중 작성한 메모</span>
        </div>

        {memo && <span className="body-lg">{memo}</span>}
      </div>

      <div className={styles.restart}>
        <div className={`${styles.restart_contents} body-lg`}>
          <div className={styles.restart_title}>
            <Image src={StarFill} alt="icon" width={24} height={24} />
            <span className="title-xs txt-primary">지금 프리미엄으로 실력 향상 이어가기</span>
          </div>
          <span className="body-lg">
            지금 답변이 아쉽다면, 미나리 씨앗을 사용해서 한 번 더 도전해보는건 어떠세요?
          </span>
        </div>
        <Tooltip
          id={TOOLTIP.REHEARSAL_RESTART}
          opacity={1}
          style={{
            borderRadius: '8px',
            background: '#FAFAFA',
            color: '#171717',
            boxShadow:
              '0px var(--effect-shadow-4-cast-y, 2px) var(--effect-shadow-4-cast-blur, 4px) 0px var(--color-effect-shadow-cast, rgba(0, 0, 0, 0.16)), 0px var(--effect-shadow-4-core-y, 0px) var(--effect-shadow-4-core-blur, 2px) 0px var(--color-effect-shadow-core, rgba(0, 0, 0, 0.12))',
          }}
        />
        <div className={styles.button_wrapper}>
          <Button
            onClick={onClick}
            theme="black"
            iconRight={ArrowPrimary}
            shadow
            data-tooltip-id={TOOLTIP.REHEARSAL_RESTART}
            data-tooltip-content="7/26까지 하루 한 번 무료!"
            full
          >
            다시 도전하기
          </Button>
        </div>
      </div>
    </div>
  );
};

ListRow.Title = Title;
ListRow.Contents = Contents;
ListRow.ContentsAnswer = ContentsAnswer;

export default ListRow;
