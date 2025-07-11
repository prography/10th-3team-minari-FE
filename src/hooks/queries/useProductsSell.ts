import {getProductsSell} from '@/apis/products';
import {useQuery} from '@tanstack/react-query';

export const useProductsSell = () => {
  return useQuery({
    queryKey: ['products', 'sell'],
    queryFn: () => getProductsSell(),
    select: (res) => res?.result ?? null,
  });
};
