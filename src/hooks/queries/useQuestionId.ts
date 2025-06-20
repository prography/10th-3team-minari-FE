import {getQuestionId} from '@/apis/question';
import {useUserStore} from '@/stores/userStore';
import {useQuery} from '@tanstack/react-query';

export const useQuestionId = () => {
  const {userId} = useUserStore();

  return useQuery({
    queryKey: ['questionId', userId],
    queryFn: () => getQuestionId(userId),
    enabled: !!userId,
    select: (res) => res?.result ?? null,
  });
};
