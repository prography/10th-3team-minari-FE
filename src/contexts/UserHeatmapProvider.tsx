'use client';

import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useDate} from '@/hooks/useDate';
import {DateSelectorOptionType} from '@/app/(whitebg)/users/my/_components/Heatmap/DateSelector';
import {useMinariRecord} from '@/hooks/queries/useMinariRecord';
import {useQuestionDetail} from '@/hooks/queries/useQuestionDetail';
import {QuestionDetailType} from '@/apis/question';
import {useUsers} from '@/hooks/queries/useUsers';
import {UsersReponse} from '@/apis/user';

export type BlockType = {
  index: number;
  date: string;
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
  onClickBlock: (block: BlockType) => void;
  minariRate: number | null;
  selectedBlockDate: string;
  questionDetail: QuestionDetailType | null;
  mapLoading: boolean;
  userData: UsersReponse | null | undefined;
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
  const [blockDates, setBlockDates] = useState<Array<string>>([]);
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
    const weeks = weeksCount(year, month);
    for (let i = 0; i < weeks; i++) {
      options.push({value: i, label: `${month}월 ${i + 1}주차`});
    }
    setBarDateOptions(options);
  };

  // 상단 바 날짜 셀렉트 박스 클릭 -> 블록 생성
  const onClickOption = (option: DateSelectorOptionType) => {
    setSelectedBarDateOption(option);
    const selectedMonth = option.label.split(' ')[0].split('월')[0];
    const selectedWeek = option.label.split(' ')[1].split('주차')[0];
    dateSettings(currentYear, Number(selectedMonth), Number(selectedWeek));
    createBlocks();
  };

  // 블록별 날짜 생성 & 조회 시작, 날짜 생성
  const dateSettings = (year: number, month: number, weekNo: number) => {
    const datesArr = getWeekDates(year, month, weekNo);
    setBlockDates(datesArr);
    setStartDate(datesArr[0]);
    setEndDate(datesArr[6]);
  };

  // 블록 생성
  const createBlocks = () => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      if (minariRecord) {
        arr.push({
          index: i,
          date: blockDates[i],
          done: minariRecord[i].isExisted,
          active: false,
          questionId: minariRecord[i].questionId,
        });
      }
    }
    setBlocks(arr);
  };

  // 블록 클릭
  const onClickBlock = (block: BlockType) => {
    const b = blocks;
    if (block.done) {
      const prevActive = b.findIndex((item) => item.active);
      if (prevActive > -1) {
        b[prevActive].active = false;
      }
      b[block.index].active = true;
      setBlocks([...b]);
      setSelectedBlockQuesId(b[block.index].questionId);
      setSelectedBlockDate(b[block.index].date);
    }
  };

  const [mapLoading, setMapLoading] = useState<boolean>(false);

  useEffect(() => {
    setMapLoading(true);
    setDateOptions(currentYear, currentMonth);
    dateSettings(currentYear, currentMonth, currentWeek);
  }, []);
  useEffect(() => {
    const currentWeekNo = weekOfMonth(currentYear, currentMonth, currentDay);
    setSelectedBarDateOption(barDateOptions[currentWeekNo - 1]);
  }, [barDateOptions]);
  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      refetch().then(() => {
        createBlocks();
        setMapLoading(false);
      });
    }
  }, [startDate, endDate, minariRecord]);

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
    }),
    [heatmapTab, setDateOptions, selectedBarDateOption, barDateOptions, blocks],
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
