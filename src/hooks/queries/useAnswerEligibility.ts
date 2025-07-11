import {getAnswerEligibility} from '@/apis/answer';
import {useQuery} from '@tanstack/react-query';

export const useAnswerEligibility = () => {
  return useQuery({
    queryKey: ['seeds'],
    queryFn: () => getAnswerEligibility(),
    select: (res) => res?.result ?? null,
  });
};
