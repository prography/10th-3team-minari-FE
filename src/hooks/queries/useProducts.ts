import {useQuery} from '@tanstack/react-query';
import {getProducts} from '@/apis/payment';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    select: (res) => res?.result ?? null,
  });
};
