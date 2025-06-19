import {getAnswer, type AnswerType} from '@/apis/answer';
import type {ApiResponse} from '@/apis/instance/APIClient';
import {useUserStore} from '@/stores/userStore';
import {useQuery} from '@tanstack/react-query';

export const useAnswer = (initialData: ApiResponse<AnswerType> | null, questionId: number) => {
  const {userId} = useUserStore();

  return useQuery({
    queryKey: ['answer', userId, questionId],
    queryFn: () => getAnswer(userId, questionId),
    enabled: !!userId && !!questionId,
    initialData,
  });
};
