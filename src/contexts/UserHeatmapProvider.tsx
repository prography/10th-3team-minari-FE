'use client';

import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useDate} from '@/hooks/useDate';
import {DateSelectorOptionType} from '@/app/(whitebg)/users/my/_components/Heatmap/DateSelector';

export type BlockType = {
  index: number;
  date: string;
  done: boolean;
  active: boolean;
};
type ContextType = {
  heatmapTab: number;
  setHeatmapTab: (tab: number) => void;
  barDateOptions: DateSelectorOptionType[];
  selectedBarDateOption: DateSelectorOptionType;
  onClickOption: (option: DateSelectorOptionType) => void;
  blocks: BlockType[];
};
const UserHeatmapContext = createContext<ContextType | null>(null);

export const UserHeatmapProvider = ({children}: {children: React.ReactNode}) => {
  const {
    currentYear,
    currentMonth,
    currentDay,
    weeksCount,
    weekOfMonth,
    // daysOfMonth,
    getWeekDates,
  } = useDate();
  const [heatmapTab, setHeatmapTab] = useState<number>(2);
  const [barDateOptions, setBarDateOptions] = useState<DateSelectorOptionType[]>([
    {label: '', value: ''},
  ]);
  const [selectedBarDateOption, setSelectedBarDateOption] = useState<DateSelectorOptionType>({
    label: '',
    value: '',
  });
  const onClickOption = (option: DateSelectorOptionType) => {
    setSelectedBarDateOption(option);
  };

  const setDateOptions = (year: number, month: number) => {
    const options = [] as DateSelectorOptionType[];
    const weeks = weeksCount(year, month);
    for (let i = 0; i < weeks; i++) {
      options.push({value: i, label: `${month}월 ${i + 1}주차`});
    }
    setBarDateOptions(options);
  };

  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const createBlocks = (year: number, month: number, day: number) => {
    const arr = [];
    const weekNo = weekOfMonth(year, month, day);
    const datesArr = getWeekDates(year, month, weekNo);
    // const datesArr = getBlockDates(year, month, day);
    for (let i = 0; i < 7; i++) {
      arr.push({index: i, date: datesArr[i], done: false, active: false});
    }
    setBlocks(arr);
  };
  // const getBlockDates = (year: number, month: number, day: number) => {
  //   const lastDay = daysOfMonth(year, month);
  //   const arr = [];
  //   let yearNum = year;
  //   let monthNum = month;
  //   let dayNum = day;
  //   if (heatmapTab === 2) {
  //     for (let i = 0; i < 7; i++) {
  //       arr.push(`${yearNum}-${monthNum}-${dayNum}`);
  //       if (dayNum < lastDay) {
  //         dayNum += 1;
  //       } else {
  //         if (monthNum === 12) {
  //           dayNum = 1;
  //           monthNum = 1;
  //           yearNum += 1;
  //         } else {
  //           dayNum = 1;
  //           monthNum += 1;
  //         }
  //       }
  //     }
  //   }
  //   return arr;
  // };

  const value = useMemo(
    () => ({
      heatmapTab,
      setHeatmapTab,
      barDateOptions,
      selectedBarDateOption,
      onClickOption,
      blocks,
    }),
    [heatmapTab, setDateOptions, selectedBarDateOption, barDateOptions, blocks],
  );

  useEffect(() => {
    setDateOptions(currentYear, currentMonth);
    createBlocks(currentYear, currentMonth, currentDay);
  }, []);
  useEffect(() => {
    const currentWeekNo = weekOfMonth(currentYear, currentMonth, currentDay);
    setSelectedBarDateOption(barDateOptions[currentWeekNo - 1]);
  }, [barDateOptions]);

  return <UserHeatmapContext.Provider value={value}>{children}</UserHeatmapContext.Provider>;
};

export const useUserHeatmapContext = () => {
  const context = useContext(UserHeatmapContext);
  if (!context) {
    throw new Error('UserHeatmapProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
