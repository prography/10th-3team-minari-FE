import styles from './Blocks.module.css';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';
import {Tooltip} from 'react-tooltip';
import Block from '@/app/(whitebg)/users/my/_components/Heatmap/Block';
import {weekLabel} from '@/constants/dates';

const Blocks = () => {
  const {blocks, monthBlocks, onClickBlock, heatmapTab} = useUserHeatmapContext();

  return (
    <div className={styles.container}>
      {heatmapTab === 1 && (
        <div className={styles['week-number-label']}>
          <span className="txt-tertiary label-sm">1주</span>
          <span className="txt-tertiary label-sm">3주</span>
          <span className="txt-tertiary label-sm">5주</span>
        </div>
      )}
      <div className={styles['blocks__area']}>
        <div className={styles['week-month-label']}>
          {weekLabel.map((label, index) => (
            <div key={index} style={{width: '14%'}}>
              <span className="label-sm txt-tertiary">{label}</span>
            </div>
          ))}
        </div>
        <Tooltip id="minari-tooltip" opacity={1} style={{borderRadius: '8px'}} openOnClick />
        {heatmapTab === 1 &&
          monthBlocks.map((weekBlock, index) => (
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
