import {getProductsHistory} from '@/apis/products';
import {useQuery} from '@tanstack/react-query';

export const useProductsHistory = () => {
  return useQuery({
    queryKey: ['products', 'history'],
    queryFn: () => getProductsHistory(),
    select: (res) => res?.result ?? null,
  });
};
