import {getAnswer, type AnswerType} from '@/apis/answer';
import type {ApiResponse} from '@/apis/instance/APIClient';
import {useUserStore} from '@/stores/userStore';
import {useQuery} from '@tanstack/react-query';

export const useAnswer = (questionId: number, initialData?: ApiResponse<AnswerType> | null) => {
  const {userId} = useUserStore();

  return useQuery({
    queryKey: ['answer', 'userId', userId, 'questionId', questionId],
    queryFn: () => getAnswer(userId, questionId),
    enabled: !!userId && !!questionId,
    initialData,
  });
};
