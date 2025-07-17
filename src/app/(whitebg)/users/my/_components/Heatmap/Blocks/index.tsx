import styles from './Blocks.module.css';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';
import {Tooltip} from 'react-tooltip';
import Block from '@/app/(whitebg)/users/my/_components/Heatmap/Block';
import {monthLabel, weekLabel} from '@/constants/dates';

const Blocks = () => {
  const {blocks, arrayBlocks, onClickBlock, heatmapTab} = useUserHeatmapContext();
  const label = heatmapTab === 0 ? monthLabel : weekLabel;
  const labelWidth = heatmapTab === 0 ? '8%' : '14%';
  return (
    <div className={styles.container}>
      {heatmapTab === 0 && (
        <div className={styles['weekday-label']}>
          <span className="txt-tertiary label-sm">월</span>
          <span className="txt-tertiary label-sm">수</span>
          <span className="txt-tertiary label-sm">금</span>
          <span className="txt-tertiary label-sm">일</span>
        </div>
      )}
      {heatmapTab === 1 && (
        <div className={styles['week-number-label']}>
          <span className="txt-tertiary label-sm">1주</span>
          <span className="txt-tertiary label-sm">3주</span>
          <span className="txt-tertiary label-sm">5주</span>
        </div>
      )}
      <div className={styles['blocks__area']}>
        <div className={styles['week-month-label']}>
          {label.map((label, index) => (
            <div key={index} style={{width: labelWidth}}>
              <span className="label-sm txt-tertiary">{label}</span>
            </div>
          ))}
        </div>
        <Tooltip id="minari-tooltip" opacity={1} style={{borderRadius: '8px'}} openOnClick />
        {heatmapTab === 0 && (
          <div className={styles['year-blocks__wrap']}>
            {arrayBlocks.map((weekBlock, index) => (
              <div className={styles['year-blocks']} key={index}>
                {weekBlock.map((block, index) => (
                  <div className={styles['year-blocks']} key={index} style={{width: '16px'}}>
                    <Block block={block} height={16} onClickBlock={onClickBlock} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {heatmapTab === 1 &&
          arrayBlocks.map((weekBlock, index) => (
            <div className={styles['blocks__wrap']} key={index}>
              {weekBlock.map((block, index) => (
                <div key={index} style={{width: '14%'}}>
                  <Block block={block} onClickBlock={onClickBlock} />
                </div>
              ))}
            </div>
          ))}
        {heatmapTab === 2 && (
          <div className={styles['blocks__wrap']}>
            {blocks?.map((block, index) => (
              <div key={index} style={{width: '14%'}}>
                <Block block={block} onClickBlock={onClickBlock} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blocks;
