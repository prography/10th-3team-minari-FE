import {getTossPayments} from '@/apis/toss';
import {useQuery} from '@tanstack/react-query';

export const useTossPayments = (paymentKey: string) => {
  return useQuery({
    queryKey: ['toss', 'payments', paymentKey],
    queryFn: () => getTossPayments({paymentKey}),
    enabled: !!paymentKey,
  });
};
