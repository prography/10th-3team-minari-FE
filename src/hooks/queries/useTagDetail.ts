import {getTagDetail} from '@/apis/question';
import {useQuery} from '@tanstack/react-query';
import type {ApiResponse} from '@/apis/instance/APIClient';

export const useTagDetail = (questionId: number, initialData?: ApiResponse<string> | null) => {
  return useQuery({
    queryKey: ['tag', 'questionId', questionId, 'detail'],
    queryFn: () => getTagDetail(questionId),
    enabled: !!questionId,
    initialData,
  });
};
