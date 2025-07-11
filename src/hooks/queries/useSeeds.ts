import {useQuery} from '@tanstack/react-query';
import {getSeeds} from '@/apis/seeds';

export const useSeeds = () => {
  return useQuery({
    queryKey: ['seeds'],
    queryFn: () => getSeeds(),
    select: (res) => res?.result ?? null,
  });
};
