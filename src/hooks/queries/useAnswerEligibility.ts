import {getAnswerEligibility} from '@/apis/answer';
import {useQuery} from '@tanstack/react-query';

export const useAnswerEligibility = () => {
  return useQuery({
    queryKey: ['answer', 'eligibility'],
    queryFn: () => getAnswerEligibility(),
    select: (res) => res?.result ?? null,
  });
};
