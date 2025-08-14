'use client';

import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useDate} from '@/hooks/useDate';
import {DateSelectorOptionType} from '@/app/(whitebg)/users/my/_components/Heatmap/DateSelector';
import {useMinariRecord} from '@/hooks/queries/useMinariRecord';
import {useQuestionDetail} from '@/hooks/queries/useQuestionDetail';
import {QuestionDetailType} from '@/apis/question';
import {useUsers} from '@/hooks/queries/useUsers';
import {UsersReponse} from '@/apis/user';
import {useAnswerEligibility} from '@/hooks/queries/useAnswerEligibility';
import {monthLabel} from '@/constants/dates';

export type BlockType = {
  index: number;
  totalIndex: number;
  date: string | string[];
  done: boolean;
  active: boolean;
  questionId: number;
};
type ContextType = {
  heatmapTab: number;
  setHeatmapTab: (tab: number) => void;
  barDateOptions: DateSelectorOptionType[];
  selectedBarDateOption: DateSelectorOptionType;
  onClickOption: (option: DateSelectorOptionType) => void;
  blocks: BlockType[];
  arrayBlocks: BlockType[][];
  onClickBlock: (block: BlockType) => void;
  minariRate: number | null;
  selectedBlockDate: string;
  questionDetail: QuestionDetailType | null;
  mapLoading: boolean;
  userData: UsersReponse | null | undefined;
  isSeedLimitReached: boolean;
};
const UserHeatmapContext = createContext<ContextType | null>(null);

export const UserHeatmapProvider = ({children}: {children: React.ReactNode}) => {
  const {
    currentYear,
    currentMonth,
    currentDay,
    currentWeek,
    weeksCount,
    weekOfMonth,
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
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [arrayBlocks, setArrayBlocks] = useState<BlockType[][]>([]);
  const [blockDates, setBlockDates] = useState<Array<string> | Array<Array<string>>>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const {refetch, minariRecord, minariRate} = useMinariRecord({startDate, endDate});
  const {data: userData} = useUsers();
  const [selectedBlockQuesId, setSelectedBlockQuesId] = useState<number | null>(null);
  const [selectedBlockDate, setSelectedBlockDate] = useState<string>('');
  const {questionDetail} = useQuestionDetail(selectedBlockQuesId ?? 0);

  // 상단 바 날짜 셀렉트 박스 옵션 생성
  const setDateOptions = (year: number, month: number) => {
    const options = [] as DateSelectorOptionType[];
    if (heatmapTab === 0) {
      const standardYear = 2025;
      for (let year = currentYear; year >= standardYear; year--) {
        options.push({value: year, label: String(year)});
      }
    } else if (heatmapTab === 1) {
      monthLabel.forEach((month, index) => {
        options.push({value: index + 1, label: month});
      });
    } else if (heatmapTab === 2) {
      const weeks = weeksCount(year, month);
      for (let i = 0; i < weeks; i++) {
        options.push({value: i, label: `${month}월 ${i + 1}주차`});
      }
    }
    setBarDateOptions(options);
  };

  // 상단 바 날짜 셀렉트 박스 클릭 -> 블록 생성
  const onClickOption = (option: DateSelectorOptionType) => {
    setSelectedBarDateOption(option);
    if (heatmapTab === 0) {
      dateSettings(Number(option.value), 0, 0);
    } else if (heatmapTab === 1) {
      dateSettings(currentYear, Number(option.value), 0);
    } else if (heatmapTab === 2) {
      const selectedMonth = option.label.split(' ')[0].split('월')[0];
      const selectedWeek = option.label.split(' ')[1].split('주차')[0];
      dateSettings(currentYear, Number(selectedMonth), Number(selectedWeek));
    }
    createBlocks();
  };

  // 블록별 날짜 생성 & 조회 시작, 날짜 생성
  const dateSettings = (year: number, month: number, weekNo: number) => {
    if (heatmapTab === 0) {
      const datesArr = [];
      for (let iMonth = 1; iMonth < 13; iMonth++) {
        const weeks = weeksCount(year, iMonth);
        for (let i = 0; i < weeks; i++) {
          const weekDates = getWeekDates(year, iMonth, i + 1);
          datesArr.push(weekDates);
        }
      }
      setBlockDates(datesArr);
      setStartDate(datesArr[0][0]);
      setEndDate(datesArr[datesArr?.length - 1][6]);
    } else if (heatmapTab === 1) {
      const datesArr = [];

      const weeks = weeksCount(year, month);
      const firstWeek = getWeekDates(year, month, 1);
      let includeWeekZero = false;
      if (firstWeek.some((day) => day.split('-')[2] === '01')) {
        includeWeekZero = true;
      }
      for (let i = 0; i < weeks; i++) {
        const weekDates = getWeekDates(year, month, includeWeekZero ? i + 1 : i);
        datesArr.push(weekDates);
      }
      setBlockDates(datesArr);
      setStartDate(datesArr[0][0]);
      setEndDate(datesArr[weeks - 1][6]);
    } else if (heatmapTab === 2) {
      const datesArr = getWeekDates(year, month, weekNo - 1);
      setBlockDates(datesArr);
      setStartDate(datesArr[0]);
      setEndDate(datesArr[6]);
    }
  };

  // 블록 생성
  const createBlocks = () => {
    if (heatmapTab === 0 || heatmapTab === 1) {
      const arr: BlockType[][] = [];
      const length = heatmapTab === 1 ? blockDates?.length - 1 : 52;
      for (let index = 0; index < length + 1; index++) {
        if (minariRecord) {
          const record = minariRecord.slice(index * 7, index * 7 + 7);
          const weekBlock = [];
          for (let i = 0; i < 7; i++) {
            weekBlock.push({
              index: i,
              totalIndex: index,
              date: record[i]?.answerDate,
              done: record[i]?.isExisted,
              active: false,
              questionId: record[i]?.questionId,
            });
          }
          arr.push(weekBlock);
        }
      }
      setArrayBlocks(arr);
    } else if (heatmapTab === 2) {
      const arr = [];
      for (let i = 0; i < 7; i++) {
        if (minariRecord) {
          arr.push({
            index: i,
            totalIndex: i,
            date: blockDates[i],
            done: minariRecord[i].isExisted,
            active: false,
            questionId: minariRecord[i].questionId,
          });
        }
      }
      setBlocks(arr);
    }
  };

  const [prevClickedBlockArrIndex, setPrevClickedBlockArrIndex] = useState<number>(-1);
  // 블록 클릭
  const onClickBlock = (block: BlockType) => {
    let b;
    if (heatmapTab !== 2 && typeof block.date === 'string') {
      b = arrayBlocks[block.totalIndex];
      setPrevClickedBlockArrIndex(block.totalIndex);
    } else {
      b = blocks;
    }
    if (block.done) {
      if (heatmapTab === 2) {
        const prevActive = b.findIndex((item) => item.active);
        if (prevActive > -1) {
          b[prevActive].active = false;
        }
      } else {
        if (prevClickedBlockArrIndex > -1) {
          const prevActive = blocks.findIndex((item) => item.active);
          if (prevActive > -1) {
            blocks[prevActive].active = false;
          }
        }
      }
      b[block.index].active = true;
      const blockDate = b[block.index].date;
      setBlocks([...b]);
      setSelectedBlockQuesId(b[block.index].questionId);
      setSelectedBlockDate(typeof blockDate === 'string' ? blockDate : '');
    }
  };

  const [mapLoading, setMapLoading] = useState<boolean>(false);

  useEffect(() => {
    setSelectedBlockQuesId(null);
    setMapLoading(true);
    setDateOptions(currentYear, currentMonth);
    dateSettings(currentYear, currentMonth, currentWeek);
  }, [heatmapTab]);
  useEffect(() => {
    // 날짜 선택 셀렉트 박스 초기 값 (탭 변경 시)
    const currentWeekNo = weekOfMonth(currentYear, currentMonth, currentDay);
    switch (heatmapTab) {
      case 0:
        setSelectedBarDateOption({label: String(currentYear), value: currentYear});
        return;
      case 1:
        setSelectedBarDateOption({label: monthLabel[currentMonth - 1], value: currentMonth});
        return;
      case 2:
        setSelectedBarDateOption(barDateOptions[currentWeekNo - 1]);
        return;
    }
  }, [barDateOptions]);
  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      refetch().then(() => {
        createBlocks();
        setMapLoading(false);
      });
    }
  }, [startDate, endDate, minariRecord]);

  const {data, refetch: refetchEligibility} = useAnswerEligibility();
  useEffect(() => {
    refetchEligibility();
  }, [refetchEligibility]);
  const isSeedLimitReached = useMemo(() => {
    return data === 'LIMIT_REACHED' || data === 'UNKNOWN';
  }, [data]);

  const value = useMemo(
    () => ({
      heatmapTab,
      setHeatmapTab,
      barDateOptions,
      selectedBarDateOption,
      onClickOption,
      blocks,
      setBlocks,
      onClickBlock,
      minariRate,
      questionDetail,
      selectedBlockDate,
      mapLoading,
      userData,
      isSeedLimitReached,
      arrayBlocks,
    }),
    [heatmapTab, setDateOptions, selectedBarDateOption, barDateOptions, blocks, arrayBlocks],
  );

  return <UserHeatmapContext.Provider value={value}>{children}</UserHeatmapContext.Provider>;
};

export const useUserHeatmapContext = () => {
  const context = useContext(UserHeatmapContext);
  if (!context) {
    throw new Error('UserHeatmapProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
