import {getUsers} from '@/apis/user';
import {useQuery} from '@tanstack/react-query';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    select: (res) => res?.result ?? null,
  });
};
