'use client';
import styles from './TopBar.module.css';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';
import DateSelector from '@/app/(whitebg)/users/my/_components/Heatmap/DateSelector';
import {useState} from 'react';

const TopBar = () => {
  const {barDateOptions, onClickOption, selectedBarDateOption} = useUserHeatmapContext();

  const [optionsShow, setOptionsShow] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles['text__wrap']}>
        <span className="label-md txt-white">이번주 미나리 달성률</span>
        <span className="label-md txt-brand">34%</span>
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
