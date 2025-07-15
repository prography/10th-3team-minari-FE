'use client';
import styles from './TopBar.module.css';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';
import DateSelector from '@/app/(whitebg)/users/my/_components/Heatmap/DateSelector';
import {useState} from 'react';

const TopBar = () => {
  const {heatmapTab, barDateOptions, onClickOption, selectedBarDateOption, minariRate} =
    useUserHeatmapContext();
  const [optionsShow, setOptionsShow] = useState(false);
  const unitText = () => {
    switch (heatmapTab) {
      case 0:
        return '올해의';
      case 1:
        return '이번 달';
      case 2:
        return '이번 주';
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles['text__wrap']}>
        <span className="label-md txt-white">{unitText() + ' 미나리 달성률'}</span>
        <span className="label-md txt-brand">{minariRate}%</span>
      </div>
      <div>
        <DateSelector
          label={selectedBarDateOption?.label}
          options={barDateOptions}
          onClickOption={onClickOption}
          optionsShow={optionsShow}
          setOptionsShow={setOptionsShow}
        />
      </div>
    </div>
  );
};

export default TopBar;
