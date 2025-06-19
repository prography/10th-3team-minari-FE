import type {ApiResponse} from '@/apis/instance/APIClient';
import {getContents} from '@/apis/question';
import {useQuery} from '@tanstack/react-query';

export const useContents = (initialData: ApiResponse<string> | null, questionId: number) => {
  return useQuery({
    queryKey: ['contents', questionId],
    queryFn: () => getContents(questionId),
    enabled: !!questionId,
    initialData,
  });
};
