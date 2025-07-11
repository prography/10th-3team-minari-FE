import type {ApiResponse} from '@/apis/instance/APIClient';
import {getContents} from '@/apis/question';
import {useQuery} from '@tanstack/react-query';

export const useContents = (questionId: number, initialData?: ApiResponse<string> | null) => {
  return useQuery({
    queryKey: ['contents', 'questionId', questionId],
    queryFn: () => getContents(questionId),
    enabled: !!questionId,
    initialData,
  });
};
