import styles from './Blocks.module.css';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';

const Blocks = () => {
  const {blocks} = useUserHeatmapContext();
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
      <div className={styles['blocks__wrap']}>
        {blocks?.map((block, index) => (
          <div key={index} className={styles.blocks} style={{width: '14%'}}></div>
        ))}
      </div>
    </div>
  );
};

export default Blocks;
