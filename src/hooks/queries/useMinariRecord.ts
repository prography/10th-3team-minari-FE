import {useQuery} from '@tanstack/react-query';
import {getMinariRecord} from '@/apis/myPage';
import {useMemo} from 'react';

export const useMinariRecord = ({startDate, endDate}: {startDate: string; endDate: string}) => {
  const {data, refetch} = useQuery({
    queryKey: ['minari-record', 'startDate', startDate, 'endDate', endDate],
    queryFn: () => getMinariRecord({startDate, endDate}),
    enabled: !!startDate && !!endDate,
  });

  const minariRate = useMemo(() => {
    if (data?.result) {
      return data?.result?.achievementRate;
    }
    return null;
  }, [data]);
  const minariRecord = useMemo(() => {
    if (data?.result) {
      return data?.result?.answerlist;
    }
    return null;
  }, [data]);

  return {
    data,
    refetch,
    minariRecord,
    minariRate,
  };
};
