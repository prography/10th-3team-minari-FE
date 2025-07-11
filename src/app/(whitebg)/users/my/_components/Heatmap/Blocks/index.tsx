import styles from './Blocks.module.css';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';
import Check from '@/assets/icon/check.svg';
import Image from 'next/image';
import {Tooltip} from 'react-tooltip';
import {useDate} from '@/hooks/useDate';

const Blocks = () => {
  const {blocks, onClickBlock} = useUserHeatmapContext();
  const {dateFormatterKorean} = useDate();
  const weekLabel = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className={styles.container}>
      <div className={styles['week-month-label']}>
        {weekLabel.map((label, index) => (
          <div key={index} style={{width: '14%'}}>
            <span className="label-sm txt-tertiary">{label}</span>
          </div>
        ))}
      </div>
      <Tooltip id="minari-tooltip" openOnClick />
      <div className={styles['blocks__wrap']}>
        {blocks?.map((block, index) => (
          <div
            key={index}
            className={`${styles.blocks} ${block.done ? `${styles.done}` : ''} ${block.active ? `${styles.active}` : ''}`}
            style={{width: '14%'}}
            onClick={() => {
              onClickBlock(block);
            }}
          >
            <a
              data-tooltip-id="minari-tooltip"
              data-tooltip-content={dateFormatterKorean(block.date)}
            >
              {block.active && <Image src={Check} alt="" />}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blocks;
