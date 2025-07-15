import styles from './BlockTab.module.css';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';

const BlockTab = () => {
  const tabs = [
    {id: 0, tab: 'Yearly'},
    {id: 1, tab: 'Monthly'},
    {id: 2, tab: 'Weekly'},
  ];
  const {heatmapTab, setHeatmapTab} = useUserHeatmapContext();
  const onClickTab = (id: number) => {
    setHeatmapTab(id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => onClickTab(tab.id)}
            className={`${heatmapTab === tab.id ? `${styles.active}` : ''} ${styles.tab}`}
          >
            <span className={`label-md ${heatmapTab === tab.id ? 'txt-primary' : 'txt-tertiary'}`}>
              {tab.tab}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockTab;
