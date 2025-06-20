import {getTag} from '@/apis/question';
import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import type {ApiResponse} from '@/apis/instance/APIClient';

export const useTag = (initialData: ApiResponse<string[]> | null, questionId: number) => {
  const result = useQuery({
    queryKey: ['tag', questionId],
    queryFn: () => getTag(questionId),
    enabled: !!questionId,
    initialData,
  });

  const {data} = result;

  const randomKeyword = useMemo(() => {
    if (data?.result && data.result.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.result.length);
      return data.result[randomIndex];
    }
    return null;
  }, [data]);

  return {
    randomKeyword,
    ...result,
  };
};
